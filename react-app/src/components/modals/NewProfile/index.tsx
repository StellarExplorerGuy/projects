import { ItemProfile } from 'types'


import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

function NewProfile({ open, toggleOpen, dialogValue, setDialogValue }: ItemProfile) {
  const handleClose = () => {
    // setDialogValue({
    //   title: '',
    // })

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
            Add new profile
          </Typography>
          <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
            Press save to create new profile with default configuration.
          </Typography>
          <Stack spacing={2}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                endDecorator={
                  <IconButton onClick={() => {}}>
                    <ClearOutlinedIcon color="info" fontSize="small" />
                  </IconButton>
                }
                autoFocus
                type="text"
                variant="outlined"
                color="primary"
                value=""
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    title: event.target.value,
                  })
                }
              />
            </FormControl>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="neutral" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default NewProfile
