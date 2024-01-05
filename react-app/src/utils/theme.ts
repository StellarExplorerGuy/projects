import { common } from '@mui/material/colors'
import { extendTheme } from '@mui/joy/styles'
import { experimental_extendTheme as extendDefaultTheme } from '@mui/material/styles'
import { ThemeKey } from '../types'
import { Fit, Layout } from '@rive-app/react-canvas-lite'

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
  SKY: {
    "50": "#e1f5fe",
    "100": "#b3e5fc",
    "200": "#81d4fa",
    "300": "#4fc3f7",
    "400": "#29b6f6",
    "500": "#03a9f4",
    "600": "#039be5",
    "700": "#0288d1",
    "800": "#0277bd",
    "900": "#039be5"
  },
  INDIGO: {
    '50': '#eef2ff',
    '100': '#e0e7ff',
    '200': '#c7d2fe',
    '300': '#a5b4fc',
    '400': '#818cf8',
    '500': '#6366f1',
    '600': '#4f46e5',
    '700': '#4338ca',
    '800': '#3730a3',
    '900': '#4f46e5',
  },
  AMBER: {
    '50': '#fbe9e7',
    '100': '#ffccbc',
    '200': '#ffab91',
    '300': '#ff8a65',
    '400': '#ff7043',
    '500': '#ff5722',
    '600': '#f4511e',
    '700': '#e64a19',
    '800': '#d84315',
    '900': '#f4511e',
  },
  ROSE: {
    '50': '#fff1f2',
    '100': '#ffe4e6',
    '200': '#fecdd3',
    '300': '#fda4af',
    '400': '#fb7185',
    '500': '#f43f5e',
    '600': '#e11d48',
    '700': '#be123c',
    '800': '#9f1239',
    '900': '#fda4af',
    '1000': '#eb3a60',
  },
  SUMMER: {
    '50': '#e0f2f1',
    '100': '#b2dfdb',
    '200': '#80cbc4',
    '300': '#4db6ac',
    '400': '#26a69a',
    '500': '#009688',
    '600': '#00897b',
    '700': '#00796b',
    '800': '#00695c',
    '900': '#00897b',
  },
  CYAN: {
    '50': '#ecfeff',
    '100': '#cffafe',
    '200': '#a5f3fc',
    '300': '#67e8f9',
    '400': '#22d3ee',
    '500': '#06b6d4',
    '600': '#0891b2',
    '700': '#0e7490',
    '800': '#155e75',
    '900': '#0891b2',
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

const ROSE_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.ROSE[900],
      primary: THEME.ROSE,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.ROSE[900],
      },
    },
  },
}

const TRUCK_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.ROSE[900],
      primary: THEME.ROSE,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.ROSE[900],
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

const roseTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: ROSE_THEME_MODES.APP,
      dark: ROSE_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: ROSE_THEME_MODES.TABS,
      dark: ROSE_THEME_MODES.TABS,
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
      style: {
        width: '500px',
        float: 'right',
      },
      joy: mainTheme.joy,
      mui: mainTheme.mui,
    },
  },
  [ThemeKey.rose]: {
    animation: { src: '', autoplay: true, shouldDisableRiveListeners: false },
    custom: {
      bg:THEME.ROSE[1000],
      style: {
        width: '500px',
        float: 'right',
      },
      joy: roseTheme.joy,
      mui: roseTheme.mui,
    },
  },
  [ThemeKey.truck]: {
    animation: {
      src: 'truck.riv',
      autoplay: true,
      shouldDisableRiveListeners: false,
      layout: new Layout({
        // fit: Fit.FitWidth,
        fit: Fit.ScaleDown,
        // alignment: Alignment.Center,
      }),
    },
    custom: { bg: THEME.ROSE[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.cat]: {
    animation: { src: 'cat.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.ROSE[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.letsGo]: {
    animation: { src: 'letsGo.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.ROSE[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
  [ThemeKey.tentacles]: {
    animation: { src: 'tentaclesSmoke.riv', autoplay: true, shouldDisableRiveListeners: false },
    custom: { bg: THEME.ROSE[1000], joy: truckTheme.joy, mui: truckTheme.mui },
  },
}

export { THEMES, THEME_PANEL_HOVER }
