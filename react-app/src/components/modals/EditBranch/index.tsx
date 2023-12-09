import AddInput from '../../AddInput'
import RemovableItems from '../../RemovableItems'

import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { Alert, Box } from '@mui/joy'
import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'
import Divider from '@mui/joy/Divider'
import Grid from '@mui/joy/Grid'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import MessageBox from '../../MessageBox'
import styles from '../../../styles/Main.module.scss'

interface CustomSeparatorButtonGroupProps {
  items: UniqueIdentifier[]
  setItems: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
    }>
  >
}
function CustomSeparatorButtonGroup({ items, setItems, setAlertInfo }: CustomSeparatorButtonGroupProps) {
  const handleChange = (inputItem: any) => {
    const isDuplicate = items.some((item) => item === inputItem)
    if (!isDuplicate) {
      setItems([inputItem, ...items])
    } else {
      setAlertInfo({
        visible: true,
        msg: `Item is already added [${inputItem}]`,
        type: 'warning',
      })
      setTimeout(() => {
        setAlertInfo({
          visible: false,
          msg: '',
          type: 'warning',
        })
      }, 5000)
    }
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
  handleClose: () => void
  items: UniqueIdentifier[]
  handleSave: (data: UniqueIdentifier[]) => void
}

function EditBranch({ open, handleClose, items, handleSave }: EditBranchProps) {
  const [data, setItemsData] = useState(items)
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'warning',
  })

  return (
    <Modal className={styles.main_component} open={open}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Edit branch details
        </Typography>
        <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
          <Box sx={{ mt: 1, mb: 2 }}>
            <MessageBox message="You can generate and arrange prefixes for branches, which correspond to different types of issues." />
          </Box>
          <CustomSeparatorButtonGroup items={data} setItems={setItemsData} setAlertInfo={setAlertInfo} />
        </Typography>
        <Grid container>
          <Grid xs={12}>
            <AddInput items={data} setItems={setItemsData} setAlertInfo={setAlertInfo} />
          </Grid>
          <Grid sx={{ mb: 5 }} xs={12}>
            <RemovableItems items={data} setItems={setItemsData} />
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2} height={{ height: 42 }}>
            {alertInfo.visible && (
              <Alert variant="soft" color={alertInfo.type as any} sx={{ width: 'fit-content' }}>
                {alertInfo.msg}
              </Alert>
            )}
            <Button variant="outlined" color="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={data.length === 0} onClick={() => handleSave(data)}>
              Save
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default EditBranch
