export const DEFAULT_PROFILE = 'default'
export const BRANCH_PREFIXES = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'release']
export const FASTER_PR_CONFIG = 'FASTER_PR_CONFIG'
export const FASTER_PR_PROFILE_KEY = 'FASTER_PR_KEY'
export const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'
export const DEFAULT_USER = 'Name Surname <name.surname@org.com>'

const templateTooltip = (text: string) =>
  `The ${text} body where by replacing dynamic keys with their actual values from the template. The dynamic keys you can use are found in the toolbar below: ISSUE_TYPE, REPO_ORG, REPO_NAME, ISSUE, SIGNATURE.`

export const TEXT = {
  MAIN: {
    INFO: "You can switch profiles, create new ones, or use the default profile. Configurations are stored in your browser storage on a per-page basis (e.g., GitHub and Gitlab have their own configurations). Remember to click 'Save' to apply any changes.",
    USERNAME_PLACEHOLDER: 'John Doe john.doe@email.com',
  },
  ALERT: {
    COMMENTS_HIDDEN: `You can't edit the PR template with hidden comments in preview mode. Finish template changes first, then hide comments to prevent any loss related to comments.`,
  },
  LABEL: {
    DEMO_VIEW: 'Demo view',
  },
  TOOLTIP: {
    COMMIT_TEMPLATE: templateTooltip('commit'),
    PR_TEMPLATE: templateTooltip('PR'),
    SIGNATURE: 'Define signature for your commit and PR templates.',
  },
  MANAGE_INTEGRATIONS: {
    TITLE:
      'Your contributions make a significant impact, fueling my projects and boosting my confidence to create more!🚀',
    GLOBALS:
      'You have the option to adjust extension behavior by establishing global configuration settings at the top to supersede profile-specific configurations. This is particularly useful if you desire a consistent configuration that applies to all profiles.',
    PROFILE: 'Customize your profile with a max of two characters permitted for initials e.g. AS, TS.',
    THEMES: 'Customize your theme.',
  },
}

export const TEMPLATE_KEY = {
  ISSUE_TYPE: 'ISSUE_TYPE',
  ISSUE: 'ISSUE',
  REPO_ORG: 'REPO_ORG',
  REPO_NAME: 'REPO_NAME',
  SIGNATURE: 'SIGNATURE',
}

export const HOME_URL = 'aHR0cHM6Ly9naXRodWIuY29tL1N0ZWxsYXJFeHBsb3Jlckd1eS9wcm9qZWN0cw=='
export const GIT_URL =
  'aHR0cHM6Ly9naXRodWIuY29tL1N0ZWxsYXJFeHBsb3Jlckd1eS9wcm9qZWN0cy9ibG9iL21haW4vZG9jcy9jb21taXQvY29tbWl0Lm1k'
export const KO_FI_URL = 'aHR0cHM6Ly9rby1maS5jb20vc3RlbGxhcmV4cGxvcmVyZ3V5'

export const DEFAULT_LOCAL_STORAGE_ALERT = {
  visible: true,
  msg: 'It seems browser localStorage is cleared, default profile is set 😱.',
  type: 'warning',
}

export enum SERVICE {
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  TRELLO = 'TRELLO',
  JIRA_DEFAULT = 'JIRA_DEFAULT',
  JIRA_COMPANY_1 = 'JIRA_COMPANY_1',
  // JIRA_COMPANY_2 = 'JIRA_COMPANY_2',
  MONDAY_DEFAULT = 'MONDAY_DEFAULT',
}

export enum ADVANCED {
  INTEGRATIONS,
  PROFILE,
  GLOBALS,
  THEMES,
}

export const PREVIEW_MD = {
  ENABLED: { hideToolbar: false, visible: true, editable: false },
  DISABLED: { hideToolbar: true, visible: true, editable: true },
}
