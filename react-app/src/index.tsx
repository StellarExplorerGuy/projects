import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { SERVICE } from 'utils/constants'
import { getService } from 'utils/data'

const FASTER_PR_SCRIPT_ID = 'faster-pr-1we4'

const getHeader = (service: SERVICE) => {
  let headerElement
  if (service === SERVICE.GITHUB) {
    headerElement = document.getElementsByClassName('gh-header-title')
    headerElement = headerElement?.length > 0 ? headerElement[0] : null
  } else if (service === SERVICE.GITLAB) {
    headerElement = document.querySelector('[data-testid="issue-title"]')
    //enable for merge_requests
    if (!headerElement) {
      headerElement = document.querySelector('[data-testid="title-content"]')
    }
  } else if (service === SERVICE.TRELLO) {
    headerElement = document.getElementsByClassName('window-header js-card-detail-header')
    headerElement = headerElement?.length > 0 ? headerElement[0] : null
  } else if (service === SERVICE.JIRA_DEFAULT) {
    headerElement = document.getElementById('jira-issue-header')
  } else if (service === SERVICE.JIRA_COMPANY_1) {
    headerElement = document.getElementsByClassName('issue-header-content')
    headerElement = headerElement?.length > 0 ? headerElement[0] : null
  }
  return headerElement
}

function process(headerElement: Element, currentService: SERVICE) {
  const fasterPRScripts = document.querySelectorAll(`#${FASTER_PR_SCRIPT_ID}`)
  fasterPRScripts.forEach((fasterPRScript) => {
    fasterPRScript.remove()
  })
  if (headerElement) {
    const rootElement = document.createElement('div')
    rootElement.id = FASTER_PR_SCRIPT_ID
    Object.assign(rootElement.style, {
      display: 'grid',
      justifyItems: 'start',
    })

    if (currentService === SERVICE.TRELLO) {
      Object.assign(rootElement.style, {
        left: '-56px',
        position: 'relative',
      })
    }

    headerElement.appendChild(rootElement)

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  }
}

//PROD
let debounceTimeout: NodeJS.Timeout

function onInitAvailable() {
  clearTimeout(debounceTimeout)
  const url = window.location.href
  const currentService = getService()

  if (url) {
    try {
      const headerElement = getHeader(currentService)
      debounceTimeout = setTimeout(() => {
        if (currentService && headerElement) {
          let isStyleLoaded = false
          const buttonRendered = document.getElementById('wjdkwed1')
          if (buttonRendered) {
            // resolve the issue if style isn't loaded
            const selectedButton = document.querySelector('button.Mui-selected')
            if (selectedButton) {
              isStyleLoaded = getComputedStyle(selectedButton).color === 'rgb(25, 118, 210)'
            }
            const hasClickEvent = buttonRendered.onclick !== null && isStyleLoaded
            if (hasClickEvent) {
              // observerInit.disconnect()
            } else {
              process(headerElement, currentService)
            }
          } else {
            process(headerElement, currentService)
          }
        }
      }, 200)
    } catch (error) {
      console.error('[error]', error)
    }
  }
}

const observerInit = new MutationObserver(onInitAvailable)
observerInit.observe(document.body, {
  childList: true,
  subtree: true,
})

///////////
// DEV
// const rootElement = document.createElement('div')
// rootElement.id = '3e23e23e-root'
// document.body.appendChild(rootElement)

// const root = ReactDOM.createRoot(rootElement)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
