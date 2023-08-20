export type ItemType = {
  profile: string
  signature: string
}

export type ItemProfile = {
  open: boolean
  dialogValue: ItemType
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
  setValue?: React.Dispatch<React.SetStateAction<boolean>>
}

