
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Grid from '@mui/joy/Grid'
import AddInput from 'components/AddInput'
import RemovableItems from 'components/RemovableItems'
import { UniqueIdentifier } from '@dnd-kit/core'


 interface EditBranchProps  {
    open: boolean
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
    items: UniqueIdentifier[]
    setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
  }

function EditBranch({ open, toggleOpen, items, setItems }: EditBranchProps) {
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
            Edit branch details
          </Typography>
          <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
            You can create and reorder branch prefixes - issue type.
          </Typography>
            <Grid container>
              <Grid xs={12}>
                <AddInput />
              </Grid>
              <Grid xs={12}>
                <RemovableItems items={items} setItems={setItems} />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" color="neutral" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Stack>
        </form>
      </ModalDialog>
    </Modal>
  )
}

export default EditBranch
