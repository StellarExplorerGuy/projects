import { AccordionContent, AccordionHeader } from 'components/AccordionList'
import ModeToggle from 'components/ModeToggle'
import PreviewMD from 'components/PreviewMD'
import ProfilesSelector from 'components/ProfilesSelector'
import SwitchButton from 'components/SwitchButton'
import { ItemProfile, ItemType } from 'types'

import { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeIcon from '@mui/icons-material/Mode'
import { Box, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import CssBaseline from '@mui/joy/CssBaseline'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Grid from '@mui/joy/Grid'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { CssVarsProvider } from '@mui/joy/styles'
import * as Accordion from '@radix-ui/react-accordion'

//https://mui.com/material-ui/material-icons

const save = () => {
  window.localStorage.setItem('faster-pr-config', 'OK')
}

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

function EditProfile({ open, toggleOpen, dialogValue, setDialogValue }: ItemProfile) {
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
            Edit a profile
          </Typography>
          <Typography id="basic-modal-dialog-description" mt={0.5} mb={2} textColor="text.tertiary">
            Edit profile name {dialogValue.title}
          </Typography>
          <Stack spacing={2}>
            <FormControl id="name">
              <FormLabel>Title</FormLabel>
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
                value={dialogValue.title}
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
const markdownVal = `# title\n\nHello World!\n\n`
const DEFAULT_PROFILE = 'default'
// const CONFIG_PROFILE_KEY = 'FASTER_PR'
const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'

function MainPage() {
  const [openNewProfile, setOpenNewProfile] = useState(false)
  const [openEditProfile, setOpeEditProfile] = useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false)
  const [commitText, setCommitText] = useState(markdownVal)
  const [prText, setPRText] = useState(markdownVal)

  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localValue = localStorage.getItem(FASTER_PR_PROFILE)
    if (localValue == null) return { title: DEFAULT_PROFILE }
    return { title: JSON.parse(localValue) }
  })

  useEffect(() => {
    localStorage.setItem(FASTER_PR_PROFILE, JSON.stringify(dialogValue.title))
  }, [dialogValue])

  const isProfileEnabled = dialogValue.title === DEFAULT_PROFILE
  return (
    <>
      {openNewProfile && (
        <NewProfile
          dialogValue={dialogValue}
          open={openNewProfile}
          toggleOpen={setOpenNewProfile}
          setDialogValue={setDialogValue}
        />
      )}
      {openEditProfile && (
        <EditProfile
          dialogValue={dialogValue}
          open={openEditProfile}
          toggleOpen={setOpeEditProfile}
          setDialogValue={setDialogValue}
        />
      )}
      {openDeleteProfile && (
        <DeleteProfile dialogValue={dialogValue} open={openDeleteProfile} toggleOpen={setOpenDeleteProfile} />
      )}
      <Sheet
        sx={{
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Customization</b>
          </Typography>
          <Grid container spacing={0} sx={{ mt: 0.5, flexGrow: 1 }}>
            <Grid xs={4}>
              <ProfilesSelector dialogValue={dialogValue} data={['default', '1']} setDialogValue={setDialogValue} />
            </Grid>
            <Grid xs={7}>
              <Stack spacing={1} direction="row">
                  <Button
                    aria-label="new"
                    variant="soft"
                    color="primary"
                    size="md"
                    disabled={isProfileEnabled}
                    onClick={() => setOpenNewProfile(true)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    aria-label="new"
                    variant="soft"
                    color="primary"
                    size="md"
                    disabled={isProfileEnabled}
                    onClick={() => setOpeEditProfile(true)}
                  >
                    <ModeIcon />
                  </Button>
                  <Button
                    aria-label="new"
                    variant="soft"
                    color="primary"
                    size="md"
                    disabled={isProfileEnabled}
                    onClick={() => setOpenDeleteProfile(true)}
                  >
                    <DeleteForeverIcon />
                  </Button>
              </Stack>
            </Grid>
            <Grid xs={1} sx={{ float: 'right' }}>
              <ModeToggle />
            </Grid>
          </Grid>
        </div>
        <Typography sx={{ mt: 0.5 }} level="body-sm">
          You can switch profile, create new or use default. Configs are stored to you browser storage.
        </Typography>

        <CssVarsProvider>
          <CssBaseline />
          <Sheet>
            <Typography level="h2" fontSize="xl2" sx={{ mb: 2 }}>
              Templates
            </Typography>
            <List
              variant="outlined"
              component={Accordion.Root}
              type="multiple"
              defaultValue={['item-1']}
              sx={{
                borderRadius: 'xs',
                '--ListDivider-gap': '0px',
                '--focus-outline-offset': '-2px',
              }}
            >
              <Accordion.Item value="item-1">
                <AccordionHeader isFirst>Branch name</AccordionHeader>
                <AccordionContent>
                  <Grid container>
                    <Grid xs={2}>
                      <FormControl>
                        <FormLabel>Demo view</FormLabel>
                        <Box sx={{ pt: 1 }}>feat/my-amazing-branch-name</Box>
                      </FormControl>
                    </Grid>
                    <Divider sx={{ mr: 4 }} orientation="vertical" />
                    <Grid xs={9}>
                      <Grid container spacing={2}>
                        <Grid xs={2}>
                          <FormControl>
                            <FormLabel>Branch prefix</FormLabel>
                            <Input name="prefix" type="text" placeholder="feat/" />
                          </FormControl>
                        </Grid>
                        <Grid xs={1}>
                          <FormControl sx={{ pt: 4 }}>
                            <SwitchButton />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionContent>
              </Accordion.Item>
              <ListDivider component="div" />
              <Accordion.Item value="item-2">
                <AccordionHeader>Commit body</AccordionHeader>
                <AccordionContent>
                  <Grid container>
                    <Grid xs={8}>
                      <FormControl>
                        <FormLabel>Demo view</FormLabel>
                        <PreviewMD text={commitText} setMarkdown={setCommitText} />
                      </FormControl>
                    </Grid>
                    <Divider sx={{ ml: 2, mr: 4 }} orientation="vertical" />
                    <Grid xs={3}>
                      <Grid container spacing={2}>
                        <Grid xs={2}>
                          <FormControl>
                            <FormLabel>Signature</FormLabel>
                            <Input name="email" type="email" placeholder="John Doe john.doe@email.com" />
                          </FormControl>
                        </Grid>
                        <Grid xs={1}>
                          <FormControl sx={{ pt: 4 }}>
                            <SwitchButton />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionContent>
              </Accordion.Item>

              <ListDivider component="div" />

              <Accordion.Item value="item-3">
                <AccordionHeader isLast>Pull request body</AccordionHeader>
                <AccordionContent isLast>
                  <Grid container>
                    <Grid xs={8}>
                      <FormControl>
                        <FormLabel>Demo view</FormLabel>
                        <PreviewMD text={prText} setMarkdown={setPRText} />
                      </FormControl>
                    </Grid>
                    <Divider sx={{ ml: 2, mr: 4 }} orientation="vertical" />
                    <Grid xs={3}>
                      <Grid container spacing={2}>
                        <Grid xs={2}>
                          <FormControl>
                            <FormLabel>Signature</FormLabel>
                            <Input name="email" type="email" placeholder="John Doe john.doe@email.com" />
                          </FormControl>
                        </Grid>
                        <Grid xs={1}>
                          <FormControl sx={{ pt: 4 }}>
                            <SwitchButton />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionContent>
              </Accordion.Item>
            </List>
          </Sheet>
        </CssVarsProvider>

        <Stack sx={{ mt: 1 }} spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={() => save()}>
              Close
            </Button>
            <Button onClick={() => save()}>Save</Button>
          </Stack>
        </Stack>
      </Sheet>
    </>
  )
}

export default MainPage
