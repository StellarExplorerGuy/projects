import ModeToggle from 'components/ModeToggle'
import { DIALOG, ItemType } from 'types'
import { DEFAULT_PROFILE, FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY, HOME_URL } from 'utils/constants'
import { decodeUrl, defaultProfile, getAppConfig, showAlertInfo, updateLocalStorage } from 'utils/data'

import { useState } from 'react'

import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Alert, Divider, Modal, ModalDialog } from '@mui/joy'
import Button from '@mui/joy/Button'
import Grid from '@mui/joy/Grid'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import Content from 'components/Content'
import styles from '../../../styles/Main.module.scss'

const save = (
  dialogValue: ItemType,
  setAlertInfo: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      msg: string
      type: string
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
      slimPrChecked: dialogValue.slimPrChecked,
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

function MainModal({ alertInfo, open, setClose, setAlertInfo }: any): JSX.Element {
  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localKey = localStorage.getItem(FASTER_PR_PROFILE_KEY)
    const profileKey = localKey === null ? DEFAULT_PROFILE : JSON.parse(localKey)

    const localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    let selectedProfile = null

    const { global } = getAppConfig()
    // handle no config case
    if (!localKey || (!localProfile && !JSON.parse(localProfile)?.profile)) {
      selectedProfile = { ...defaultProfile() }

      const commitConfig = {
        checked: selectedProfile.checked,
        signature: selectedProfile.signature,
      }
      if (global.enabled) {
        commitConfig.checked = !!global.signature
        commitConfig.signature = global.signature
      }

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
            slimPrChecked: selectedProfile.slimPrChecked,
          },
        }),
      )
      return {
        profiles: selectedProfile.profiles,
        profile: selectedProfile.profile,
        signature: commitConfig.signature,
        branchSeparator: selectedProfile.branchSeparator,
        branchPrefixes: selectedProfile.branchPrefixes,
        checked: commitConfig.checked,
        uppercase: selectedProfile.uppercase,
        commit: selectedProfile.commit,
        pr: selectedProfile.pr,
        slimPrChecked: selectedProfile.slimPrChecked,
      }
    }

    const allProfiles = JSON.parse(localProfile)
    selectedProfile = allProfiles[profileKey]

    const commitConfig = {
      checked: selectedProfile.checked,
      signature: selectedProfile.signature,
    }
    if (global.enabled) {
      commitConfig.checked = !!global.signature
      commitConfig.signature = global.signature
    }

    return {
      profiles: allProfiles.profiles ? allProfiles.profiles : [DEFAULT_PROFILE],
      profile: selectedProfile.profile,
      signature: commitConfig.signature,
      branchSeparator: selectedProfile.branchSeparator,
      branchPrefixes: selectedProfile.branchPrefixes,
      checked: commitConfig.checked,
      uppercase: selectedProfile.uppercase,
      commit: selectedProfile.commit,
      pr: selectedProfile.pr,
      slimPrChecked: selectedProfile.slimPrChecked,
    }
  })
  const [openDialogs, setOpenDialogs] = useState({
    newProfile: false,
    editProfile: false,
    deleteProfile: false,
    resetDefault: false,
    editBranch: false,
    integrations: false,
    tip: false,
  })

  const handleClose = (field: DIALOG): void => {
    setOpenDialogs({ ...openDialogs, [field]: false })
  }
  const handleOpen = (field: DIALOG): void => {
    setOpenDialogs({ ...openDialogs, [field]: true })
  }

  return (
    <Modal
      className={styles.main_component}
      disableEscapeKeyDown={alertInfo.visible}
      keepMounted
      open={open}
      onClose={() => setClose(false)}
    >
      <ModalDialog layout="fullscreen" variant="plain" role="alertdialog">
        <Grid
          sx={{ mb: 0.5 }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid xs={3}>
            <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
              Customization 🎨
            </Typography>
          </Grid>
          <Grid xs={9}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
              <IconButton
                sx={{
                  mr: 2,
                  borderRadius: 8,
                }}
                variant="outlined"
                onClick={() => window.open(decodeUrl(HOME_URL), '_blank')}
              >
                <FavoriteRoundedIcon sx={{ color: 'red' }} fontSize="small" />
              </IconButton>
              <ModeToggle />
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ height: 4, background: 'var(--joy-palette-primary-500)' }} />
        <Content
          openDialogs={openDialogs}
          dialogValue={dialogValue}
          setAlertInfo={setAlertInfo}
          handleClose={handleClose}
          setDialogValue={setDialogValue}
          handleOpen={handleOpen}
        />
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
            <Stack direction="row" justifyContent="flex-end" spacing={2} height={{ height: 42 }}>
              {alertInfo.visible && (
                <Alert variant="soft" color={alertInfo.type as any} sx={{ width: 'fit-content' }}>
                  {alertInfo.msg}
                </Alert>
              )}
              <Button variant="outlined" onClick={() => setClose(false)}>
                Close
                <Typography sx={{ pl: 1 }} color="neutral">
                  [esc]
                </Typography>
              </Button>
              <Button onClick={() => save(dialogValue, setAlertInfo)}>Save</Button>
            </Stack>
          </Stack>
        </Grid>
      </ModalDialog>
    </Modal>
  )
}

export default MainModal
