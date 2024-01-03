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

export enum ThemeKey {
  default = 'default',
  truck = 'truck',
  cat = 'cat',
  letsGo = 'letsGo',
  tentaclesSmoke = 'tentaclesSmoke',
}

export type ThemeConfig = {
  id: ThemeKey
  config: {
    animation: UseRiveParameters
    custom: {
      bg: string
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
