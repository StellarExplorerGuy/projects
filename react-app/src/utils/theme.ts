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
  SKY: {
    '50': '#e1f5fe',
    '100': '#b3e5fc',
    '200': '#81d4fa',
    '300': '#4fc3f7',
    '400': '#29b6f6',
    '500': '#03a9f4',
    '600': '#039be5',
    '700': '#0288d1',
    '800': '#0277bd',
    '900': '#01579b',
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
    '900': '#312e81',
  },
  AMBER: {
    '50': '#fffbeb',
    '100': '#fef3c7',
    '200': '#fde68a',
    '300': '#fcd34d',
    '400': '#fbbf24',
    '500': '#f59e0b',
    '600': '#d97706',
    '700': '#b45309',
    '800': '#92400e',
    '900': '#78350f',
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
    '900': '#881337',
    '1000': '#eb3a60',
  },
  PURPLE: {
    "50": "#fdf4ff",
    "100": "#fae8ff",
    "200": "#f5d0fe",
    "300": "#f0abfc",
    "400": "#e879f9",
    "500": "#d946ef",
    "600": "#c026d3",
    "700": "#a21caf",
    "800": "#86198f",
    "900": "#701a75"
  },
  SUMMER: {
    '50': '#f0fdf4',
    '100': '#dcfce7',
    '200': '#bbf7d0',
    '300': '#86efac',
    '400': '#4ade80',
    '500': '#22c55e',
    '600': '#16a34a',
    '700': '#15803d',
    '800': '#166534',
    '900': '#14532d',
  },
  CYAN: {
    '50': '#e0f2f1',
    '100': '#b2dfdb',
    '200': '#80cbc4',
    '300': '#4db6ac',
    '400': '#26a69a',
    '500': '#009688',
    '600': '#00897b',
    '700': '#00796b',
    '800': '#00695c',
    '900': '#004d40',
  },
  GRAY_1: {
    '50': '#EDF5FD',
    '100': '#E3EFFB',
    '200': '#C7DFF7',
    '300': '#97C3F0',
    '400': '#2d7494',
    '500': '#1a6d93',
    '600': '#1a668b',
    '700': '#1a5d81',
    '800': '#1a5477',
    '900': '#194466',
    '1000': '#313131',
  },
}

const THEME_PANEL_HOVER = {
  color: 'var(--joy-palette-primary-mainChannel) / 1',
  bgcolor: 'var(--joy-palette-primary-plainActiveBg)',
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

const PURPLE_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.PURPLE[900],
      primary: THEME.PURPLE,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.PURPLE[900],
      },
    },
  },
}

const SKY_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.SKY[900],
      primary: THEME.SKY,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.SKY[900],
      },
    },
  },
}

const INDIGO_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.INDIGO[900],
      primary: THEME.INDIGO,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.INDIGO[900],
      },
    },
  },
}

const AMBER_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.AMBER[900],
      primary: THEME.AMBER,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.AMBER[900],
      },
    },
  },
}

const SUMMER_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.SUMMER[900],
      primary: THEME.SUMMER,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.SUMMER[900],
      },
    },
  },
}

const CYAN_THEME_MODES = {
  APP: {
    palette: {
      focusVisible: THEME.CYAN[900],
      primary: THEME.CYAN,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.CYAN[900],
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

const TENTACLES_THEME_MODES = {
  APP: {
    palette: {
      primary: THEME.GRAY_1,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.GRAY_1[900],
      },
    },
  },
}

const SQUATS_THEME_MODES = {
  APP: {
    palette: {
      primary: THEME.SUMMER,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.SUMMER[900],
      },
    },
  },
}

const JODA_THEME_MODES = {
  APP: {
    palette: {
      primary: THEME.CYAN,
    },
  },
  TABS: {
    palette: {
      primary: {
        main: THEME.CYAN[900],
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

const skyTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: SKY_THEME_MODES.APP,
      dark: SKY_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: SKY_THEME_MODES.TABS,
      dark: SKY_THEME_MODES.TABS,
    },
  }),
}

const indigoTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: INDIGO_THEME_MODES.APP,
      dark: INDIGO_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: INDIGO_THEME_MODES.TABS,
      dark: INDIGO_THEME_MODES.TABS,
    },
  }),
}

const amberTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: AMBER_THEME_MODES.APP,
      dark: AMBER_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: AMBER_THEME_MODES.TABS,
      dark: AMBER_THEME_MODES.TABS,
    },
  }),
}

const summerTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: SUMMER_THEME_MODES.APP,
      dark: SUMMER_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: SUMMER_THEME_MODES.TABS,
      dark: SUMMER_THEME_MODES.TABS,
    },
  }),
}

const purpleTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: PURPLE_THEME_MODES.APP,
      dark: PURPLE_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: PURPLE_THEME_MODES.TABS,
      dark: PURPLE_THEME_MODES.TABS,
    },
  }),
}

const cyanTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: CYAN_THEME_MODES.APP,
      dark: CYAN_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: CYAN_THEME_MODES.TABS,
      dark: CYAN_THEME_MODES.TABS,
    },
  }),
}

const tentaclesTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: TENTACLES_THEME_MODES.APP,
      dark: TENTACLES_THEME_MODES.APP,
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
            secondary: THEME.GRAY_1[600],
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
            secondary: THEME.GRAY_1[200],
          },
        },
      },
    },
  }),
}

const yodaTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: JODA_THEME_MODES.APP,
      dark: JODA_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: THEME.CYAN[200]
          },
          text: {
            primary: THEME.CYAN[200],
            secondary: THEME.CYAN[200],
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: THEME.CYAN[200]
          },
          text: {
            primary: THEME.CYAN[200],
            secondary: THEME.CYAN[200],
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

const squatsTheme = {
  joy: extendTheme({
    ...DEFAULT_TYPOGRAPHY,
    ...DEFAULT_STYLES,
    colorSchemes: {
      light: SQUATS_THEME_MODES.APP,
      dark: SQUATS_THEME_MODES.APP,
    },
  }),
  mui: extendDefaultTheme({
    colorSchemes: {
      light: SQUATS_THEME_MODES.TABS,
      dark: SQUATS_THEME_MODES.TABS,
    },
  }),
}

const DEFAULT_CONFIG = {
  ANIMATION: { src: '', autoplay: true, shouldDisableRiveListeners: false },
  CUSTOM: {
    bg: 'inherit',
    style: '',
  },
}
// ------------------------------------------------------------------------------
const THEMES = {
  [ThemeKey.default]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      ...DEFAULT_CONFIG,
      joy: mainTheme.joy,
      mui: mainTheme.mui,
    },
  },
  [ThemeKey.rose]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: roseTheme.joy,
      mui: roseTheme.mui,
    },
  },

  [ThemeKey.sky]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.softColor',
      style: '',
      joy: skyTheme.joy,
      mui: skyTheme.mui,
    },
  },
  [ThemeKey.cyan]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: cyanTheme.joy,
      mui: cyanTheme.mui,
    },
  },
  [ThemeKey.indigo]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: indigoTheme.joy,
      mui: indigoTheme.mui,
    },
  },
  [ThemeKey.amber]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: amberTheme.joy,
      mui: amberTheme.mui,
    },
  },
  [ThemeKey.summer]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: summerTheme.joy,
      mui: summerTheme.mui,
    },
  },
  [ThemeKey.purple]: {
    animation: DEFAULT_CONFIG.ANIMATION,
    custom: {
      bg: 'primary.plainColor',
      style: '',
      joy: purpleTheme.joy,
      mui: purpleTheme.mui,
    },
  },
  ///
  [ThemeKey.fire]: {
    animation: { src: 'fire.gif', autoplay: true, shouldDisableRiveListeners: true },
    custom: { bg: 'inherit', joy: mainTheme.joy, mui: mainTheme.mui },
  },
  [ThemeKey.truck]: {
    animation: {
      src: 'truck.riv',
      autoplay: true,
      shouldDisableRiveListeners: true,
    },
    custom: {
      bg: THEME.ROSE[1000],
      joy: truckTheme.joy,
      mui: truckTheme.mui,
    },
  },
  [ThemeKey.cat]: {
    animation: { src: 'cat.riv', autoplay: true, shouldDisableRiveListeners: true },
    custom: {
      bg: 'primary.plainColor',
      joy: skyTheme.joy,
      mui: skyTheme.mui,
    },
  },
  [ThemeKey.tentacles]: {
    animation: { src: 'tentaclesSmoke.riv', autoplay: true, shouldDisableRiveListeners: true },
    custom: { bg: THEME.GRAY_1[1000], joy: tentaclesTheme.joy, mui: tentaclesTheme.mui },
  },
  [ThemeKey.squats]: {
    animation: { src: 'squats.riv', autoplay: true, shouldDisableRiveListeners: true },
    custom: { bg: '#b9f08e', joy: squatsTheme.joy, mui: squatsTheme.mui },
  },
  [ThemeKey.cup]: {
    animation: { src: 'cup.riv', autoplay: true, shouldDisableRiveListeners: true },
    custom: { bg: '#85a24e', joy: squatsTheme.joy, mui: squatsTheme.mui },
  },
  [ThemeKey.joda]: {
    animation: { src: 'joda.riv', autoplay: true, shouldDisableRiveListeners: true },
    custom: { bg: '#313131', joy: yodaTheme.joy, mui: yodaTheme.mui },
  },
}

export { THEMES, THEME_PANEL_HOVER }
