import * as React from 'react'
import Switch from '@mui/joy/Switch'
import Typography from '@mui/joy/Typography'
import { LocalThemeConfig } from '../../types'

type SwitchProps = {
  theme: LocalThemeConfig
  setTheme: React.Dispatch<React.SetStateAction<LocalThemeConfig>>
}

function SwitchOption({ theme, setTheme }: SwitchProps) {
  return (
    <Switch
      color={'primary'}
      slotProps={{ input: { 'aria-label': 'dark mode' } }}
      startDecorator={
        <Typography sx={{ color: theme.config.slim ? 'text.tertiary' : 'primary.500' }}>Small</Typography>
      }
      endDecorator={<Typography sx={{ color: theme.config.slim ? 'primary.500' : 'text.tertiary' }}>Large</Typography>}
      checked={theme.config.slim}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme({
          ...theme,
          config: {
            ...theme.config,
            slim: event.target.checked,
          },
        })
      }}
    />
  )
}

export { SwitchOption }
