import { useState } from 'react'
import CssBaseline from '@mui/joy/CssBaseline'
import Panel from 'components/Panel'
import MainModal from 'components/modals/MainModal'

function Main(): JSX.Element {
  const [open, setClose] = useState(false)
  return (
    <>
      <CssBaseline />
      <Panel setClose={setClose} />
      <MainModal open={open} setClose={setClose} />
    </>
  )
}

export default Main
