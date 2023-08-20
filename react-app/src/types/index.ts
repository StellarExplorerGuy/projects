export type ItemType = {
  profile: string
  branchSeparator: string
  signature: string
  checked: boolean
}

export type ItemProfile = {
  open: boolean
  dialogValue: ItemType
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

