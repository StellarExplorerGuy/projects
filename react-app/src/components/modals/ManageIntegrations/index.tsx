import {
  Alert,
  Box,
  ButtonGroup,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  ListDivider,
  ListItemDecorator,
  Select,
  Tooltip,
  listItemDecoratorClasses,
} from '@mui/joy'
import Button from '@mui/joy/Button'
import Grid from '@mui/joy/Grid'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import MessageBox from '../../MessageBox'

import Avatar from '@mui/joy/Avatar'
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Sheet from '@mui/joy/Sheet'

import Github from 'assets/github.svg'
import GitLab from 'assets/gitlab.svg'
import Trello from 'assets/trello.svg'
import Jira from 'assets/jira.svg'
import Monday from 'assets/monday.svg'
import Chrome from 'assets/chrome_icon.svg'
import Firefox from 'assets/firefox_icon.svg'
import Cup from 'assets/coffee.svg'

import styles from '../../../styles/Main.module.scss'
import CustomTabs from '../../CustomTabs'
import { ADVANCED, FASTER_PR_CONFIG, KO_FI_URL, TEXT } from '../../../utils/constants'
import Signature from '../../Signature'
import { decodeUrl, getAppConfig, showAlertInfo } from '../../../utils/data'
import { useState } from 'react'
import {
  GlobalConfig,
  ProfileConfig,
  BasicThemeKey,
  AnimationThemeKey,
  ThemeKey,
  LocalThemeConfig,
} from '../../../types'
import SwitchButton from '../../SwitchButton'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { SwitchOption } from '../../../components/SwitchDecorators'
import Option, { optionClasses } from '@mui/joy/Option'
import { useConfigContext } from '../../../pages/MainPage/ConfigContext'
import React from 'react'
import { Check } from '@mui/icons-material'

const HEADERS = ['Integrations 😎', 'Themes 🎨', 'Profile 👤', 'Globals 🔧']
const dataList = [
  {
    index: 0,
    checked: true,
    avatar: Github,
    label: 'Github [github.com, github.any-name.com]',
  },
  {
    index: 1,
    checked: true,
    avatar: GitLab,
    label: 'GitLab [gitlab.com]',
  },
  {
    index: 2,
    checked: true,
    avatar: Trello,
    label: 'Trello [trello.com]',
  },
  {
    index: 3,
    checked: true,
    avatar: Jira,
    label: 'Jira [jsw.any-name.com, jira.any-name.net]',
  },
  {
    index: 4,
    checked: true,
    avatar: Monday,
    label: 'Monday [monday.com, any-name.monday.com]',
  },
]

interface ItemProps {
  integration: {
    index: number
    checked: boolean
    avatar: string
    label: string
  }
}

function Item({ integration }: ItemProps) {
  return (
    <ListItem
      sx={{
        pointerEvents: 'none',
      }}
      // {...(integration.checked && {
      //   variant: 'soft',
      //   color: 'primary',
      // })}
    >
      <Avatar aria-hidden="true" src={integration.avatar} />
      <Checkbox
        overlay
        label={
          <Typography
            sx={{
              color: integration.checked ? 'primary' : 'neutral.400',
            }}
          >
            {integration.label}
          </Typography>
        }
        checked={integration.checked}
        color="success"
      />
    </ListItem>
  )
}

function IntegrationsCheckbox() {
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 'sm',
        maxWidth: '100%',
      }}
    >
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid xs={9}>
          <Typography
            id="integration"
            sx={{
              textTransform: 'uppercase',
              fontSize: 'xs',
              letterSpacing: 'lg',
              fontWeight: 'lg',
              color: 'text.secondary',
            }}
          >
            Available integrations
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Box sx={{ float: 'right', mr: 1 }}>
            <Tooltip
              arrow
              title="Please take a moment to rate and review the Chrome extension on the Web Store 🙂."
              variant="solid"
              placement="top"
              color="neutral"
              size="lg"
            >
              <Link
                target="_blank"
                href="https://chrome.google.com/webstore/detail/faster-pr/lcenjlelbnlooigocboklccingbhiajh/"
              >
                <Avatar
                  sx={{
                    transform: 'translate(0, 0)',
                    transition: 'transform 0.2s ease-in-out',
                    ':hover': { transform: 'translate(-3px, -3px) rotate(10deg) scale(1.1)' },
                  }}
                  aria-hidden="true"
                  src={Chrome}
                  size="sm"
                />
              </Link>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip
              arrow
              title="Please take a moment to rate and review the Firefox extension on the Web Store 🙂."
              variant="solid"
              placement="top"
              color="neutral"
              size="lg"
            >
              <Link target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/faster-pr/">
                <Avatar
                  sx={{
                    transform: 'translate(0, 0)',
                    transition: 'transform 0.2s ease-in-out',
                    ':hover': { transform: 'translate(-3px, -3px) rotate(10deg) scale(1.1)' },
                  }}
                  aria-hidden="true"
                  src={Firefox}
                  size="sm"
                />
              </Link>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <List
          sx={{
            '--ListItem-gap': '0.75rem',
            [`& .${checkboxClasses.root}`]: {
              mr: 'auto',
              flexGrow: 1,
              alignItems: 'center',
              flexDirection: 'row-reverse',
            },
          }}
        >
          {dataList.map((item, index) => (
            <Item key={index} integration={item} />
          ))}
        </List>
      </Box>
    </Sheet>
  )
}

const themeGroup = {
  basic: Object.values(BasicThemeKey),
  live: Object.values(AnimationThemeKey),
}

function ThemeConfigItem({
  theme,
  setTheme,
}: {
  theme: LocalThemeConfig
  setTheme: React.Dispatch<React.SetStateAction<LocalThemeConfig>>
}) {
  const { theme: themeOriginal } = getAppConfig()
  const isLiveMode = !themeGroup.basic.some((basicTheme) => basicTheme === theme.id)

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid xs={10.5}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontSize: 'xs',
              letterSpacing: 'lg',
              fontWeight: 'lg',
              color: 'text.secondary',
            }}
          >
            Current theme <Typography color="primary">[{themeOriginal.id}]</Typography>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={5}>
          <Select
            placeholder=""
            defaultValue={theme.id}
            slotProps={{
              listbox: {
                component: 'div',
                sx: {
                  maxHeight: 240,
                  overflow: 'auto',
                  '--List-padding': '0px',
                  '--ListItem-radius': '0px',
                },
              },
            }}
            onChange={(_, item) => {
              setTheme({ ...theme, id: item as ThemeKey })
            }}
          >
            {Object.entries(themeGroup).map(([name, themes], index) => (
              <React.Fragment key={name}>
                {index !== 0 && <ListDivider role="none" />}
                <List aria-labelledby={`select-group-${name}`} sx={{ '--ListItemDecorator-size': '28px' }}>
                  <ListItem id={`select-group-${name}`} sticky>
                    <Typography level="body-xs" textTransform="uppercase">
                      {name} ({themes.length})
                    </Typography>
                  </ListItem>
                  {themes.map((item) => (
                    <Option
                      key={item}
                      value={item}
                      label={
                        <React.Fragment>
                          <Chip size="sm" color={'primary'} sx={{ borderRadius: 'xs', mr: 1 }}>
                            {name}
                          </Chip>{' '}
                          {item}
                        </React.Fragment>
                      }
                      sx={{
                        [`&.${optionClasses.selected} .${listItemDecoratorClasses.root}`]: {
                          opacity: 1,
                        },
                      }}
                    >
                      <ListItemDecorator sx={{ opacity: 0 }}>
                        <Check />
                      </ListItemDecorator>
                      {item}
                    </Option>
                  ))}
                </List>
              </React.Fragment>
            ))}
          </Select>
        </Grid>
        <Divider sx={{ ml: 2, mr: 2 }} orientation="vertical" />
        <Grid xs={3}>
          {isLiveMode && theme.id !== ThemeKey.fire && (
            <>
              <FormLabel sx={{ pb: 0.8 }}>Select animation size</FormLabel>
              <SwitchOption theme={theme} setTheme={setTheme} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

function getDetails(
  global: GlobalConfig,
  profile: ProfileConfig,
  theme: LocalThemeConfig,
  setGlobal: React.Dispatch<React.SetStateAction<GlobalConfig>>,
  setProfile: React.Dispatch<React.SetStateAction<ProfileConfig>>,
  setTheme: React.Dispatch<React.SetStateAction<LocalThemeConfig>>,
) {
  return [
    <Box fontWeight="sm">
      <Box sx={{ pt: 1, pb: 1 }}>
        <MessageBox
          message={
            <div>
              Here is a list of the integrations that are currently available. If you require support for an additional
              service, you can create an{' '}
              <Link target="_blank" href="https://github.com/StellarExplorerGuy/projects/issues/new/choose">
                issue 📝
              </Link>{' '}
              on GitHub to request it. After when issue would be raised, then it would be reviewed.
            </div>
          }
        />
      </Box>
      <Grid container>
        <Grid xs={12}>
          <IntegrationsCheckbox />
        </Grid>
      </Grid>
    </Box>,
    <Box fontWeight="sm">
      <Box sx={{ pt: 1, pb: 1 }}>
        <MessageBox message={<div>{TEXT.MANAGE_INTEGRATIONS.THEMES}</div>} />
        <Sheet
          variant="outlined"
          sx={{
            p: 2,
            my: 2,
            borderRadius: 'sm',
            maxWidth: '100%',
          }}
        >
          <ThemeConfigItem theme={theme} setTheme={setTheme} />
        </Sheet>
      </Box>
    </Box>,
    <Box fontWeight="sm">
      <Box sx={{ pt: 1, pb: 1 }}>
        <MessageBox message={<div>{TEXT.MANAGE_INTEGRATIONS.PROFILE}</div>} />
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 'sm',
          maxWidth: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={5}>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Input
                value={profile.avatar}
                name="avatar"
                type="text"
                variant="outlined"
                color="primary"
                slotProps={{
                  input: {
                    minLength: 1,
                    maxLength: 2,
                  },
                }}
                onChange={(event) => setProfile({ ...profile, avatar: event.target.value })}
                endDecorator={
                  <IconButton onClick={() => setProfile({ ...profile, avatar: '' })}>
                    <ClearOutlinedIcon color="info" fontSize="small" />
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
          <Divider sx={{ ml: 2, mr: 2 }} orientation="vertical" />
          <Grid xs={3}>
            <FormLabel sx={{ pb: 0.8 }}>Select from the list</FormLabel>
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
              <Button onClick={() => setProfile({ ...profile, avatar: '🦊' })}>🦊</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🐺' })}>🐺</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🐻‍❄️' })}>🐻‍❄️</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🐝' })}>🐝</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🦁' })}>🦁</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🙀' })}>🙀</Button>
              <Divider />
              <Button onClick={() => setProfile({ ...profile, avatar: '🐔' })}>🐔</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Sheet>
    </Box>,
    <Box fontWeight="sm">
      <Box sx={{ pt: 1, pb: 1 }}>
        <MessageBox message={<div>{TEXT.MANAGE_INTEGRATIONS.GLOBALS}</div>} />
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 'sm',
          maxWidth: '100%',
        }}
      >
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid xs={9}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: 'xs',
                letterSpacing: 'lg',
                fontWeight: 'lg',
                color: 'text.secondary',
              }}
            >
              Global configuration{' '}
              <Typography color={global.enabled ? 'success' : 'danger'}>
                {global.enabled ? 'enabled' : 'disabled'}
              </Typography>
            </Typography>
          </Grid>
          <Grid xs={1.5}>
            <Box sx={{ float: 'right' }}>
              <SwitchButton checked={global.enabled} setChecked={(value) => setGlobal({ ...global, enabled: value })} />
            </Box>
          </Grid>
        </Grid>
        <Signature data={global} setValue={setGlobal} />
      </Sheet>
    </Box>,
  ]
}

interface ManageIntegrationsProps {
  open: boolean
  handleClose: () => void
}

function ManageIntegrations({ open, handleClose }: ManageIntegrationsProps) {
  const { setAppConfig } = useConfigContext()

  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    msg: '',
    type: 'success',
  })
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [global, setGlobal] = useState<GlobalConfig>(() => {
    const { global } = getAppConfig()
    return global
  })
  const [profile, setProfile] = useState<ProfileConfig>(() => {
    const { profile } = getAppConfig()
    return profile
  })
  const [theme, setTheme] = useState(() => {
    const { theme } = getAppConfig()
    return theme
  })

  const onTabClick = (tabIndex: number): void => {
    setCurrentTab(tabIndex)
  }
  const handleSave = (currentTab: ADVANCED): void => {
    switch (currentTab) {
      case ADVANCED.PROFILE: {
        if (!profile.avatar.trim().length) {
          showAlertInfo(
            {
              visible: true,
              msg: "It can't be empty!",
              type: 'warning',
            },
            setAlertInfo,
          )
          return
        }

        const appConfig = getAppConfig()
        localStorage.setItem(FASTER_PR_CONFIG, JSON.stringify({ ...appConfig, profile }))
        // cb to parent modal
        showAlertInfo(
          {
            visible: true,
            msg: 'Saved!',
            type: 'success',
          },
          setAlertInfo,
        )
        break
      }
      case ADVANCED.THEMES: {
        const appConfig = getAppConfig()
        const updatedConfig = { ...appConfig, theme }
        localStorage.setItem(FASTER_PR_CONFIG, JSON.stringify(updatedConfig))
        setAppConfig(updatedConfig)

        showAlertInfo(
          {
            visible: true,
            msg: 'Saved!',
            type: 'success',
          },
          setAlertInfo,
        )
        break
      }
      case ADVANCED.GLOBALS: {
        if (global.enabled && !global.signature.trim().length) {
          showAlertInfo(
            {
              visible: true,
              msg: "Signature can't be empty as top-level configuration if it is enabled.",
              type: 'warning',
            },
            setAlertInfo,
          )
          return
        }

        const appConfig = getAppConfig()
        localStorage.setItem(FASTER_PR_CONFIG, JSON.stringify({ ...appConfig, global }))
        // cb to parent modal
        showAlertInfo(
          {
            visible: true,
            msg: 'Saved!',
            type: 'success',
          },
          setAlertInfo,
        )
        break
      }
    }
  }
  const data = getDetails(global, profile, theme, setGlobal, setProfile, setTheme)

  return (
    <Modal keepMounted className={styles.main_component} open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md" sx={{ height: 600, width: 800 }}>
        <Typography id="manage-integrations" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          My setup
        </Typography>
        <CustomTabs
          orientation="horizontal"
          tabs={{ headers: HEADERS, data }}
          tabsListSx={{ width: 500, minWidth: 500 }}
          onClick={onTabClick}
        />
        {currentTab === ADVANCED.INTEGRATIONS ? (
          <Box sx={{ left: 18, bottom: 10, position: 'absolute' }}>
            <Tooltip
              arrow
              title={TEXT.MANAGE_INTEGRATIONS.TITLE}
              variant="solid"
              placement="top"
              color="neutral"
              size="lg"
            >
              <Link target="_blank" href={decodeUrl(KO_FI_URL)}>
                <Avatar
                  sx={{
                    transition: 'transform 0.5s ease-in-out',
                    ':hover': { transform: 'rotate(360deg)', transition: 'transform 1s ease-in-out' },
                  }}
                  aria-hidden="true"
                  src={Cup}
                  size="lg"
                />
              </Link>
            </Tooltip>
          </Box>
        ) : (
          <div></div>
        )}
        <Stack sx={{ right: 18, bottom: 10, position: 'absolute' }} spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2} height={{ height: 42 }}>
            {alertInfo.visible && (
              <Alert variant="soft" color={alertInfo.type as any} sx={{ width: 'fit-content' }}>
                {alertInfo.msg}
              </Alert>
            )}
            <Button variant="outlined" onClick={handleClose}>
              Close
              <Typography sx={{ pl: 1 }} color="neutral">
                [esc]
              </Typography>
            </Button>
            {(currentTab === ADVANCED.GLOBALS || currentTab === ADVANCED.PROFILE || currentTab === ADVANCED.THEMES) && (
              <Button onClick={() => handleSave(currentTab)}>Save</Button>
            )}
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default ManageIntegrations
