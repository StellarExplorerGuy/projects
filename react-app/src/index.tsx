import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { SERVICE } from 'utils/constants'

const getHeader = () => {
  const url = window.location.href
  let headerElement

  let service = url.match(/^https:\/\/github(\.(?:[a-zA-Z0-9.-]+))?\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/issues\/\d+$/g)
    ? SERVICE.GITHUB
    : ''

  if (!service) {
    // find GITLAB
    service = url.match(/^https:\/\/gitlab\.com\/[a-zA-Z0-9.-]+\/[a-zA-Z0-9.-]+\/-\/issues\/\d+$/g)
      ? SERVICE.GITLAB
      : ''
  }
  if (service === SERVICE.GITHUB) {
    headerElement = document.getElementsByClassName('gh-header-title')
    headerElement = headerElement?.length > 0 ? headerElement[0] : null
  } else if (service === SERVICE.GITLAB) {
    headerElement = document.querySelector('[data-testid="issue-title"]')
  }

  return headerElement
}

const ID = '23e32e23'

//PROD
function onInitAvailable() {
  const headerElement = getHeader()

  if (headerElement) {
    const rootElement = document.createElement('div')
    rootElement.style.display = 'grid'
    rootElement.style.justifyItems = 'start'
    rootElement.id = ID
    headerElement.appendChild(rootElement)

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    observerInit.disconnect()
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
