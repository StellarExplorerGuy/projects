import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

function DeleteProfile({ open, dialogValue, toggleOpen }: any) {
  const handleClose = () => {
    toggleOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <form onSubmit={handleSubmit}>
          <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
            Deletion
          </Typography>
          <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
            You would delete profile name {dialogValue.title}. This action cannot be undone.
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="neutral" onClick={handleClose}>
                No
              </Button>
              <Button type="submit">Yes</Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default DeleteProfile
