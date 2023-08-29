import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const rootElement = document.createElement('div')
rootElement.id = '3e23e23e-root'
document.body.appendChild(rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
