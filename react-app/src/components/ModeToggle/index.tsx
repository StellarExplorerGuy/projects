import * as React from 'react'

import DarkMode from '@mui/icons-material/DarkMode'
import Switch from '@mui/joy/Switch'
import { useColorScheme } from '@mui/joy/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <Switch
      checked={mode === 'dark'}
      slotProps={{
        input: { 'aria-label': mode },
        thumb: {
          children: <DarkMode />,
        },
      }}
      sx={{
        '--Switch-thumbSize': '28px',
      }}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    />
  )
}

export default ModeToggle
