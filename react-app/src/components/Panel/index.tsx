import { useEffect, useState } from 'react'

import styles from './Panel.module.scss'

import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'
import IconButton from '@mui/joy/IconButton'
import Settings from '@mui/icons-material/Settings'
import MenuButton from '@mui/joy/MenuButton'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import Dropdown from '@mui/joy/Dropdown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Card from '@mui/joy/Card'
import { Typography } from '@mui/joy'
import { updateKey } from 'utils/data'

const singleSeparator = '`'
const separator = '```'
const DEFAULT_USER = 'Name Surname <name.surname@org.com>'
const FASTER_PR_PROFILE_KEY = 'FASTER_PR_KEY'
const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'
const DEFAULT_BRANCH_PREFIXES = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'release']
const avatarRegex = /alt="@([^"]+)">/
const repoRegex = /([^/]+)\/([^/]+)\/issues/

function getCommit(type: any, issue: any, repoDetails: { user: any; repo: any }, user: any) {
  return `${type}: 

<body>

Contributes: ${repoDetails.user}/${repoDetails.repo}#${issue}

Signed-off-by: ${user}`
}

function getPR(params: { type: any; issueNumber: any; repoDetails: any; user: any }) {
  return `<!-- Commit Message Title
* When opening this PR, the raiser should set the title of this PR to the first line of their desired commit message, e.g:
${separator}
feat|fix|docs|style|refactor|perf|test|chore: changed function X
${separator}
* The reviewer should ensure that the first commit message field is of this form when performing the ${singleSeparator}squash and merge${singleSeparator} from this page.
-->

## Status
**READY**

## Description
${separator}
- ${params.type}: 

Contributes:
- ${params.repoDetails.user}/${params.repoDetails.repo}#${params.issueNumber}

Signed-off-by: ${params.user}
${separator}

## Impacted Areas in Application
<!-- List general components of the application that this PR will affect: -->

### Screenshots
<!-- For UI items, please provide screenshots demonstrating the work completed -->

## Which issue(s) does this pull-request fix?
<!-- Please include a link to the issue -->
<!-- Contributes to: your-org/your-project# -->
<!-- Closes: your-org/your-project# -->

Contributes:
- ${params.repoDetails.user}/${params.repoDetails.repo}#${params.issueNumber}

## Any special notes for your reviewer?

--- 

## Checklist
- [ ] ~Automated tests exist~
- [ ] ~Local unit tests performed~
- [ ] ~Documentation exists [link]()~
- [x] Local git lint performed
- [x] Desired commit message set as PR title and description set above
- [x] Link to relevant GitHub issue provided
`
}

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

    return getCommit(type, issue, repoDetails, user)
  } catch (error) {
    return getCommit(type, issue, repoDetails, user)
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

    return getPR({
      type,
      issueNumber: issue,
      repoDetails: getRepoDetails(),
      user,
    })
  } catch (error) {
    return getPR({
      type,
      issueNumber: issue,
      repoDetails: getRepoDetails(),
      user,
    })
  }
}

function getBranchName(text: string) {
  const DOT_KEY = 'dwedtw'
  // get first line that is branch name
  const trimmedText = text.trim().split('\n')[0]

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

function Panel({ setClose }: any): JSX.Element {
  const [prefixes, setPrefixes] = useState(() => getPrefixesTabs())
  const [selectedPrefix, setSelectedPrefix] = useState(prefixes[0])

  const [profilesData, setProfilesData] = useState(() => getProfileData())
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const createHandleClose = (item: string, index: number) => () => {
    if (typeof index === 'number') {
      updateKey(FASTER_PR_PROFILE_KEY, item)
      setSelectedIndex(index)
    }
  }

  useEffect(() => {
    const prefixes = getPrefixesTabs()
    setSelectedPrefix(prefixes[0])
    setPrefixes(prefixes)
    setProfilesData(getProfileData())
  }, [selectedIndex])

  const user = getUsername()
  return (
    <Card sx={{ minWidth: 800 }}>
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
      <div>
        <ButtonGroup
          color="primary"
          buttonFlex={1}
          variant="outlined"
          aria-label="flex button group"
          sx={{
            p: 0,
            maxWidth: '100%',
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          {prefixes.map((prefix: string) => (
            <Button
              key={prefix}
              onClick={() => setSelectedPrefix(prefix)}
              variant={prefix === selectedPrefix ? 'solid' : 'outlined'}
            >
              {prefix}
            </Button>
          ))}
          <Dropdown>
            <MenuButton sx={{ maxWidth: 120 }} startDecorator={<AccountCircleIcon color="primary" fontSize="small" />}>
              <Typography sx={{ width: 80 }} level="body-sm" noWrap>
                {profilesData.selected}
              </Typography>
            </MenuButton>
            <Menu>
              {profilesData.list.map((item: string, index: number) => (
                <MenuItem
                  key={item}
                  {...(selectedIndex === index && { selected: true, variant: 'soft' })}
                  onClick={createHandleClose(item, index)}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
          <IconButton onClick={() => setClose(true)}>
            <Settings />
          </IconButton>
        </ButtonGroup>
      </div>
    </Card>
  )
}

export default Panel
