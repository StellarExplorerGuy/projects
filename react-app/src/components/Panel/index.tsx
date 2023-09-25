import { useEffect, useState } from 'react'

import styles from './Panel.module.scss'

import ButtonGroup from '@mui/joy/ButtonGroup'
import IconButton from '@mui/joy/IconButton'
import Settings from '@mui/icons-material/Settings'
import MenuButton from '@mui/joy/MenuButton'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import Dropdown from '@mui/joy/Dropdown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Card from '@mui/joy/Card'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import Tab from '@mui/material/Tab'

import { getCommit, getPR, updateKey } from 'utils/data'
import { Typography } from '@mui/joy'
import { Box } from '@mui/material'

const DEFAULT_USER = 'Name Surname <name.surname@org.com>'
const FASTER_PR_PROFILE_KEY = 'FASTER_PR_KEY'
const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'
const DEFAULT_BRANCH_PREFIXES = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'release']
const avatarRegex = /alt="@([^"]+)">/
const repoRegex = /([^/]+)\/([^/]+)\/issues/

function getLocalStorage(key: string) {
  try {
    const localData = JSON.parse(localStorage.getItem(key)!) || {}
    return localData
  } catch (error) {
    return {}
  }
}

function onButtonClick(event: { target: any }) {
  const button = event.target
  button.classList.add(styles['active'])
  setTimeout(() => {
    button.classList.remove(styles['active'])
  }, 1000)
}

function getPrefixesTabs(): string[] {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
    const profile = allProfiles[profileKey]
    if (profile.branchPrefixes) {
      return profile.branchPrefixes
    }
    return DEFAULT_BRANCH_PREFIXES
  } catch (error) {
    return DEFAULT_BRANCH_PREFIXES
  }
}

function getProfileData() {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)

    if (allProfiles.profiles) {
      return { selected: profileKey, list: allProfiles.profiles }
    }
    return { selected: FASTER_PR_PROFILE, list: [FASTER_PR_PROFILE] }
  } catch (error) {
    return { selected: FASTER_PR_PROFILE, list: [FASTER_PR_PROFILE] }
  }
}

function processBranchName(prefix: string, suffix: string) {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
    const profile = allProfiles[profileKey]
    let branchSeparator = '/'

    if (profile.uppercase) {
      prefix = prefix.toUpperCase()
    }
    if (profile.branchSeparator) {
      branchSeparator = profile.branchSeparator
    }
    return `${prefix}${branchSeparator}${suffix}`
  } catch (error) {
    return ''
  }
}

function processCommit(type: any, issue: any, repoDetails: { user: any; repo: any }, user: any) {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
    const profile = allProfiles[profileKey]
    if (profile) {
      let signature = user

      if (profile.signature) {
        signature = profile.signature
      }

      const formattedCommit = profile.commit
        .replace(/ISSUE_TYPE/g, type)
        .replace(/ISSUE/g, issue)
        .replace(/REPO_ORG/g, repoDetails.user)
        .replace(/REPO_NAME/g, repoDetails.repo)
        .replace(/SIGNATURE/g, signature)

      return formattedCommit
    }
    const { user: repoName, repo: repoOrg } = getRepoDetails()
    return getCommit({ type, issue, repoOrg, repoName, user })
  } catch (error) {
    const { user: repoName, repo: repoOrg } = getRepoDetails()
    return getCommit({ type, issue, repoOrg, repoName, user })
  }
}

function processPR(type: string, issue: string, repoDetails: { user: string; repo: string }, user: string) {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
    const profile = allProfiles[profileKey]
    if (profile) {
      let signature = user

      if (profile.signature) {
        signature = profile.signature
      }

      const formattedPR = profile.pr
        .replace(/ISSUE_TYPE/g, type)
        .replace(/ISSUE/g, issue)
        .replace(/REPO_ORG/g, repoDetails.user)
        .replace(/REPO_NAME/g, repoDetails.repo)
        .replace(/SIGNATURE/g, signature)

      return formattedPR
    }

    const { user: repoName, repo: repoOrg } = getRepoDetails()
    return getPR({
      type,
      issue,
      repoOrg,
      repoName,
      user,
    })
  } catch (error) {
    const { user: repoName, repo: repoOrg } = getRepoDetails()

    return getPR({
      type,
      issue,
      repoOrg,
      repoName,
      user,
    })
  }
}

function getBranchName(text: string) {
  const DOT_KEY = 'dwedtw'
  // get first line that is branch name
  const trimmedText = text.replace(/Copy: BranchCommitPR[\s\S]*$/, '');

  // Extracting the number from the text using regex
  const regex = /#(\d+)/
  const matches = trimmedText.match(regex)
  const number = matches ? matches[1] : ''

  // Removing the number and the # from the text
  const textWithoutNumber = trimmedText.replace(regex, '')
  const textWithDashes = textWithoutNumber.replace(/\./g, DOT_KEY)

  // Converting the remaining text to the desired format
  const formattedText =
    number +
    '-' +
    textWithDashes
      .replace(/\s+/g, '-') // Replacing spaces with dashes
      .replace(/[^\w-]/g, '') // Removing non-alphanumeric characters except dashes
      .replace(/_/g, '-') // replace underscore
      .toLowerCase() // Converting to lowercase

  // Removing the trailing dash from the formatted text
  const finalFormattedText = formattedText.replace(/-+$/, '').replace(/-+/g, '-').replace(new RegExp(DOT_KEY, 'g'), '.')

  return finalFormattedText
}

function copyTextToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Text successfully copied to clipboard
    })
    .catch((err) => {
      // Handle errors, e.g., unsupported browser or permission denied
      console.error('Failed to copy text: ', err)
    })
}

function getRepoDetails() {
  const url = window.location.href
  const match = url.match(repoRegex)

  if (match && match.length >= 3) {
    const user = match[1]
    const repo = match[2]
    return { user, repo }
  }
  return { user: '', repo: '' }
}

function getFormattedHeader() {
  const headerElement = document.getElementsByClassName('gh-header-title')
  const formattedHeader = getBranchName(headerElement && headerElement[0] ? headerElement[0].textContent! : '')

  const issueNumber = formattedHeader.match(/\d+(\.\d+)?/g)!
  return { formattedHeader, issueNumber: issueNumber[0] }
}

function getBranchData(prefix: string): void {
  const { formattedHeader } = getFormattedHeader()
  copyTextToClipboard(processBranchName(prefix, formattedHeader))
}

function getCommitData(prefix: string, user: string): void {
  const { issueNumber } = getFormattedHeader()
  copyTextToClipboard(processCommit(prefix, issueNumber, getRepoDetails(), user))
}

function getPrData(prefix: string, user: string): void {
  const { issueNumber } = getFormattedHeader()
  copyTextToClipboard(processPR(prefix, issueNumber, getRepoDetails(), user))
}

function getUsername(): string {
  let user = DEFAULT_USER
  const avatarInfo = document?.querySelector('div#issuecomment-new .d-inline-block > img')!
  const match = avatarInfo?.outerHTML.match(avatarRegex)

  if (match) {
    const username = match[1]
    user = username
  }
  return user
}

function Panel({ alertInfo, setClose }: any): JSX.Element {
  const [prefixes, setPrefixes] = useState(() => getPrefixesTabs())
  const [selectedPrefix, setSelectedPrefix] = useState(prefixes[0])

  const [profilesData, setProfilesData] = useState(() => getProfileData())
  const createHandleClose = (item: string) => () => {
    updateKey(FASTER_PR_PROFILE_KEY, item)
    setProfilesData({ ...profilesData, selected: item })
  }

  useEffect(() => {
    const prefixes = getPrefixesTabs()
    setSelectedPrefix(prefixes[0])
    setPrefixes(prefixes)
    setProfilesData(getProfileData())
  }, [alertInfo.visible, profilesData.selected])

  const user = getUsername()

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedPrefix(newValue)
  }
  return (
    <Card>
      <div>
        <Typography level="h4">
          Copy:{' '}
          <button
            className={styles['button']}
            onClick={(event) => {
              getBranchData(selectedPrefix)
              onButtonClick(event)
            }}
          >
            Branch
          </button>
          <button
            className={styles['button']}
            onClick={(event) => {
              getCommitData(selectedPrefix, user)
              onButtonClick(event)
            }}
          >
            Commit
          </button>
          <button
            className={styles['button']}
            onClick={(event) => {
              getPrData(selectedPrefix, user)
              onButtonClick(event)
            }}
          >
            PR desc
          </button>
        </Typography>
      </div>
      <ButtonGroup
        color="primary"
        size="sm"
        buttonFlex="0 1 100px"
        variant="outlined"
        aria-label="flex button group"
        sx={{
          p: 0,
          '--ButtonGroup-radius': '40px',
        }}
      >
        <CssVarsProvider>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 800,
              border: 'var(--ButtonGroup-separatorSize) solid var(--ButtonGroup-separatorColor)',
            }}
          >
            <Tabs
              value={selectedPrefix}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
            >
              {prefixes.map((prefix: string) => (
                <Tab
                  sx={{
                    textTransform: 'none',
                    fontSize: 14,
                    color: prefix === selectedPrefix ? 'common.white' : 'inherit',
                  }}
                  key={prefix}
                  label={prefix}
                  value={prefix}
                />
              ))}
            </Tabs>
          </Box>
        </CssVarsProvider>
        <Dropdown>
          <MenuButton sx={{ maxWidth: 120 }} startDecorator={<AccountCircleIcon color="primary" fontSize="small" />}>
            <Typography sx={{ width: 80 }} level="body-sm" noWrap>
              {profilesData.selected}
            </Typography>
          </MenuButton>
          <Menu>
            {profilesData.list.map((item: string) => (
              <MenuItem
                key={item}
                {...(profilesData.selected === item && { selected: true, variant: 'soft' })}
                onClick={createHandleClose(item)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
        <IconButton onClick={() => setClose(true)}>
          <Settings color="primary" />
        </IconButton>
      </ButtonGroup>
    </Card>
  )
}

export default Panel
