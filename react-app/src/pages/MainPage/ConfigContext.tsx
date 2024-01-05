import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { AppConfig, GlobalConfig, ProfileConfig, SelectedThemeConfig, ThemeKey } from '../../types'
import { getAnimationURL } from '../../utils/animation'
import { getAppConfig } from '../../utils/data'
import { THEMES } from '../../utils/theme'
import { Fit, Layout } from '@rive-app/react-canvas-lite'

function getThemeConfig(): AppConfig {
  const appConfig = getAppConfig()
  const currentTheme = THEMES[appConfig.theme.id] || THEMES[ThemeKey.default]

  let updatedTheme
  if (appConfig.theme.id === ThemeKey.default) {
    updatedTheme = {
      id: ThemeKey.default,
      config: currentTheme,
    }
  } else {
    updatedTheme = {
      id: appConfig.theme.id,
      config: {
        animation: {
          autoplay: currentTheme.animation.autoplay || false,
          shouldDisableRiveListeners: currentTheme.animation.shouldDisableRiveListeners || false,
          src: currentTheme.animation.src ? getAnimationURL(currentTheme.animation.src) : '',
          layout: new Layout({
            fit: !appConfig.theme.config.fat ? Fit.ScaleDown : Fit.FitWidth,
          }),
        },
        custom: currentTheme.custom,
      },
    }
  }

  return {
    profile: appConfig.profile,
    global: appConfig.global,
    theme: updatedTheme,
  }
}

type ConfigContextReturnType = {
  config: {
    global: GlobalConfig
    profile: ProfileConfig
    theme: SelectedThemeConfig
  }
  setAppConfig: (config: { global: GlobalConfig; profile: ProfileConfig; theme: SelectedThemeConfig }) => void
}

const ConfigContext = createContext<ConfigContextReturnType>(null!)

export const ConfigContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState(() => getThemeConfig())

  const setAppConfig = useMemo(() => {
    return () => {
      setConfig(getThemeConfig())
    }
  }, [config, setConfig])

  const ctx = useMemo(() => {
    return {
      config,
      setAppConfig,
    }
  }, [config, setAppConfig])

  return <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
}

export function useConfigContext() {
  const configContext = useContext(ConfigContext)

  if (!configContext) {
    throw new Error('To use "useConfigContext" some of the parent components must be in <ConfigContextProvider/>')
  }

  return configContext
}
