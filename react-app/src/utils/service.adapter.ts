import { SERVICE, DEFAULT_USER } from './constants'

const GITHUB_REGEX = {
  USER_NAME: /alt="@([^"]+)">/,
  ISSUE: /([^/]+)\/([^/]+)\/issues\/(\d+)/,
  PULL_REQUEST: /([^/]+)\/([^/]+)\/pull\/(\d+)/,
}
const GITLAB_REGEX = {
  USER_NAME: /alt="@([^"]+)">/,
  ISSUE: /([^/]+)\/([^/]+)\/issues\/(\d+)/,
  PULL_REQUEST: /([^/]+)\/([^/]+)\/pull\/(\d+)/,
}

function matchUrl(url: string, regex: RegExp): { user: string; repo: string } {
  const match = url.match(regex)
  if (match && match?.length >= 4) {
    const user = match[1]
    const repo = match[2]
    return { user, repo }
  }
  return { user: '', repo: '' }
}

export const getDetails = (service: SERVICE) => {
  if (service === SERVICE.GITHUB) {
    return {
      getHeaderElement: (): string => {
        const headerElement = document.getElementsByClassName('gh-header-title')
        return headerElement && headerElement[0] ? headerElement[0].textContent! : ''
      },
      getBranchName: (text: string): string => {
        const DOT_KEY = 'dwedtw'
        // get first line that is branch name
        const trimmedText = text.replace(/Copy: BranchCommitPR[\s\S]*$/, '')

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
        const finalFormattedText = formattedText
          .replace(/-+$/, '')
          .replace(/-+/g, '-')
          .replace(new RegExp(DOT_KEY, 'g'), '.')

        const dotRegex = /[.,!]+$/ // Match one or more dots at the end
        const finalText = finalFormattedText.replace(dotRegex, '')
        return finalText
      },
      getUsername: (): string => {
        let user = DEFAULT_USER
        const avatarInfo = document?.querySelector('div#issuecomment-new .d-inline-block > img')!
        const match = avatarInfo?.outerHTML.match(GITHUB_REGEX.USER_NAME)

        if (match) {
          const username = match[1]
          user = username
        }
        return user
      },
      getRepoDetails: () => {
        const url = window.location.href
        const issueMatch = matchUrl(url, GITHUB_REGEX.ISSUE)
        const pullRequestMatch = matchUrl(url, GITHUB_REGEX.PULL_REQUEST)
        if (issueMatch.user && issueMatch.repo) {
          return { user: issueMatch.user || '', repo: issueMatch.repo || '' }
        }
        if (pullRequestMatch.user && pullRequestMatch.repo) {
          return { user: pullRequestMatch.user || '', repo: pullRequestMatch.repo || '' }
        }
        return { user: '', repo: '' }
      },
    }
  }

  return {
    getHeaderElement: (): string => '',
    getBranchName: (): string => '',
    getUsername: (): string => '',
    getRepoDetails: () => ({ user: '', repo: '' }),
  }
}
