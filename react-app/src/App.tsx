import Main from 'pages/MainPage'
import 'styles/globals.scss'

import { CssVarsProvider } from '@mui/joy/styles'

function App() {
  return (
    <CssVarsProvider defaultMode='system'>
      <Main />
    </CssVarsProvider>
  )
}

export default App
