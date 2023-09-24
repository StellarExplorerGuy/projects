import Main from 'pages/MainPage'
import 'styles/globals.scss'

import { CssVarsProvider } from '@mui/joy/styles'
import { ScopedCssBaseline } from '@mui/joy'

function App() {
  return (
    <CssVarsProvider defaultMode="system">
      <ScopedCssBaseline disableColorScheme>
        <Main />
      </ScopedCssBaseline>
    </CssVarsProvider>
  )
}

export default App
