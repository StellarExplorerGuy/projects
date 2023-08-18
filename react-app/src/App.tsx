import MainPage from 'pages/MainPage'
import 'styles/globals.scss'

import { CssVarsProvider } from '@mui/joy/styles'

function App() {
  return (
    <CssVarsProvider>
      <main>
        <MainPage />
      </main>
    </CssVarsProvider>
  )
}

export default App
