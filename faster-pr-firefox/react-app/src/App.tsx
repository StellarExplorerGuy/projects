import Main from './pages/MainPage'

import { ConfigContextProvider } from './pages/MainPage/ConfigContext'

function App() {
  return (
    <ConfigContextProvider>
      <Main />
    </ConfigContextProvider>
  )
}

export default App
