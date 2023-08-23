import { AccordionContent, AccordionHeader } from 'components/AccordionList'
import FormItem from 'components/FormItem'
import InfoIconButton from 'components/InfoIcon'
import MessageBox from 'components/MessageBox'
import ModeToggle from 'components/ModeToggle'
import PreviewMD from 'components/PreviewMD'
import ProfilesSelector from 'components/ProfilesSelector'
import SwitchButton from 'components/SwitchButton'
import DeleteProfile from 'components/modals/DeleteProfile'
import EditBranch from 'components/modals/EditBranch'
import EditProfile from 'components/modals/EditProfile'
import NewProfile from 'components/modals/NewProfile'
import { ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, INITIAL_ITEMS, TEMPLATE_KEY } from 'utils/constants'
import { getCommit, getPR } from 'utils/data'

import { useEffect, useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
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
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import * as Accordion from '@radix-ui/react-accordion'

const save = () => {
  window.localStorage.setItem('faster-pr-config', 'OK')
}

const defaultInitializer = (index: number) => index
function createRange<T = number>(length: number, initializer: (index: number) => any = defaultInitializer): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

function MainPage() {
  const [openNewProfile, setOpenNewProfile] = useState(false)
  const [openEditProfile, setOpeEditProfile] = useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false)
  const [openEditBranch, setOpenEditBranch] = useState(false)

  const [commitText, setCommitText] = useState('')
  const [prText, setPRText] = useState('')
  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => INITIAL_ITEMS ?? createRange<UniqueIdentifier>(16, (index) => index + 1),
  )

  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localValue = localStorage.getItem(FASTER_PR_PROFILE)
    if (localValue === null) {
      return {
        profiles: [DEFAULT_PROFILE],
        profile: DEFAULT_PROFILE,
        signature: '',
        branchSeparator: '',
        checked: true,
        uppercase: false,
      }
    }
    const data = JSON.parse(localValue)
    return {
      profiles: [DEFAULT_PROFILE],
      profile: data,
      signature: '',
      branchSeparator: '',
      checked: true,
      uppercase: false,
    }
  })

  useEffect(() => {
    localStorage.setItem(FASTER_PR_PROFILE, JSON.stringify(dialogValue.profile))

    const { TYPE, ISSUE, REPO_ORG, REPO_NAME, SIGNATURE } = TEMPLATE_KEY
    setCommitText(getCommit({ type: TYPE, issue: ISSUE, repoOrg: REPO_ORG, repoName: REPO_NAME, user: SIGNATURE }))
    setPRText(getPR({ type: TYPE, issue: ISSUE, repoOrg: REPO_ORG, repoName: REPO_NAME, user: SIGNATURE }))
  }, [dialogValue])

  const isProfileEnabled = dialogValue.profile === DEFAULT_PROFILE

  return (
    <>
      <CssBaseline />
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
        <DeleteProfile
          dialogValue={dialogValue}
          open={openDeleteProfile}
          toggleOpen={setOpenDeleteProfile}
          setDialogValue={setDialogValue}
        />
      )}
      {openEditBranch && (
        <EditBranch open={openEditBranch} toggleOpen={setOpenEditBranch} items={items} setItems={setItems} />
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
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid xs={3}>
              <ProfilesSelector dialogValue={dialogValue} data={dialogValue.profiles} setDialogValue={setDialogValue} />
            </Grid>
            <Grid xs={8}>
              <Stack spacing={1} direction="row">
                <Button
                  aria-label="new"
                  variant="solid"
                  color="primary"
                  size="md"
                  onClick={() => setOpenNewProfile(true)}
                >
                  <AddIcon />
                </Button>
                <Button
                  aria-label="new"
                  variant="solid"
                  color="primary"
                  size="md"
                  disabled={isProfileEnabled}
                  onClick={() => setOpeEditProfile(true)}
                >
                  <ModeIcon />
                </Button>
                <Button
                  aria-label="new"
                  variant="solid"
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
        <MessageBox message="You can switch profile, create new or use default. Configs are stored to your browser storage. Please, press 'save' to apply the changes." />
        <Sheet>
          <Typography level="h2" fontSize="xl2" sx={{ mb: 2 }}>
            Templates
          </Typography>
          <List
            variant="outlined"
            component={Accordion.Root}
            type="multiple"
            defaultValue={['item-0']}
            sx={{
              borderRadius: 'xs',
              '--ListDivider-gap': '0px',
              '--focus-outline-offset': '-2px',
            }}
          >
            <Accordion.Item value="item-0">
              <AccordionHeader isFirst>Common</AccordionHeader>
              <AccordionContent>
                <Grid container spacing={2}>
                  <Grid xs={3}>
                    <Box sx={{ float: 'left', pt: 0.5 }}>
                      <FormItem text="Signature" />
                    </Box>
                    <InfoIconButton text="Define signature for your commit and PR templates." />
                    <FormControl>
                      <Input
                        value={dialogValue.signature}
                        disabled={dialogValue.checked}
                        name="email"
                        type="email"
                        placeholder="John Doe john.doe@email.com"
                        onChange={(event) => setDialogValue({ ...dialogValue, signature: event.target.value })}
                        endDecorator={
                          <IconButton onClick={() => setDialogValue({ ...dialogValue, signature: '' })}>
                            <ClearOutlinedIcon color="info" fontSize="small" />
                          </IconButton>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={2}>
                    <Box sx={{ float: 'left', pt: 0.5 }}>
                      <FormLabel>Use default signature</FormLabel>
                    </Box>
                    <InfoIconButton text="If enabled, then plugin would try to find your username." />
                    <FormControl>
                      <Box sx={{ float: 'left', mt: 0.5 }}>
                        <SwitchButton
                          checked={dialogValue.checked}
                          setChecked={(value) => setDialogValue({ ...dialogValue, checked: value })}
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionContent>
            </Accordion.Item>
            <ListDivider component="div" />
            <Accordion.Item value="item-1">
              <AccordionHeader>Branch name</AccordionHeader>
              <AccordionContent>
                <Grid container>
                  <Grid xs={3}>
                    <Box sx={{ float: 'left', pt: 0.5 }}>
                      <FormItem text="Demo view" />
                    </Box>
                    <InfoIconButton text="Dynamic preview of the branch that is shown as example." />
                    <Box sx={{ pt: 1 }}>
                      <b>
                        {dialogValue.uppercase ? 'feat'.toUpperCase() : 'feat'}
                        {dialogValue.branchSeparator ? dialogValue.branchSeparator : '/'}
                      </b>
                      my-amazing-branch-name
                    </Box>
                  </Grid>
                  <Grid xs={0.5}>
                    <Button
                      sx={{ mt: 3 }}
                      aria-label="new"
                      variant="solid"
                      color="primary"
                      size="md"
                      onClick={() => setOpenEditBranch(true)}
                    >
                      <ModeIcon />
                    </Button>
                  </Grid>
                  <Divider sx={{ mr: 4 }} orientation="vertical" />
                  <Grid xs={4}>
                    <Grid container spacing={2}>
                      <Grid xs={5}>
                        <FormControl>
                          <FormLabel>Define branch separator</FormLabel>
                          <Input
                            name="separator"
                            type="text"
                            placeholder="e.g. '/', ':', '#'"
                            value={dialogValue.branchSeparator}
                            onChange={(event) =>
                              setDialogValue({ ...dialogValue, branchSeparator: event.target.value.trim() })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid xs={5}>
                        <FormControl>
                          <FormLabel>Uppercase</FormLabel>
                          <Box sx={{ float: 'left', mt: 0.5 }}>
                            <SwitchButton
                              checked={dialogValue.uppercase}
                              setChecked={(value) => setDialogValue({ ...dialogValue, uppercase: value })}
                            />
                          </Box>
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
                  <Grid xs={12}>
                    <Box sx={{ float: 'left', pt: 0.5 }}>
                      <FormItem text="Demo view" />
                    </Box>
                    <InfoIconButton text="Commit body where uppercase text is used to be update with actual value. Dynamic keys: ISSUE_TYPE, REPO_ORG, REPO_NAME, ISSUE, SIGNATURE." />
                    <PreviewMD text={commitText} setMarkdown={setCommitText} />
                  </Grid>
                </Grid>
              </AccordionContent>
            </Accordion.Item>

            <ListDivider component="div" />

            <Accordion.Item value="item-3">
              <AccordionHeader isLast>Pull request body</AccordionHeader>
              <AccordionContent isLast>
                <Grid container>
                  <Grid xs={12}>
                    <Box sx={{ float: 'left', pt: 0.5 }}>
                      <FormItem text="Demo view" />
                    </Box>
                    <InfoIconButton text="PR body where uppercase text is used to be update with actual value. Dynamic keys: ISSUE_TYPE, REPO_ORG, REPO_NAME, ISSUE, SIGNATURE." />
                    <PreviewMD text={prText} setMarkdown={setPRText} />
                  </Grid>
                </Grid>
              </AccordionContent>
            </Accordion.Item>
          </List>
        </Sheet>

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
