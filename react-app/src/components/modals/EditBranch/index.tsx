import AddInput from 'components/AddInput'
import RemovableItems from 'components/RemovableItems'

import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import Button from '@mui/joy/Button'
import Grid from '@mui/joy/Grid'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

interface EditBranchProps {
  open: boolean
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  items: UniqueIdentifier[]
  setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
}

function EditBranch({ open, toggleOpen, items, setItems }: EditBranchProps) {
  const handleClose = () => {
    toggleOpen(false)
  }

  const [data, setItemsData] = useState(items)

  const handleSave = () => {
    setItems(data)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Edit branch details
        </Typography>
        <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
          You can create and reorder branch prefixes - issue type.
        </Typography>
        <Grid container>
          <Grid xs={12}>
            <AddInput items={data} setItems={setItemsData} />
          </Grid>
          <Grid xs={12}>
            <RemovableItems items={data} setItems={setItemsData} />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="neutral" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default EditBranch
