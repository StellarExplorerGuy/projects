import { ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY } from 'utils/constants'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface DeleteProfileProps {
  open: boolean
  dialogValue: ItemType
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

function DeleteProfile({ open, dialogValue, toggleOpen, setDialogValue }: DeleteProfileProps) {
  const handleClose = () => {
    toggleOpen(false)
  }

  const handleSubmit = () => {
    const index = dialogValue.profiles.findIndex((profile: string) => profile === dialogValue.profile)
    if (index === -1) return

    dialogValue.profiles.splice(index, 1)

    window.localStorage.setItem(FASTER_PR_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE))
    window.localStorage.setItem(
      FASTER_PR_PROFILE,
      JSON.stringify({
        [DEFAULT_PROFILE]: {
          profile: dialogValue.profile,
          uppercase: dialogValue.uppercase,
          branchSeparator: dialogValue.branchSeparator,
          signature: dialogValue.signature,
          checked: dialogValue.checked,
          commit: dialogValue.commit,
          pr: dialogValue.pr,
        },
      }),
    )
    setDialogValue({
      ...dialogValue,
      profile: DEFAULT_PROFILE,
    })
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Deletion
        </Typography>
        <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
          You would delete profile with name <b>[{dialogValue.profile}]</b>. This action cannot be undone.
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="neutral" onClick={handleClose}>
              No
            </Button>
            <Button color="danger" onClick={handleSubmit}>Yes</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default DeleteProfile
