import { useState } from 'react'
import Panel from 'components/Panel'
import MainModal from 'components/modals/MainModal'

function Main(): JSX.Element {
  const [open, setClose] = useState(false)
  return (
    <>
      <Panel setClose={setClose} />
      <MainModal open={open} setClose={setClose} />
    </>
  )
}

export default Main
