import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react'
import { AppConfig } from '../../types'
import { getAnimationURL } from '../../utils/animation'
import { getAppConfig } from '../../utils/data'
import { THEMES } from '../../utils/theme'

function getThemeConfig(): AppConfig {
  const appConfig = getAppConfig()
  const currentTheme = THEMES[appConfig.theme.id]

  const updatedTheme = {
    id: appConfig.theme.id,
    config: {
      animation: {
        autoplay: currentTheme.animation.autoplay || false,
        shouldDisableRiveListeners: currentTheme.animation.shouldDisableRiveListeners || false,
        src: currentTheme.animation.src ? getAnimationURL(currentTheme.animation.src) : '',
      },
      custom: currentTheme.custom
    },
  }
  return {
    profile: appConfig.profile,
    global: appConfig.global,
    theme: updatedTheme,
  }
}

type ConfigContextReturnType = {
  config: AppConfig
  setConfig: Dispatch<SetStateAction<AppConfig>>
}

const ConfigContext = createContext<ConfigContextReturnType>(null!)

export const ConfigContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState(() => getThemeConfig())

  const ctx = useMemo(() => {
    return {
      config,
      setConfig,
    }
  }, [config, setConfig])

  return <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
}

export function useConfigContext() {
  const configContext = useContext(ConfigContext)

  if (!configContext) {
    throw new Error('To use "useConfigContext" some of the parent components must be in <ConfigContextProvider/>')
  }

  return configContext
}
