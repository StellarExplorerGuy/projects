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
import ResetProfile from 'components/modals/ResetProfile'
import { ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY, INITIAL_ITEMS } from 'utils/constants'
import { defaultProfile } from 'utils/data'

import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import AddIcon from '@mui/icons-material/Add'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeIcon from '@mui/icons-material/Mode'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Alert, Box, Divider } from '@mui/joy'
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

const save = (
  dialogValue: ItemType,
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
      width: number
    }>
  >,
): void => {
  const raw = window.localStorage.getItem(FASTER_PR_PROFILE)!
  const profiles = JSON.parse(raw)

  const selectedProfile = {
    ...profiles,
    profiles: dialogValue.profiles,
    [dialogValue.profile]: {
      profile: dialogValue.profile,
      uppercase: dialogValue.uppercase,
      branchSeparator: dialogValue.branchSeparator,
      signature: dialogValue.signature,
      checked: dialogValue.checked,
      commit: dialogValue.commit,
      pr: dialogValue.pr,
    },
  }

  window.localStorage.setItem(FASTER_PR_PROFILE_KEY, JSON.stringify(dialogValue.profile))
  window.localStorage.setItem(FASTER_PR_PROFILE, JSON.stringify(selectedProfile))

  setAlertInfo({
    visible: true,
    msg: 'Saved!',
    type: 'success',
    width: 200,
  })
  setTimeout(() => {
    setAlertInfo({
      visible: false,
      msg: '',
      type: 'success',
      width: 200,
    })
  }, 3000)
}

const close = (): void => {}

const defaultInitializer = (index: number) => index
function createRange<T = number>(length: number, initializer: (index: number) => any = defaultInitializer): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

function MainPage() {
  const [openNewProfile, setOpenNewProfile] = useState(false)
  const [openEditProfile, setOpeEditProfile] = useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false)
  const [openResetDefault, setOpenResetDefault] = useState(false)
  const [openEditBranch, setOpenEditBranch] = useState(false)
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
    width: 200,
  })

  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => INITIAL_ITEMS ?? createRange<UniqueIdentifier>(16, (index) => index + 1),
  )

  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localKey = localStorage.getItem(FASTER_PR_PROFILE_KEY)
    const profileKey = localKey === null ? DEFAULT_PROFILE : JSON.parse(localKey)

    let localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    let selectedProfile = null

    if (!localProfile && !JSON.parse(localProfile)?.profile) {
      selectedProfile = { ...defaultProfile() }

      window.localStorage.setItem(FASTER_PR_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE))
      window.localStorage.setItem(
        FASTER_PR_PROFILE,
        JSON.stringify({
          profiles: [DEFAULT_PROFILE],
          [DEFAULT_PROFILE]: {
            profile: selectedProfile.profile,
            signature: selectedProfile.signature,
            branchSeparator: selectedProfile.branchSeparator,
            checked: selectedProfile.checked,
            uppercase: selectedProfile.uppercase,
            commit: selectedProfile.commit,
            pr: selectedProfile.pr,
          },
        }),
      )
      return {
        profiles: selectedProfile.profiles,
        profile: selectedProfile.profile,
        signature: selectedProfile.signature,
        branchSeparator: selectedProfile.branchSeparator,
        checked: selectedProfile.checked,
        uppercase: selectedProfile.uppercase,
        commit: selectedProfile.commit,
        pr: selectedProfile.pr,
      }
    }

    const allProfiles = JSON.parse(localProfile)
    selectedProfile = allProfiles[profileKey]
    return {
      profiles: allProfiles.profiles ? allProfiles.profiles : [DEFAULT_PROFILE],
      profile: selectedProfile.profile,
      signature: selectedProfile.signature,
      branchSeparator: selectedProfile.branchSeparator,
      checked: selectedProfile.checked,
      uppercase: selectedProfile.uppercase,
      commit: selectedProfile.commit,
      pr: selectedProfile.pr,
    }
  })

  const handleSubmit = (): void => {
    const defaultData = defaultProfile()
    let localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)
    window.localStorage.setItem(
      FASTER_PR_PROFILE,
      JSON.stringify({
        ...allProfiles,
        [dialogValue.profile]: {
          ...defaultData,
          profile: dialogValue.profile,
        },
      }),
    )
    setDialogValue({
      ...defaultData,
      profiles: dialogValue.profiles,
      profile: dialogValue.profile,
    })

    setOpenResetDefault(false)
    setAlertInfo({
      visible: true,
      msg: `The profile [${dialogValue.profile}] is reverted!`,
      type: 'success',
      width: 300,
    })
    setTimeout(() => {
      setAlertInfo({
        visible: false,
        msg: '',
        type: 'success',
        width: 200,
      })
    }, 3000)
  }

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
      {openResetDefault && (
        <ResetProfile
          open={openResetDefault}
          dialogValue={dialogValue}
          handleSubmit={handleSubmit}
          toggleOpen={setOpenResetDefault}
        />
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
        {dialogValue?.profiles && (
          <>
            <div>
              <Typography level="h4" component="h1">
                <b>Customization</b>
              </Typography>

              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid xs={3}>
                  <ProfilesSelector
                    dialogValue={dialogValue}
                    data={dialogValue.profiles}
                    setDialogValue={setDialogValue}
                  />
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
                      aria-label="edit"
                      variant="solid"
                      color="primary"
                      size="md"
                      disabled={isProfileEnabled}
                      onClick={() => setOpeEditProfile(true)}
                    >
                      <ModeIcon />
                    </Button>
                    <Button
                      aria-label="delete"
                      variant="solid"
                      color="primary"
                      size="md"
                      disabled={isProfileEnabled}
                      onClick={() => setOpenDeleteProfile(true)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                    <Button
                      aria-label="reset"
                      variant="solid"
                      color="primary"
                      size="md"
                      disabled={openResetDefault}
                      onClick={() => setOpenResetDefault(true)}
                    >
                      <RestartAltIcon />
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
                            variant="outlined"
                            color="primary"
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
                                variant="outlined"
                                color="primary"
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
                        <PreviewMD
                          field="commit"
                          value={dialogValue.commit}
                          dialogValue={dialogValue}
                          setDialogValue={setDialogValue}
                        />
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
                        <PreviewMD
                          field="pr"
                          value={dialogValue.pr}
                          dialogValue={dialogValue}
                          setDialogValue={setDialogValue}
                        />
                      </Grid>
                    </Grid>
                  </AccordionContent>
                </Accordion.Item>
              </List>
            </Sheet>
          </>
        )}

        <Stack sx={{ mt: 1 }} spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            {alertInfo.visible && (
              <Box sx={{ width: alertInfo.width }}>
                <Alert variant="soft" color={alertInfo.type as any}>
                  {alertInfo.msg}
                </Alert>
              </Box>
            )}
            <Button variant="outlined" onClick={() => close()}>
              Close
            </Button>
            <Button onClick={() => save(dialogValue, setAlertInfo)}>Save</Button>
          </Stack>
        </Stack>
      </Sheet>
    </>
  )
}

export default MainPage
