import Main from './pages/MainPage'
import { CssVarsProvider } from '@mui/joy/styles'
import { ScopedCssBaseline } from '@mui/joy'

function App() {
  return (
    <CssVarsProvider defaultMode="light">
      <ScopedCssBaseline disableColorScheme>
        <Main />
      </ScopedCssBaseline>
    </CssVarsProvider>
  )
}

export default App
