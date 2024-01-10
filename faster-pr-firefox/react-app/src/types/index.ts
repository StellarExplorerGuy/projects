import { UniqueIdentifier } from '@dnd-kit/core'
import { UseRiveParameters } from '@rive-app/react-canvas-lite/dist/types/types'

export type ItemType = {
  slimPrChecked: boolean
  profile: string
  profiles: string[]
  uppercase: boolean
  branchPrefixes: UniqueIdentifier[]
  branchSeparator: string
  signature: string
  checked: boolean
  commit: string
  pr: string
}

export type ItemProfile = {
  open: boolean
  dialogValue: ItemType
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

export enum DIALOG {
  NEW_PROFILE = 'newProfile',
  EDIT_PROFILE = 'editProfile',
  DELETE_PROFILE = 'deleteProfile',
  RESET_DEFAULT = 'resetDefault',
  EDIT_BRANCH = 'editBranch',
  INTEGRATION = 'integrations',
  TIP = 'tip',
}

export type ProfileConfig = {
  avatar: string
}

export type GlobalConfig = {
  enabled: boolean
  signature: string
}

export const BasicThemeKey = {
  default: 'Default',
  sky: 'Sky',
  indigo: 'Indigo',
  purple: 'Purple',
  amber: 'Amber',
  rose: 'Rose',
  summer: 'Summer',
  cyan: 'Cyan',
}

export const AnimationThemeKey = {
  fire : 'Fire',
  iceFire: 'Ice fire',
  ghostFire: 'Ghost fire',
  darkFire: 'Dark fire',
  truck : 'Truck',
  cat : 'Cat',
  squats : 'Squats',
  cup : 'Cup',
  joda: 'Joda',
  tentacles : 'Tentacles',
}

export const ThemeKey = {
  ...BasicThemeKey,
  ...AnimationThemeKey,
}

export type ThemeKey = keyof typeof ThemeKey


export type LocalThemeConfig = {
  id: ThemeKey
  config: {
    fat?: boolean
  }
}

export type ThemeConfig = {
  id: ThemeKey
  config: any
}

export type SelectedThemeConfig = {
  id: ThemeKey
  config: {
    animation: UseRiveParameters
    custom: {
      bg: string
      style?: any
      joy: any
      mui: any
    }
  }
}

export type AppConfig = {
  global: GlobalConfig
  profile: ProfileConfig
  theme: ThemeConfig
}
