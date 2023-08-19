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
