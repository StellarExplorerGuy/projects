import { useState } from 'react'

import { Box, Link, Tooltip } from '@mui/joy'
import Button from '@mui/joy/Button'
import Grid from '@mui/joy/Grid'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import MessageBox from 'components/MessageBox'

import * as React from 'react'
import Avatar from '@mui/joy/Avatar'
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import Sheet from '@mui/joy/Sheet'

import Github from 'assets/github.svg'
import GitLab from 'assets/gitlab.svg'
import Trello from 'assets/trello.svg'
import Jira from 'assets/jira.svg'
import Chrome from 'assets/chrome_icon.svg'
import Firefox from 'assets/firefox_icon.svg'
import Cup from 'assets/drink-glass-hot-warm.svg'

import styles from '../../../styles/Main.module.scss'

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
    label: 'Jira [jsw.any-name.com]',
  },
]

interface ItemProps {
  integration: {
    index: number
    checked: boolean
    avatar: string
    label: string
  }
  toggleIntegration: (item: number) => React.ChangeEventHandler<HTMLInputElement> | undefined
}

function Item({ integration, toggleIntegration }: ItemProps) {
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
        onChange={toggleIntegration(integration.index)}
        color="success"
      />
    </ListItem>
  )
}

interface IntegrationsCheckboxProps {
  toggleIntegration: (item: number) => React.ChangeEventHandler<HTMLInputElement> | undefined
}
function IntegrationsCheckbox({ toggleIntegration }: IntegrationsCheckboxProps) {
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
            <Item key={index} integration={item} toggleIntegration={toggleIntegration} />
          ))}
        </List>
      </Box>
    </Sheet>
  )
}

function getIntegrationConfig() {
  // const appConfig = getAppConfig()
  // const copy = [...dataList]
  // appConfig.integrations.forEach((checked: boolean, index: number) => {
  //   copy[index].checked = checked
  // })
  // return copy
  return dataList
}

interface ManageIntegrationsProps {
  open: boolean
  handleSubmit: (integrations: boolean[]) => void
  handleClose: () => void
}

function ManageIntegrations({ open, handleSubmit, handleClose }: ManageIntegrationsProps) {
  // const [alertInfo, setAlertInfo] = useState({
  //   visible: false,
  //   msg: '',
  //   type: 'warning',
  // })
  const [integrations, setIntegrations] = useState(() => getIntegrationConfig())

  const toggleIntegration = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIntegrations = [...integrations]
    newIntegrations[index].checked = event.target.checked
    setIntegrations(newIntegrations)
  }

  // const handleSave = (): void => {
  //   const checkedIntegrationsCount = integrations.filter((integration) => integration.checked === true).length
  //   if (checkedIntegrationsCount) {
  //     handleSubmit(integrations.map(({ checked }) => checked))
  //   } else {
  //     setAlertInfo({
  //       visible: true,
  //       msg: 'You cannot save it without selecting at least one option.',
  //       type: 'warning',
  //     })
  //   }
  // }

  return (
    <Modal className={styles.main_component} open={open} onClose={handleClose}>
      <ModalDialog variant="outlined" role="alertdialog" size="md">
        <Typography id="manage-integrations" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          Integrations 😎
        </Typography>
        <Box sx={{ mt: 1 }}>
          <MessageBox
            message={
              <div>
                Here is a list of the integrations that are currently available. If you require support for an
                additional service, you can create an{' '}
                <Link target="_blank" href="https://github.com/StellarExplorerGuy/projects/issues/new/choose">
                  issue
                </Link>{' '}
                on GitHub to request it. After when issue would be raised, then it would be reviewed.
              </div>
            }
          />
        </Box>
        <Grid container>
          <Grid xs={12}>
            <IntegrationsCheckbox toggleIntegration={toggleIntegration} />
          </Grid>
        </Grid>
        <Grid sx={{ mt: 1 }} container direction="row" justifyContent="space-between" alignItems="flex-end">
          <Tooltip
            arrow
            title="Your contributions make a significant impact, fueling my projects and boosting my confidence to create more!🚀"
            variant="solid"
            placement="top"
            color="neutral"
            size="lg"
          >
            <Link target="_blank" href="https://ko-fi.com/stellarexplorerguy">
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
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="flex-end" spacing={2} height={{ height: 42 }}>
              {/* {alertInfo.visible && (
              <Alert variant="soft" color={alertInfo.type as any} sx={{ width: 'fit-content' }}>
                {alertInfo.msg}
              </Alert>
            )} */}
              {/* <Button disabled={false} onClick={handleSave}>
              Save
            </Button> */}
              <Button variant="outlined" onClick={handleClose}>
                Close
                <Typography sx={{ pl: 1 }} color="neutral">
                  [esc]
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </ModalDialog>
    </Modal>
  )
}

export default ManageIntegrations
