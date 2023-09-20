import Content from 'pages/MainPage'
import 'styles/globals.scss'

import { CssVarsProvider } from '@mui/joy/styles'

function App() {
  return (
    <CssVarsProvider>
      <Content />
    </CssVarsProvider>
  )
}

export default App
