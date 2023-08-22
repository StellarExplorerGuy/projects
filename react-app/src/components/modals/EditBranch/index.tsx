import AddInput from 'components/AddInput'
import RemovableItems from 'components/RemovableItems'

import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { Box } from '@mui/joy'
import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'
import Divider from '@mui/joy/Divider'
import Grid from '@mui/joy/Grid'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'


// const arrayList = ['🚀 feat', '🔨 fix', '🐛 bug', '📝 docs', '😎 style', '✨ refactor', '📦 test', '💊 chore']
interface CustomSeparatorButtonGroupProps {
  items: UniqueIdentifier[]
  setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
}
function CustomSeparatorButtonGroup({ items, setItems }: CustomSeparatorButtonGroupProps) {
  const handleChange = (item: any) => {
    console.info(`You clicked`, item)
    setItems([item, ...items])
  }

  return (
    <Box>
      <Box sx={{ float: 'left', pt: 1, mr: 1 }}>
        <Typography component="h2">Stylish:</Typography>
      </Box>
      <ButtonGroup
        variant="solid"
        color="primary"
        aria-label="button group"
        sx={{
          '--ButtonGroup-separatorColor': 'none !important',
          '& > span': {
            zIndex: 3,
            background: 'linear-gradient(to top, transparent, rgba(255 255 255 / 0.6), transparent)',
          },
        }}
      >
        <Button onClick={() => handleChange('🚀 feat')}>🚀 feat</Button>
        <Divider />
        <Button onClick={() => handleChange('🔨 fix')}>🔨 fix</Button>
        <Divider />
        <Button onClick={() => handleChange('🐛 bug')}>🐛 bug</Button>
        <Divider />
        <Button onClick={() => handleChange('📝 docs')}>📝 docs</Button>
        <Divider />
        <Button onClick={() => handleChange('😎 style')}>😎 style</Button>
        <Divider />
        <Button onClick={() => handleChange('✨ refactor')}>✨ refactor</Button>
        <Divider />
        <Button onClick={() => handleChange('📦 test')}>📦 test</Button>
        <Divider />
        <Button onClick={() => handleChange('💊 chore')}>💊 chore</Button>
      </ButtonGroup>
    </Box>
  )
}

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
          <CustomSeparatorButtonGroup items={data} setItems={setItemsData} />
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
          <Button disabled={data.length === 0} onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default EditBranch
