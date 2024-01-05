import { UniqueIdentifier } from '@dnd-kit/core'

import {
  DEFAULT_PROFILE,
  BRANCH_PREFIXES,
  TEMPLATE_KEY,
  SERVICE,
  FASTER_PR_CONFIG,
  FASTER_PR_PROFILE,
  FASTER_PR_PROFILE_KEY,
} from './constants'
import { AppConfig, ThemeKey } from '../types'

type CommitBody = {
  type: string
  issue: string
  repoOrg: string
  repoName: string
  user: string
}

type PRBody = {
  type: string
  issue: string
  repoOrg: string
  repoName: string
  user: string
}

const defaultInitializer = (index: number) => index
export function createRange<T = number>(length: number, initializer: (index: number) => any = defaultInitializer): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

const singleSeparator = '`'
const separator = '```'

export const getCommit = ({ type, issue, repoOrg, repoName, user }: CommitBody): string => {
  return `${type}: 

<body>

Contributes: ${repoOrg}/${repoName}#${issue}

Signed-off-by: ${user}`
}

export const getPR = (params: PRBody): string => {
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
- ${params.repoOrg}/${params.repoName}#${params.issue}

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
- ${params.repoOrg}/${params.repoName}#${params.issue}

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

export const defaultProfile = () => {
  const { ISSUE_TYPE: TYPE, ISSUE, REPO_ORG, REPO_NAME, SIGNATURE } = TEMPLATE_KEY

  return {
    profiles: [DEFAULT_PROFILE],
    profile: DEFAULT_PROFILE,
    signature: '',
    branchSeparator: '',
    branchPrefixes: BRANCH_PREFIXES ?? createRange<UniqueIdentifier>(16, (index) => index + 1),
    checked: true,
    uppercase: false,
    commit: getCommit({ type: TYPE, issue: ISSUE, repoOrg: REPO_ORG, repoName: REPO_NAME, user: SIGNATURE }),
    pr: getPR({ type: TYPE, issue: ISSUE, repoOrg: REPO_ORG, repoName: REPO_NAME, user: SIGNATURE }),
    slimPrChecked: false,
  }
}
export const DEFAULT_GLOBAL_CONFIG = () => ({
  enabled: false,
  signature: '',
  checked: false,
})

export const DEFAULT_PROFILE_CONFIG = () => ({
  avatar: '🦊',
})

export const DEFAULT_THEME_CONFIG = () => ({
  id: ThemeKey.default as ThemeKey,
  config: {
    fat: false
  }
})

export const showAlertInfo = (
  data: {
    visible: boolean
    msg: string
    type: string
  },
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
    }>
  >,
) => {
  setAlertInfo(data)
  setTimeout(() => {
    setAlertInfo({
      visible: false,
      msg: '',
      type: 'success',
    })
  }, 6000)
}

export const updateLocalStorage = (key: string, data: any): void => {
  try {
    const localData = JSON.parse(localStorage.getItem(key)!) || {}
    localStorage.setItem(key, JSON.stringify({ ...localData, ...data }))
  } catch (error) {}
}

export const updateKey = (key: string, data: string): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {}
}

export const getAppConfig = (): AppConfig => {
  try {
    const localConfig = localStorage.getItem(FASTER_PR_CONFIG)!

    if (!localConfig) {
      updateLocalStorage(FASTER_PR_CONFIG,  {
        profile: DEFAULT_PROFILE_CONFIG(),
        global: DEFAULT_GLOBAL_CONFIG(),
        theme: DEFAULT_THEME_CONFIG(),
      })
      return {
        profile: DEFAULT_PROFILE_CONFIG(),
        global: DEFAULT_GLOBAL_CONFIG(),
        theme: DEFAULT_THEME_CONFIG(),
      }
    }
    const appConfig = JSON.parse(localConfig) as AppConfig
    if (!appConfig.global || !appConfig.profile || !appConfig.theme) {
      updateLocalStorage(FASTER_PR_CONFIG,  {
        profile: DEFAULT_PROFILE_CONFIG(),
        global: DEFAULT_GLOBAL_CONFIG(),
        theme: DEFAULT_THEME_CONFIG(),
      })
      return { profile: DEFAULT_PROFILE_CONFIG(), global: DEFAULT_GLOBAL_CONFIG(), theme: DEFAULT_THEME_CONFIG() }
    }
    return appConfig
  } catch (error) {
    return { profile: DEFAULT_PROFILE_CONFIG(), global: DEFAULT_GLOBAL_CONFIG(), theme: DEFAULT_THEME_CONFIG() }
  }
}

export const decodeUrl = (encodedText: string): string => {
  const doubleReversedText = atob(encodedText)
  const reversedText = doubleReversedText.split('').reverse().join('')
  return reversedText.split('').reverse().join('')
}

export const clearComments = (text: string): string => {
  const regex = /<!--(.*?)-->\n/gs
  return text.replace(regex, '')
}

export function getLocalStorage(key: string) {
  try {
    const localData = JSON.parse(localStorage.getItem(key)!) || {}
    return localData
  } catch (error) {
    return {}
  }
}

const githubRegex = /^https:\/\/github(\.(?:[a-zA-Z0-9.-]+))?\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/issues\/\d+$/
const gitlabRegex = /^https:\/\/gitlab\.com\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/-\/(issues|merge_requests)\/\d+$/
const trelloRegex = /^https:\/\/trello\.com\/[A-Za-z0-9-]\/[A-Za-z0-9]+\/\d+-[A-Za-z0-9-]+/
// const jiraDefaultRegex = /^https:\/\/(?:[a-zA-Z0-9.-]+\.)?atlassian.net\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+/
const jiraCompany1Regex = /^https:\/\/jsw(?:[a-zA-Z0-9.-]+)?.com\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+/
const jiraCompany2Regex = /^https:\/\/jira(?:[a-zA-Z0-9.-]+)?.net\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+/
const mondayDefaultRegex = /^https:\/\/[a-zA-Z0-9.-]+\.monday\.com\/boards\/\d+\/pulses\/\d+/

export const getService = (): SERVICE => {
  const url = window.location.href

  if (githubRegex.test(url)) {
    return SERVICE.GITHUB
  } else if (gitlabRegex.test(url)) {
    return SERVICE.GITLAB
  } else if (trelloRegex.test(url)) {
    return SERVICE.TRELLO
    // } else if (jiraDefaultRegex.test(url)) {
    //   return SERVICE.JIRA_DEFAULT
  } else if (jiraCompany1Regex.test(url)) {
    return SERVICE.JIRA_COMPANY_1
  } else if (jiraCompany2Regex.test(url)) {
    return SERVICE.JIRA_COMPANY_2
  } else if (mondayDefaultRegex.test(url)) {
    return SERVICE.MONDAY_DEFAULT
  }

  return SERVICE.GITHUB
}

export const getServiceConfig = () => {
  const currentService = getService()
  const config = {
    panelMaxWidth: 818,
  }
  if (currentService === SERVICE.TRELLO) {
    config.panelMaxWidth = 584
  } else if (currentService === SERVICE.MONDAY_DEFAULT) {
    config.panelMaxWidth = 520
  }
  return config
}

export function getProfileData() {
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

export const COMMIT_TEMPLATES = [
  {
    name: 'Template 1',
    template: getCommit({
      type: TEMPLATE_KEY.ISSUE_TYPE,
      issue: TEMPLATE_KEY.ISSUE,
      repoOrg: TEMPLATE_KEY.REPO_ORG,
      repoName: TEMPLATE_KEY.REPO_NAME,
      user: TEMPLATE_KEY.SIGNATURE,
    }),
  },
  {
    name: 'Template 2',
    template: `ISSUE_TYPE(REPO_ORG/REPO_NAME#ISSUE): `,
  },
  {
    name: 'Template 3',
    template: `ISSUE_TYPE(SIGNATURE): `,
  },
]

export const PR_TEMPLATES = [
  {
    name: 'Template 1',
    template: getPR({
      type: TEMPLATE_KEY.ISSUE_TYPE,
      issue: TEMPLATE_KEY.ISSUE,
      repoOrg: TEMPLATE_KEY.REPO_ORG,
      repoName: TEMPLATE_KEY.REPO_NAME,
      user: TEMPLATE_KEY.SIGNATURE,
    }),
  },
  {
    name: 'Template 2',
    template: `## Status
**READY**

## Description
- ISSUE_TYPE: 


Contributes:
- REPO_ORG/REPO_NAME#ISSUE

Signed-off-by: SIGNATURE

## Impacted Areas in Application


### Screenshots


## Any special notes for your reviewer?


`,
  },
  {
    name: 'Template 3',
    template: `## Status
**READY**

## 📝 Description



## 🎯 Impacted Areas in Application


### 📸 Screenshots



## 📌 Any special notes for your reviewer?


`,
  },
  {
    name: 'Template 4',
    template: `### 🛠 Changes being made
<!--
Here give examples of the changes you've made in this pull request. Include an itemized list if you can. It'll help the reviewer
-->

### ✨ What's the context?
<!--
What's the context for the changes? Are there any
-->
ISSUE_TYPE:
- REPO_ORG/REPO_NAME#ISSUE


### 🧠 Rationale behind the change
<!--
Why did you choose to make these changes? Were there any trade-offs you had to consider? 
-->


### 🧪 Test plan
<!--
How do you know the changes are safe to ship to production?
-->


### 📸 Screenshots (optional)
<!--
If you made UI changes, what are the before an afters?
-->


`,
  },
]
