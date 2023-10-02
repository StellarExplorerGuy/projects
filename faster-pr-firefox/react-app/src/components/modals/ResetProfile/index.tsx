import { ItemType } from 'types'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface ResetProfileProps {
  open: boolean
  dialogValue: ItemType
  handleClose: () => void
  handleSubmit: ()=> void
}

function ResetProfile({ open, dialogValue, handleSubmit, handleClose }: ResetProfileProps) {
  return (
    <Modal open={open}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Reset Profile
        </Typography>
        <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
          Would you like to reset <b>[{dialogValue.profile}]</b> profile to default configs?
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="neutral" onClick={handleClose}>
              No
            </Button>
            <Button onClick={handleSubmit}>Yes</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default ResetProfile
