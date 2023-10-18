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

import { clearComments, getCommit, getConfig, getLocalStorage, getPR, getService, updateKey } from 'utils/data'
import { Box, Alert, Grid, Typography } from '@mui/joy'
import {
  FASTER_PR_PROFILE_KEY,
  FASTER_PR_PROFILE,
  BRANCH_PREFIXES,
  DEFAULT_LOCAL_STORAGE_ALERT,
  SERVICE,
} from 'utils/constants'
import { getDetails } from 'utils/service.adapter'

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
    return BRANCH_PREFIXES
  } catch (error) {
    return BRANCH_PREFIXES
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

// if REPO_ORG/REPO_NAME#ISSUE then use repoDetails.repo or user and leave one
function formatIssueLink(
  repoDetails: { user: string; repo: string },
  commit: string,
  type: string,
  signature: string,
): string {
  const issueLink = repoDetails.user || repoDetails.repo

  const formattedCommit = commit
    .replace(/ISSUE_TYPE/g, type)
    .replace(/ISSUE/g, repoDetails.repo)
    .replace(/REPO_ORG/g, repoDetails.repo)
    .replace(/REPO_NAME/g, repoDetails.repo)
    .replace(/SIGNATURE/g, signature)
    // remove duplicate of repoDetails.repo
    .replace(`${issueLink}/${issueLink}#${issueLink}`, issueLink)
    .replace(`${issueLink}/${issueLink}/${issueLink}`, issueLink)
    .replace(`${issueLink}/${issueLink}`, issueLink)
    .replace(`${issueLink}#${issueLink}`, issueLink)

  return formattedCommit
}

function processCommit(type: any, issue: any, repoDetails: { user: any; repo: any }, user: any) {
  try {
    const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
    const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
    const profile = allProfiles[profileKey]
    if (profile) {
      let signature = user

      if (!profile.checked && profile.signature) {
        signature = profile.signature
      }

      const currentService = getService()
      let formattedCommit
      if (currentService === SERVICE.TRELLO) {
        formattedCommit = formatIssueLink(repoDetails, profile.commit, type, signature)
      } else {
        formattedCommit = profile.commit
          .replace(/ISSUE_TYPE/g, type)
          .replace(/ISSUE/g, issue)
          .replace(/REPO_ORG/g, repoDetails.user)
          .replace(/REPO_NAME/g, repoDetails.repo)
          .replace(/SIGNATURE/g, signature)
      }

      return formattedCommit
    }

    const { user: repoName, repo: repoOrg } = getFormattedHeader()
    return getCommit({ type, issue, repoOrg, repoName, user })
  } catch (error) {
    const { user: repoName, repo: repoOrg } = getFormattedHeader()
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

      if (!profile.checked && profile.signature) {
        signature = profile.signature
      }

      const currentService = getService()
      let formattedPR
      if (currentService === SERVICE.TRELLO) {
        formattedPR = formatIssueLink(repoDetails, profile.pr, type, signature)
      } else {
        formattedPR = profile.pr
          .replace(/ISSUE_TYPE/g, type)
          .replace(/ISSUE/g, issue)
          .replace(/REPO_ORG/g, repoDetails.user)
          .replace(/REPO_NAME/g, repoDetails.repo)
          .replace(/SIGNATURE/g, signature)
      }

      if (profile.slimPrChecked) {
        formattedPR = clearComments(formattedPR)
      }

      return formattedPR
    }

    const { user: repoName, repo: repoOrg } = getFormattedHeader()
    return getPR({
      type,
      issue,
      repoOrg,
      repoName,
      user,
    })
  } catch (error) {
    const { user: repoName, repo: repoOrg } = getFormattedHeader()

    return getPR({
      type,
      issue,
      repoOrg,
      repoName,
      user,
    })
  }
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

function getFormattedHeader() {
  const service = getService()
  const { user: org, repo, issueNumber } = getDetails(service).getRepoDetails()
  const user = getDetails(service).getUsername()
  const headerElement = getDetails(service).getHeaderElement()
  const formattedHeader = getDetails(service).getBranchName(headerElement, issueNumber)

  return { org, repo, formattedHeader, issueNumber, user }
}

function getBranchData(prefix: string): void {
  const { formattedHeader } = getFormattedHeader()
  copyTextToClipboard(processBranchName(prefix, formattedHeader))
}

function getCommitData(prefix: string): void {
  const { org, repo, issueNumber, user } = getFormattedHeader()
  copyTextToClipboard(processCommit(prefix, issueNumber, { user: org, repo }, user))
}

function getPrData(prefix: string): void {
  const { org, repo, issueNumber, user } = getFormattedHeader()
  copyTextToClipboard(processPR(prefix, issueNumber, { user: org, repo }, user))
}

function Panel({ alertInfo, setClose }: any): JSX.Element {
  const config = getConfig()

  const [alertDataInfo, setAlertDataInfo] = useState({
    visible: false,
    msg: '',
    type: 'warning',
  })

  const [prefixes, setPrefixes] = useState(() => getPrefixesTabs())
  const [selectedPrefix, setSelectedPrefix] = useState(prefixes[0])

  const [profilesData, setProfilesData] = useState(() => getProfileData())
  const createHandleClose = (item: string) => () => {
    updateKey(FASTER_PR_PROFILE_KEY, item)
    setProfilesData({ ...profilesData, selected: item })
  }

  useEffect(() => {
    try {
      const profileKey = getLocalStorage(FASTER_PR_PROFILE_KEY)
      const allProfiles = getLocalStorage(FASTER_PR_PROFILE)
      const profile = allProfiles[profileKey]
      if (!profile) {
        setAlertDataInfo(DEFAULT_LOCAL_STORAGE_ALERT)
      }
    } catch (error) {
      setAlertDataInfo(DEFAULT_LOCAL_STORAGE_ALERT)
    }
  }, [])

  useEffect(() => {
    const prefixes = getPrefixesTabs()
    setSelectedPrefix(prefixes[0])
    setPrefixes(prefixes)
    setProfilesData(getProfileData())
  }, [alertInfo.visible, profilesData.selected])

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedPrefix(newValue)
  }

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <div>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" spacing={0}>
          <Grid xs={9}>
            <Typography level="h4">
              Copy:{' '}
              <button
                id="wjdkwed1"
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
                  getCommitData(selectedPrefix)
                  onButtonClick(event)
                }}
              >
                Commit
              </button>
              <button
                className={styles['button']}
                onClick={(event) => {
                  getPrData(selectedPrefix)
                  onButtonClick(event)
                }}
              >
                PR desc
              </button>
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
              {alertDataInfo.visible && (
                <Alert variant="soft" color={alertDataInfo.type as any} sx={{ width: 'fit-content', height: 47 }}>
                  {alertDataInfo.msg}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Grid>
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
              maxWidth: config.panelMaxWidth,
              border: 'none !important',
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
                border: '1px solid var(--ButtonGroup-separatorColor)',
                borderTopLeftRadius: ' 40px !important',
                borderBottomLeftRadius: '40px !important',
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
                  label={
                    <Typography sx={{ width: 60 }} level="body-sm" noWrap>
                      {prefix}
                    </Typography>
                  }
                  value={prefix}
                />
              ))}
            </Tabs>
          </Box>
        </CssVarsProvider>
        <Dropdown>
          <MenuButton
            sx={{
              maxWidth: 120,
              borderTop: '1px solid var(--ButtonGroup-separatorColor)',
              borderBottom: '1px solid var(--ButtonGroup-separatorColor)',
            }}
            startDecorator={<AccountCircleIcon color="primary" fontSize="small" />}
          >
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
