export type ItemType = {
  profile: string
  profiles: string[]
  uppercase: boolean
  branchSeparator: string
  signature: string
  checked: boolean
  commit: string
  pr: string
}

export type ItemProfile = {
  open: boolean
  dialogValue: ItemType
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

