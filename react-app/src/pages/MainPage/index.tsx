import { useEffect, useState } from 'react'
import Panel from '../../components/Panel'
import MainModal from '../../components/modals/MainModal'

function Main(): JSX.Element {
  const [open, setClose] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
  })

  useEffect(() => {
    const openModalHandler = () => {
      setClose(true)
    }
    document.addEventListener('openModalEvent', openModalHandler)

    return () => {
      window.parent.removeEventListener('openModalEvent', openModalHandler)
    }
  }, [])

  return (
    <>
      <Panel alertInfo={alertInfo} setClose={setClose} />
      <MainModal alertInfo={alertInfo} open={open} setClose={setClose} setAlertInfo={setAlertInfo} />
    </>
  )
}

export default Main
