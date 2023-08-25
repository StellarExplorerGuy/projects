import { ItemProfile } from 'types'
import { FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY } from 'utils/constants'

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
import { defaultProfile } from 'utils/data'

function NewProfile({ open, toggleOpen, dialogValue, setDialogValue }: ItemProfile) {
  const [input, setInput] = useState('')

  const handleClose = () => {
    toggleOpen(false)
  }

  const handleSubmit = () => {
    const defaultData = defaultProfile()
    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)
    window.localStorage.setItem(FASTER_PR_PROFILE_KEY, JSON.stringify(input))
    window.localStorage.setItem(
      FASTER_PR_PROFILE,
      JSON.stringify({
        ...allProfiles,
        profiles: [...dialogValue.profiles, input],
        [input]: {
          profile: input,
          uppercase: defaultData.uppercase,
          branchSeparator: defaultData.branchSeparator,
          signature: defaultData.signature,
          checked: defaultData.checked,
          commit: defaultData.commit,
          pr: defaultData.pr,
        },
      }),
    )

    setDialogValue({
      profile: input,
      profiles: [...dialogValue.profiles, input],
      uppercase: defaultData.uppercase,
      branchSeparator: defaultData.branchSeparator,
      signature: defaultData.signature,
      checked: defaultData.checked,
      commit: defaultData.commit,
      pr: defaultData.pr,
    })
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
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
            <Button onClick={handleSubmit}>Save</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default NewProfile
