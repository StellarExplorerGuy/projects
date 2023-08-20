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
import { getCommit, getPR } from 'utils/data'

import { useEffect, useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeIcon from '@mui/icons-material/Mode'
import { Box, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import CssBaseline from '@mui/joy/CssBaseline'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Grid from '@mui/joy/Grid'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { CssVarsProvider } from '@mui/joy/styles'
import * as Accordion from '@radix-ui/react-accordion'

const save = () => {
  window.localStorage.setItem('faster-pr-config', 'OK')
}

const defaultInitializer = (index: number) => index
function createRange<T = number>(length: number, initializer: (index: number) => any = defaultInitializer): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}

const initialItems = ['1', '2', '3']
const DEFAULT_PROFILE = 'default'
// const CONFIG_PROFILE_KEY = 'FASTER_PR'
const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'

const TEMPLATE_KEY = {
  TYPE: 'ISSUE_TYPE',
  ISSUE: 'ISSUE',
  REPO_ORG: 'REPO_ORG',
  REPO_NAME: 'REPO_NAME',
  SIGNATURE: 'SIGNATURE',
}

function MainPage() {
  const [openNewProfile, setOpenNewProfile] = useState(false)
  const [openEditProfile, setOpeEditProfile] = useState(false)
  const [openDeleteProfile, setOpenDeleteProfile] = useState(false)
  const [openEditBranch, setOpenEditBranch] = useState(false)

  const [commitText, setCommitText] = useState('')
  const [prText, setPRText] = useState('')

  const [dialogValue, setDialogValue] = useState<ItemType>(() => {
    const localValue = localStorage.getItem(FASTER_PR_PROFILE)
    if (localValue == null) return { title: DEFAULT_PROFILE }
    return { title: JSON.parse(localValue) }
  })

  useEffect(() => {
    localStorage.setItem(FASTER_PR_PROFILE, JSON.stringify(dialogValue.title))

    setCommitText(
      getCommit({
        type: TEMPLATE_KEY.TYPE,
        issue: TEMPLATE_KEY.ISSUE,
        repoOrg: TEMPLATE_KEY.REPO_ORG,
        repoName: TEMPLATE_KEY.REPO_NAME,
        user: TEMPLATE_KEY.SIGNATURE,
      }),
    )
    setPRText(
      getPR({
        type: TEMPLATE_KEY.TYPE,
        issue: TEMPLATE_KEY.ISSUE,
        repoOrg: TEMPLATE_KEY.REPO_ORG,
        repoName: TEMPLATE_KEY.REPO_NAME,
        user: TEMPLATE_KEY.SIGNATURE,
      }),
    )
  }, [dialogValue])

  const isProfileEnabled = dialogValue.title === DEFAULT_PROFILE

  const [items, setItems] = useState<UniqueIdentifier[]>(
    () => initialItems ?? createRange<UniqueIdentifier>(16, (index) => index + 1),
  )
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
              <ProfilesSelector dialogValue={dialogValue} data={['default', '1']} setDialogValue={setDialogValue} />
            </Grid>
            <Grid xs={8}>
              <Stack spacing={1} direction="row">
                <Button
                  aria-label="new"
                  variant="solid"
                  color="primary"
                  size="md"
                  disabled={isProfileEnabled}
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
        <MessageBox message="You can switch profile, create new or use default. Configs are stored to you browser storage." />
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
              <Accordion.Item value="item-0">
                <AccordionHeader isFirst>Common</AccordionHeader>
                <AccordionContent>
                  <Grid container spacing={2}>
                    <Grid xs={3}>
                      <FormControl>
                        <FormLabel>Signature</FormLabel>
                        <Input name="email" type="email" placeholder="John Doe john.doe@email.com" />
                      </FormControl>
                    </Grid>
                    <Grid xs={2}>
                      <FormControl>
                        <FormLabel>Use default signature</FormLabel>
                        <Box sx={{ float: 'left', mt: 0.5 }}>
                          <SwitchButton />
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                </AccordionContent>
              </Accordion.Item>
              <Accordion.Item value="item-1">
                <AccordionHeader>Branch name</AccordionHeader>
                <AccordionContent>
                  <Grid container>
                    <Grid xs={3}>
                      <Box sx={{ float: 'left', pt: 0.5 }}>
                        <FormItem text="Demo view" />
                      </Box>
                      <InfoIconButton text="Dynamic preview of the branch that is shown as example." />
                      <Box sx={{ pt: 1 }}>feat/my-amazing-branch-name</Box>
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
                            <Input name="separator" type="text" placeholder="e.g. '/', ':'" />
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
