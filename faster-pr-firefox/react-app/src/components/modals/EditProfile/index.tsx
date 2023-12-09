import { ItemType } from '../../../types'

import { useState } from 'react'

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
import styles from '../../../styles/Main.module.scss'

interface EditProfileProps {
  open: boolean
  dialogValue: ItemType
  handleClose: () => void
  handleSave: (input: string) => void
}

function EditProfile({ open, handleClose, dialogValue, handleSave }: EditProfileProps) {
  const [input, setInput] = useState('')

  return (
    <Modal className={styles.main_component} keepMounted open={open}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Edit a profile
        </Typography>
        <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
          Edit profile name <b>[{dialogValue.profile}]</b>
        </Typography>
        <Stack spacing={2}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              endDecorator={
                <IconButton onClick={() => setInput('')}>
                  <ClearOutlinedIcon color="info" fontSize="small" />
                </IconButton>
              }
              autoFocus
              type="text"
              variant="outlined"
              color="primary"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={!input.trim().length} onClick={() => handleSave(input)}>
              Save
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default EditProfile
