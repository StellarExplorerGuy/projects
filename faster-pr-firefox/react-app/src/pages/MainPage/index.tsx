import { useEffect, useState } from 'react'
import Panel from '../../components/Panel'
import MainModal from '../../components/modals/MainModal'

import { RuntimeLoader } from '@rive-app/react-canvas-lite'
import { getAnimationURL } from '../../utils/animation'
import { useConfigContext } from './ConfigContext'
import { CssVarsProvider } from '@mui/joy/styles'
import { ScopedCssBaseline, Stack } from '@mui/joy'
import Visibility from '@mui/icons-material/Visibility'
import IconButton from '@mui/joy/IconButton'
import { isPanelHidden, updateKey } from '../../utils/data'
import { Tooltip } from '@mui/joy'
import { ACTIVE_STYLE_ID, FASTER_PR_PANEL } from '../../utils/constants'

function Main(): JSX.Element {
  const [panelEnabled, setPanelEnabled] = useState(() => isPanelHidden())
  const [open, setClose] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
  })

  function setPanelVisibility() {
    const visibility = !panelEnabled
    updateKey(FASTER_PR_PANEL, visibility)
    setPanelEnabled(visibility)
  }
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

  useEffect(() => {
    if (panelEnabled === null) {
      updateKey(FASTER_PR_PANEL, true)
      setPanelEnabled(true)
    }
  }, [panelEnabled])

  const themeConfig = useConfigContext()

  return (
    <CssVarsProvider defaultMode="light" theme={themeConfig?.config?.theme?.config?.custom?.joy}>
      <ScopedCssBaseline disableColorScheme sx={{ borderRadius: panelEnabled ? 0 : 50 }}>
        <Stack direction="row" spacing={2}>
          {panelEnabled ? (
            <Panel
              themeConfig={themeConfig}
              alertInfo={alertInfo}
              setClose={setClose}
              setPanelVisibility={setPanelVisibility}
            />
          ) : (
            <Tooltip arrow title="Show Panel" variant="solid" placement="right" color="neutral" size="lg">
              <IconButton id={ACTIVE_STYLE_ID} aria-label="delete" color="primary" onClick={() => setPanelVisibility()}>
                <Visibility color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
        <MainModal alertInfo={alertInfo} open={open} setClose={setClose} setAlertInfo={setAlertInfo} />
      </ScopedCssBaseline>
    </CssVarsProvider>
  )
}

export default Main
