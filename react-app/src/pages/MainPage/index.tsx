import { useEffect, useState } from 'react'
import Panel from '../../components/Panel'
import MainModal from '../../components/modals/MainModal'

import { RuntimeLoader } from '@rive-app/react-canvas-lite'
import { getAnimationURL } from '../../utils/animation'
import { useConfigContext } from './ConfigContext'
import { CssVarsProvider } from '@mui/joy/styles'
import { ScopedCssBaseline } from '@mui/joy'

function Main(): JSX.Element {
  const [open, setClose] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
  })

  useEffect(() => {
    // load it once if theme enabled
    RuntimeLoader.setWasmUrl(getAnimationURL('r.wasm'))
    const openModalHandler = () => {
      setClose(true)
    }
    document.addEventListener('openModalEvent', openModalHandler)

    return () => {
      window.parent.removeEventListener('openModalEvent', openModalHandler)
    }
  }, [])

  const themeConfig= useConfigContext()

  return (
    <CssVarsProvider defaultMode="light" theme={themeConfig.config.theme.config.custom.joy}>
      <ScopedCssBaseline disableColorScheme>
        <Panel themeConfig={themeConfig} alertInfo={alertInfo} setClose={setClose} />
        <MainModal alertInfo={alertInfo} open={open} setClose={setClose} setAlertInfo={setAlertInfo} />
      </ScopedCssBaseline>
    </CssVarsProvider>
  )
}

export default Main
