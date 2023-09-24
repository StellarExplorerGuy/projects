import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const ID = '23e32e23'

function onInitAvailable() {
  const headerElement = document.getElementsByClassName('gh-header-title')

  if (headerElement?.length > 0) {
    const rootElement = document.createElement('div')
    rootElement.id = ID
    headerElement[0].appendChild(rootElement)

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
// const rootElement = document.createElement('div')
// rootElement.id = '3e23e23e-root'
// document.body.appendChild(rootElement)

// const root = ReactDOM.createRoot(rootElement)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
