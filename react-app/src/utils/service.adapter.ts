import { SERVICE, DEFAULT_USER } from './constants'

const GITHUB_REGEX = {
  USER_NAME: /alt="@([^"]+)">/,
  ISSUE: /([^/]+)\/([^/]+)\/issues\/(\d+)/,
  PULL_REQUEST: /([^/]+)\/([^/]+)\/pull\/(\d+)/,
}
const GITLAB_REGEX = {
  USER_NAME: /<span class="gl-sr-only">([^<]+)<\/span>/,
  ISSUE: /gitlab\.com\/([^/]+)\/([^/]+)\/-\/issues\/(\d+)/,
  PULL_REQUEST: /gitlab\.com\/([^/]+)\/([^/]+)\/-\/merge_requests\/(\d+)/,
}

const TRELLO_REGEX = {
  USER_NAME: /title="([^"]+)"/,
  ISSUE: /gitlab\.com\/([^/]+)\/([^/]+)\/-\/issues\/(\d+)/,
  PULL_REQUEST: /gitlab\.com\/([^/]+)\/([^/]+)\/-\/merge_requests\/(\d+)/,
}

function matchUrl(url: string, regex: RegExp): { user: string; repo: string; issueNumber: string } {
  const match = url.match(regex)
  if (match && match?.length >= 3) {
    const user = match[1]
    const repo = match[2]
    const issueNumber = match[3]
    return { user, repo, issueNumber }
  }
  return { user: '', repo: '', issueNumber: '' }
}

export const getDetails = (service: SERVICE) => {
  if (service === SERVICE.GITHUB) {
    return {
      getHeaderElement: (): string => {
        const headerElement = document.getElementsByClassName('gh-header-title')
        return headerElement && headerElement[0] ? headerElement[0].textContent! : ''
      },
      getBranchName: (text: string, number: string): string => {
        const DOT_KEY = 'dwedtw'
        // get first line that is branch name
        const trimmedText = text.replace(/Copy: BranchCommitPR[\s\S]*$/, '')

        // Extracting the number from the text using regex
        const regex = /#(\d+)/
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
          return {
            user: issueMatch.user || '',
            repo: issueMatch.repo || '',
            issueNumber: issueMatch.issueNumber || '',
          }
        }
        if (pullRequestMatch.user && pullRequestMatch.repo) {
          return {
            user: pullRequestMatch.user || '',
            repo: pullRequestMatch.repo || '',
            issueNumber: pullRequestMatch.issueNumber || '',
          }
        }
        return { user: '', repo: '', issueNumber: '' }
      },
    }
  }
  if (service === SERVICE.GITLAB) {
    return {
      getHeaderElement: (): string => {
        let headerElement = document.querySelector('[data-testid="issue-title"]') as any
        //enable for merge_requests
        if (!headerElement) {
          headerElement = document.querySelector('[data-testid="title-content"]')
        }
        return headerElement ? headerElement.textContent! : ''
      },
      getBranchName: (text: string, number: string): string => {
        const DOT_KEY = 'dwedtw'
        // get first line that is branch name
        const trimmedText = text.replace(/Copy: BranchCommitPR[\s\S]*$/, '')

        // Removing the number and the # from the text
        const textWithoutNumber = trimmedText
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
        const avatarInfo = document?.querySelector('.user-bar-item  .gl-sr-only')!
        const matches = avatarInfo?.outerHTML.match(GITLAB_REGEX.USER_NAME)
        if (matches && matches.length > 1) {
          const username = matches[1]
          return username.replace('user’s menu', '').trim()
        }
        return DEFAULT_USER
      },
      getRepoDetails: () => {
        const url = window.location.href
        const issueMatch = matchUrl(url, GITLAB_REGEX.ISSUE)
        const pullRequestMatch = matchUrl(url, GITLAB_REGEX.PULL_REQUEST)
        if (issueMatch.user && issueMatch.repo) {
          return {
            user: issueMatch.user || '',
            repo: issueMatch.repo || '',
            issueNumber: issueMatch.issueNumber || '',
          }
        }
        if (pullRequestMatch.user && pullRequestMatch.repo) {
          return {
            user: pullRequestMatch.user || '',
            repo: pullRequestMatch.repo || '',
            issueNumber: pullRequestMatch.issueNumber || '',
          }
        }
        return { user: '', repo: '', issueNumber: '' }
      },
    }
  }
  if (service === SERVICE.TRELLO) {
    return {
      getHeaderElement: (): string => {
        let headerElement = document.querySelector('.card-detail-title-assist') as any
        return headerElement ? headerElement.textContent! : ''
      },
      getBranchName: (text: string, number: string): string => {
        const DOT_KEY = 'dwedtw'
        // get first line that is branch name
        const trimmedText = text.replace(/Copy: BranchCommitPR[\s\S]*$/, '')

        // Removing the number and the # from the text
        const textWithoutNumber = trimmedText
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
        const avatarInfo = document?.querySelector('.card-detail-window div[title]')!
        const matches = avatarInfo?.outerHTML.match(TRELLO_REGEX.USER_NAME)
        if (matches && matches.length > 1) {
          const username = matches[1]
          return username.replace(/ \(.*/, '').trim()
        }
        return DEFAULT_USER
      },
      getRepoDetails: () => {
        const url = window.location.href
        const match = url.match(/\/(\d+)\-/)
        let issueNumber = ''
        if (match?.length) {
          issueNumber = match[1]
        }

        return {
          user:  '',
          repo: url,
          issueNumber: issueNumber || '',
        }
      },
    }
  }
  return {
    getHeaderElement: (): string => '',
    getBranchName: (): string => '',
    getUsername: (): string => '',
    getRepoDetails: () => ({ user: '', repo: '', issueNumber: '' }),
  }
}
