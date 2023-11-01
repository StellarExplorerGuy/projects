import { AccordionContent, AccordionHeader } from 'components/AccordionList'
import FormItem from 'components/FormItem'
import InfoIconButton from 'components/InfoIcon'
import MessageBox from 'components/MessageBox'
import PreviewMD from 'components/PreviewMD'
import ProfilesSelector from 'components/ProfilesSelector'
import SwitchButton from 'components/SwitchButton'
import DeleteProfile from 'components/modals/DeleteProfile'
import EditBranch from 'components/modals/EditBranch'
import EditProfile from 'components/modals/EditProfile'
import NewProfile from 'components/modals/NewProfile'
import ResetProfile from 'components/modals/ResetProfile'
import Tip from 'components/modals/Tip'
import { DIALOG, GlobalConfig, ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY, TEXT } from 'utils/constants'
import { clearComments, defaultProfile, getAppConfig, showAlertInfo, updateKey, updateLocalStorage } from 'utils/data'

import { UniqueIdentifier } from '@dnd-kit/core'
import AddIcon from '@mui/icons-material/Add'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeIcon from '@mui/icons-material/Mode'
import ExtensionIcon from '@mui/icons-material/Extension'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Divider, Tooltip } from '@mui/joy'
import Button from '@mui/joy/Button'
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
import ManageIntegrations from 'components/modals/ManageIntegrations'

const getCommonDetails = (global: GlobalConfig, dialogValue: ItemType) => {
  const common = { title: <Typography>Common</Typography>, sx: {}, dialogValue: { ...dialogValue } }

  if (global.enabled) {
    common.title = (
      <Typography>
        Common <Typography color="warning">[DISABLED - as your are using top-level configuration 🔧]</Typography>
      </Typography>
    )
    common.sx = { pointerEvents: 'none', opacity: 0.6 }
    common.dialogValue.checked = !!global.signature
    common.dialogValue.signature = global.signature
  }

  return { ...common }
}

interface ContentProps {
  openDialogs: {
    newProfile: boolean
    editProfile: boolean
    deleteProfile: boolean
    resetDefault: boolean
    editBranch: boolean
    integrations: boolean
    tip: boolean
  }
  dialogValue: ItemType
  handleOpen: (dialog: DIALOG) => void
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
    }>
  >
  handleClose: (field: DIALOG) => void
  setDialogValue: React.Dispatch<React.SetStateAction<ItemType>>
}

function Content({
  openDialogs,
  dialogValue,
  setAlertInfo,
  handleClose,
  setDialogValue,
  handleOpen,
}: ContentProps): JSX.Element {
  const { global } = getAppConfig()
  const handleNewProfileSubmit = (input: string): void => {
    const defaultData = defaultProfile()
    const allProfiles = JSON.parse(localStorage.getItem(FASTER_PR_PROFILE)!) || {}
    const updatedProfiles = [...dialogValue.profiles, input]

    updateKey(FASTER_PR_PROFILE_KEY, input)
    updateLocalStorage(FASTER_PR_PROFILE, {
      ...allProfiles,
      profiles: updatedProfiles,
      [input]: { ...defaultData, profile: input },
    })

    setDialogValue({
      ...defaultData,
      profiles: updatedProfiles,
      profile: input,
    })
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

    updateKey(FASTER_PR_PROFILE_KEY, input)
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
        msg: 'The prefixes for branches  are saved!',
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

    updateKey(FASTER_PR_PROFILE_KEY, DEFAULT_PROFILE)
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
  const common = getCommonDetails(global, dialogValue)

  return (
    <Box
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        mx: 'calc(-1 * var(--ModalDialog-padding))',
        px: 'var(--ModalDialog-padding)',
      }}
    >
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
      {openDialogs.integrations && (
        <ManageIntegrations open={openDialogs.integrations} handleClose={() => handleClose(DIALOG.INTEGRATION)} />
      )}
      {openDialogs.tip && <Tip open={openDialogs.tip} handleClose={() => handleClose(DIALOG.TIP)} />}
      {dialogValue?.profiles && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            spacing={2}
            sx={{ mt: 0.5 }}
          >
            <Grid xs={3}>
              <ProfilesSelector dialogValue={dialogValue} data={dialogValue.profiles} setDialogValue={setDialogValue} />
            </Grid>
            <Grid xs={8}>
              <Stack spacing={1} direction="row">
                <Tooltip arrow title="Add new profile" variant="solid" placement="top" color="neutral" size="lg">
                  <Button
                    aria-label="new"
                    variant="solid"
                    color="primary"
                    size="md"
                    onClick={() => handleOpen(DIALOG.NEW_PROFILE)}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
                <Tooltip arrow title="Edit a profile" variant="solid" placement="top" color="neutral" size="lg">
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
                </Tooltip>
                <Tooltip
                  arrow
                  title="The deletion of profile"
                  variant="solid"
                  placement="top"
                  color="neutral"
                  size="lg"
                >
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
                </Tooltip>
                <Tooltip
                  arrow
                  title="Restore a profile to its default settings"
                  variant="solid"
                  placement="top"
                  color="neutral"
                  size="lg"
                >
                  <Button
                    aria-label="reset"
                    variant="solid"
                    color="primary"
                    size="md"
                    onClick={() => handleOpen(DIALOG.RESET_DEFAULT)}
                  >
                    <RestartAltIcon />
                  </Button>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid xs={1}>
              <Tooltip arrow title="My setup" variant="solid" placement="top" color="neutral" size="lg">
                <Button
                  sx={{ float: 'right' }}
                  aria-label="new"
                  variant="solid"
                  color="primary"
                  size="md"
                  onClick={() => handleOpen(DIALOG.INTEGRATION)}
                >
                  <ExtensionIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, mb: 1 }}>
            <MessageBox message={TEXT.MAIN.INFO} />
          </Box>
          <Sheet>
            <Typography level="h2" fontSize="xl2" sx={{ pb: 2 }}>
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
                <AccordionHeader isFirst>{common.title}</AccordionHeader>
                <AccordionContent>
                  <Grid sx={common.sx} container spacing={2}>
                    <Grid xs={3}>
                      <Box sx={{ float: 'left', pt: 0.5 }}>
                        <FormItem text="Signature" />
                      </Box>
                      <InfoIconButton text={TEXT.TOOLTIP.SIGNATURE} />
                      <FormControl>
                        <Input
                          value={common.dialogValue.signature}
                          disabled={common.dialogValue.checked}
                          name="email"
                          type="email"
                          variant="outlined"
                          color="primary"
                          placeholder={TEXT.MAIN.USERNAME_PLACEHOLDER}
                          onChange={(event) => setDialogValue({ ...dialogValue, signature: event.target.value })}
                          endDecorator={
                            <IconButton onClick={() => setDialogValue({ ...dialogValue, signature: '' })}>
                              <ClearOutlinedIcon color="info" fontSize="small" />
                            </IconButton>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3}>
                      <Box sx={{ float: 'left', mt: 0.5 }}>
                        <FormLabel>Use default signature</FormLabel>
                      </Box>
                      <InfoIconButton text="If enabled, then plugin would try to set your username using the issue details." />
                      <FormControl>
                        <Box sx={{ float: 'left', mt: 0.5 }}>
                          <SwitchButton
                            checked={common.dialogValue.checked}
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
                    <Grid xs={0.8}>
                      <FormLabel>Edit prefixes</FormLabel>
                      <Button
                        sx={{ mt: 1 }}
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
                    <Grid xs={1}>
                      <Box sx={{ float: 'left', pt: 0.5, mb: 1 }}>
                        <FormItem text="Demo view" />
                      </Box>
                      <InfoIconButton text="PR body where uppercase text is used to be update with actual value. Dynamic keys: ISSUE_TYPE, REPO_ORG, REPO_NAME, ISSUE, SIGNATURE." />
                    </Grid>
                    <Grid xs={11}>
                      <Box sx={{ float: 'left', pt: 0.5, mb: 1 }}>
                        <FormLabel>Comments visibility</FormLabel>
                      </Box>
                      <InfoIconButton text="If you activate this feature, comments will be hidden in the PR description please toggle to see the changes. Here you can see the preview only." />
                      <FormControl>
                        <Box sx={{ float: 'left', mt: 0.5, mb: 1 }}>
                          <SwitchButton
                            checked={dialogValue.slimPrChecked}
                            setChecked={(value) => setDialogValue({ ...dialogValue, slimPrChecked: value })}
                          />
                        </Box>
                      </FormControl>
                    </Grid>
                    <Grid xs={12}>
                      <PreviewMD
                        field="pr"
                        value={dialogValue.slimPrChecked ? clearComments(dialogValue.pr) : dialogValue.pr}
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
    </Box>
  )
}

export default Content
