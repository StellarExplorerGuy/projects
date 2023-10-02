import { ItemType } from 'types'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface DeleteProfileProps {
  open: boolean
  dialogValue: ItemType
  handleClose: () => void
  handleSave: () => void
}

function DeleteProfile({ open, dialogValue, handleClose, handleSave }: DeleteProfileProps) {
  return (
    <Modal open={open}>
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
            <Button color="danger" onClick={()=> handleSave()}>Yes</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default DeleteProfile
