import { UniqueIdentifier } from "@dnd-kit/core"

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
  TIP = 'tip'
}
