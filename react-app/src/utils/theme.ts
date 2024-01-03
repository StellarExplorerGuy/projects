import { common } from '@mui/material/colors'
import { extendTheme } from '@mui/joy/styles'
import { experimental_extendTheme as extendDefaultTheme } from '@mui/material/styles'
import { ThemeKey } from '../types'

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    kbd: true
  }
}

// generic
const DEFAULT_TYPOGRAPHY = {
  typography: {
    kbd: {
      color: common.white,
    },
  },
}

const DEFAULT_STYLES = {
  components: {
    // add button clickable effect
    JoyButton: {
      styleOverrides: {
        root: () => ({
          transition: 'initial',
          borderRadius: '4px',
          fontWeight: 600,
          minHeight: '36px',
          fontSize: '14px',
          paddingInline: '18px',
          '&:active': {
            transform: 'translateY(1px)',
          },
        }),
      },
    },
  },
}

// Material UI + Joy UI
// ref: https://mui.com/joy-ui/customization/theme-builder/
// 1000 - bg for animation
const THEME = {
  DEFAULT: {
    '50': '#EDF5FD',
    '100': '#E3EFFB',
    '200': '#C7DFF7',
    '300': '#97C3F0',
    '400': '#4393E4',
    '500': '#0B6BCB',
    '600': '#185EA5',
    '700': '#12467B',
    '800': '#0A2744',
    '900': '#4393E4',
  },
  TRUCK: {
    '50': '#fff1f2',
    '100': '#ffe4e6',
    '200': '#fecdd3',
    '300': '#fda4af',
    '400': '#fb7185',
    '500': '#f43f5e',
    '600': '#e11d48',
    '700': '#be123c',
    '800': '#9f1239',
    '900': '#881337',
    '1000': '#eb3a60',
  },
}

// ------------------------------------------------------------

const DEFAULT_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.DEFAULT[900],
      primary: THEME.DEFAULT,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.DEFAULT[900],
      },
    },
  },
}

const TRUCK_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.TRUCK[900],
      primary: THEME.TRUCK,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.TRUCK[900],
      },
      text: {
        primary: common.white,
        secondary: common.white,
      },
    },
  },
}

// Globally used by app [Joy UI]
const mainTheme = {
  joy: extendTheme({
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: DEFAULT_THEME_MODES.APP,
      dark: DEFAULT_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: THEME.DEFAULT[900],
          },
          text: {
            primary: THEME.DEFAULT[600],
            secondary: THEME.DEFAULT[600],
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: THEME.DEFAULT[900],
          },
          text: {
            primary: THEME.DEFAULT[200],
            secondary: THEME.DEFAULT[200],
          },
        },
      },
    },
  }),
}

const truckTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: TRUCK_THEME_MODES.APP,
      dark: TRUCK_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: TRUCK_THEME_MODES.TABS,
      dark: TRUCK_THEME_MODES.TABS,
    },
  }),
}

const THEME_PANEL_HOVER = {
  color: 'var(--joy-palette-primary-mainChannel) / 1',
  bgcolor: 'var(--joy-palette-primary-plainActiveBg)',
}

// ------------------------------------------------------------------------------
const THEMES = {
  [ThemeKey.default]: {
    animation: { src: '', autoplay: true, shouldDisableRiveListeners: false },
    custom: {
      bg: 'inherit',
      joy: mainTheme.joy,
      mui: mainTheme.mui,
    },
  },
  [ThemeKey.truck]: {
    animation: { src: 'truck.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.TRUCK[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.cat]: {
    animation: { src: 'cat.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.TRUCK[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.letsGo]: {
    animation: { src: 'letsGo.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.TRUCK[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.tentaclesSmoke]: {
    animation: { src: 'tentaclesSmoke.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.TRUCK[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
}

export { THEMES, THEME_PANEL_HOVER }
