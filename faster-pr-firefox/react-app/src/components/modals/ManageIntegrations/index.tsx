import { useState } from 'react'

import { Box, Link } from '@mui/joy'
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
      <Typography
        id="integration"
        sx={{
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: 'lg',
          fontWeight: 'lg',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        Available integrations
      </Typography>
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
      </ModalDialog>
    </Modal>
  )
}

export default ManageIntegrations
