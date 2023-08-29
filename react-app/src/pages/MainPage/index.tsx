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
import Tip from 'components/modals/Tip'
import { DIALOG, ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY, HOME_URL } from 'utils/constants'
import { defaultProfile, showAlertInfo, updateLocalStorage } from 'utils/data'

import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import AddIcon from '@mui/icons-material/Add'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
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
      branchPrefixes: dialogValue.branchPrefixes,
      signature: dialogValue.signature,
      checked: dialogValue.checked,
      commit: dialogValue.commit,
      pr: dialogValue.pr,
    },
  }

  updateLocalStorage(FASTER_PR_PROFILE, selectedProfile)
  showAlertInfo(
    {
      visible: true,
      msg: 'Saved!',
      type: 'success',
    },
    setAlertInfo,
  )
}

const close = (): void => {}

function MainPage() {
  const [openDialogs, setOpenDialogs] = useState({
    newProfile: false,
    editProfile: false,
    deleteProfile: false,
    resetDefault: false,
    editBranch: false,
    tip: false,
  })

  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
    width: 200,
  })

  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localKey = localStorage.getItem(FASTER_PR_PROFILE_KEY)
    const profileKey = localKey === null ? DEFAULT_PROFILE : JSON.parse(localKey)

    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    let selectedProfile = null
    if (!localKey || (!localProfile && !JSON.parse(localProfile)?.profile)) {
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
            branchPrefixes: selectedProfile.branchPrefixes,
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
        branchPrefixes: selectedProfile.branchPrefixes,
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
      branchPrefixes: selectedProfile.branchPrefixes,
      checked: selectedProfile.checked,
      uppercase: selectedProfile.uppercase,
      commit: selectedProfile.commit,
      pr: selectedProfile.pr,
    }
  })

  const handleNewProfileSubmit = (input: string): void => {
    const defaultData = defaultProfile()
    const allProfiles = JSON.parse(localStorage.getItem(FASTER_PR_PROFILE)!) || {}
    const updatedProfiles = [...dialogValue.profiles, input]

    updateLocalStorage(FASTER_PR_PROFILE_KEY, input)
    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      profiles: updatedProfiles,
      [input]: { ...defaultData, profile: input },
    })

    setDialogValue({ ...defaultData, profiles: updatedProfiles, profile: input })
    handleClose(DIALOG.NEW_PROFILE)
    showAlertInfo({ visible: true, msg: `The profile [${input}] is added!`, type: 'success' }, setAlertInfo)
  }

  const handleEditProfileSubmit = (input: string): void => {
    const index = dialogValue.profiles.findIndex((profile) => profile === dialogValue.profile)
    if (index === -1) return
    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)
    dialogValue.profiles[index] = input

    delete allProfiles[dialogValue.profile]

    updateLocalStorage(FASTER_PR_PROFILE_KEY, input)
    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      profiles: [...dialogValue.profiles],
      [input]: { ...dialogValue, profile: input },
    })

    setDialogValue({
      ...dialogValue,
      profiles: [...dialogValue.profiles],
      profile: input,
    })

    handleClose(DIALOG.EDIT_PROFILE)
    showAlertInfo(
      {
        visible: true,
        msg: `The current profile name is changed to [${input}]!`,
        type: 'success',
      },
      setAlertInfo,
    )
  }

  const handleSaveBranch = (branchPrefixes: UniqueIdentifier[]): void => {
    const index = dialogValue.profiles.findIndex((profile) => profile === dialogValue.profile)
    if (index === -1) return
    let localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)

    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      profiles: [...dialogValue.profiles],
      [dialogValue.profile]: {
        ...dialogValue,
        branchPrefixes,
      },
    })
    setDialogValue({
      ...dialogValue,
      branchPrefixes,
    })

    handleClose(DIALOG.EDIT_BRANCH)
    showAlertInfo(
      {
        visible: true,
        msg: `The prefixes for branches  are saved!`,
        type: 'success',
      },
      setAlertInfo,
    )
  }

  const handleDeleteProfileSubmit = (): void => {
    const index = dialogValue.profiles.findIndex((profile: string) => profile === dialogValue.profile)
    if (index === -1) return

    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)
    if (!allProfiles) return

    dialogValue.profiles.splice(index, 1)
    delete allProfiles[dialogValue.profile]

    updateLocalStorage(FASTER_PR_PROFILE_KEY, DEFAULT_PROFILE)
    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      profiles: dialogValue.profiles,
    })

    setDialogValue({
      ...allProfiles[DEFAULT_PROFILE],
      profiles: dialogValue.profiles,
      profile: DEFAULT_PROFILE,
    })
    handleClose(DIALOG.DELETE_PROFILE)
    showAlertInfo(
      {
        visible: true,
        msg: `The profile is deleted! Now you are using [${DEFAULT_PROFILE}] profile.`,
        type: 'success',
      },
      setAlertInfo,
    )
  }

  const handleResetDefault = (): void => {
    const defaultData = defaultProfile()
    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)

    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      [dialogValue.profile]: {
        ...defaultData,
        profile: dialogValue.profile,
      },
    })
    setDialogValue({
      ...defaultData,
      branchPrefixes: dialogValue.branchPrefixes,
      profiles: dialogValue.profiles,
      profile: dialogValue.profile,
    })

    handleClose(DIALOG.RESET_DEFAULT)
    showAlertInfo(
      {
        visible: true,
        msg: `The profile [${dialogValue.profile}] is reverted!`,
        type: 'success',
      },
      setAlertInfo,
    )
  }

  const isProfileEnabled = dialogValue.profile === DEFAULT_PROFILE

  const handleClose = (field: DIALOG): void => {
    setOpenDialogs({ ...openDialogs, [field]: false })
  }
  const handleOpen = (field: DIALOG): void => {
    setOpenDialogs({ ...openDialogs, [field]: true })
  }
  return (
    <>
      <CssBaseline />
      {openDialogs.newProfile && (
        <NewProfile
          open={openDialogs.newProfile}
          handleClose={() => handleClose(DIALOG.NEW_PROFILE)}
          handleSave={handleNewProfileSubmit}
        />
      )}
      {openDialogs.editProfile && (
        <EditProfile
          dialogValue={dialogValue}
          open={openDialogs.editProfile}
          handleClose={() => handleClose(DIALOG.EDIT_PROFILE)}
          handleSave={handleEditProfileSubmit}
        />
      )}
      {openDialogs.deleteProfile && (
        <DeleteProfile
          dialogValue={dialogValue}
          open={openDialogs.deleteProfile}
          handleClose={() => handleClose(DIALOG.DELETE_PROFILE)}
          handleSave={handleDeleteProfileSubmit}
        />
      )}
      {openDialogs.editBranch && (
        <EditBranch
          open={openDialogs.editBranch}
          handleClose={() => handleClose(DIALOG.EDIT_BRANCH)}
          items={dialogValue.branchPrefixes}
          handleSave={handleSaveBranch}
        />
      )}
      {openDialogs.resetDefault && (
        <ResetProfile
          open={openDialogs.resetDefault}
          dialogValue={dialogValue}
          handleSubmit={handleResetDefault}
          handleClose={() => handleClose(DIALOG.RESET_DEFAULT)}
        />
      )}
      {openDialogs.tip && <Tip open={openDialogs.tip} handleClose={() => handleClose(DIALOG.TIP)} />}
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
            <Typography level="h4" component="h1">
              <b>Customization</b>
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={2}
              sx={{ mt: 0.5 }}
            >
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
                    onClick={() => handleOpen(DIALOG.NEW_PROFILE)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    aria-label="edit"
                    variant="solid"
                    color="primary"
                    size="md"
                    disabled={isProfileEnabled}
                    onClick={() => handleOpen(DIALOG.EDIT_PROFILE)}
                  >
                    <ModeIcon />
                  </Button>
                  <Button
                    aria-label="delete"
                    variant="solid"
                    color="primary"
                    size="md"
                    disabled={isProfileEnabled}
                    onClick={() => handleOpen(DIALOG.DELETE_PROFILE)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                  <Button
                    aria-label="reset"
                    variant="solid"
                    color="primary"
                    size="md"
                    onClick={() => handleOpen(DIALOG.RESET_DEFAULT)}
                  >
                    <RestartAltIcon />
                  </Button>
                </Stack>
              </Grid>
              <Grid xs={1}>
                <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                  <IconButton
                    sx={{
                      mr: 2,
                      borderRadius: 8,
                    }}
                    variant="outlined"
                    onClick={() => window.open(HOME_URL, '_blank')}
                  >
                    <FavoriteRoundedIcon sx={{ color: 'red' }} fontSize="small" />
                  </IconButton>
                  <ModeToggle />
                </Grid>
              </Grid>
            </Grid>

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
                        <InfoIconButton text="Dynamic preview of the branch that is shown below as example." />
                        <Box sx={{ pt: 1 }}>
                          <b>
                            {dialogValue.uppercase ? 'feat'.toUpperCase() : 'feat'}
                            {dialogValue.branchSeparator ? dialogValue.branchSeparator : '/'}
                          </b>
                          1-my-amazing-branch-name
                        </Box>
                      </Grid>
                      <Grid xs={0.5}>
                        <Button
                          sx={{ mt: 3 }}
                          aria-label="new"
                          variant="solid"
                          color="primary"
                          size="md"
                          onClick={() => handleOpen(DIALOG.EDIT_BRANCH)}
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
                              <FormLabel>Prefix uppercase</FormLabel>
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

        <Grid sx={{ mt: 1 }} container direction="row" justifyContent="space-between" alignItems="flex-end">
          <IconButton
            sx={{
              borderRadius: 8,
              ':hover': {
                background: 'yellow',
              },
            }}
            variant="outlined"
            onClick={() => handleOpen(DIALOG.TIP)}
          >
            <EmojiObjectsTwoToneIcon color="primary" fontSize="small" />
          </IconButton>
          <Stack spacing={2}>
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
        </Grid>
      </Sheet>
    </>
  )
}

export default MainPage
