import { AccordionContent, AccordionHeader } from 'components/AccordionList'
import MessageBox from 'components/MessageBox'
import ModeToggle from 'components/ModeToggle'
import PreviewMD from 'components/PreviewMD'
import ProfilesSelector from 'components/ProfilesSelector'
import RemovableItems from 'components/RemovableItems'
import SwitchButton from 'components/SwitchButton'
import DeleteProfile from 'components/modals/DeleteProfile'
import EditProfile from 'components/modals/EditProfile'
import NewProfile from 'components/modals/NewProfile'
import { ItemType } from 'types'
import { getCommit, getPR } from 'utils/data'

import { useEffect, useState } from 'react'

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
import { UniqueIdentifier } from '@dnd-kit/core'

const save = () => {
  window.localStorage.setItem('faster-pr-config', 'OK')
}

const defaultInitializer = (index: number) => index
function createRange<T = number>(length: number, initializer: (index: number) => any = defaultInitializer): T[] {
  return [...new Array(length)].map((_, index) => initializer(index))
}


const initialItems = ['1', '2', '3']
const markdownVal = `# title\n\nHello World!\n\n`
const DEFAULT_PROFILE = 'default'
// const CONFIG_PROFILE_KEY = 'FASTER_PR'
const FASTER_PR_PROFILE = 'FASTER_PR_PROFILE'

const TEMPLATE_KEY = {
  TYPE: 'ISSUE_TYPE',
  ISSUE: 'ISSUE',
  REPO_ORG: 'REPO_ORG',
  REPO_NAME: 'REPO_NAME',
  USER_NAME: 'USER_NAME',
}

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

    setCommitText(
      getCommit({
        type: TEMPLATE_KEY.TYPE,
        issue: TEMPLATE_KEY.ISSUE,
        repoOrg: TEMPLATE_KEY.REPO_ORG,
        repoName: TEMPLATE_KEY.REPO_NAME,
        user: TEMPLATE_KEY.USER_NAME,
      }),
    )
    setPRText(
      getPR({
        type: TEMPLATE_KEY.TYPE,
        issue: TEMPLATE_KEY.ISSUE,
        repoOrg: TEMPLATE_KEY.REPO_ORG,
        repoName: TEMPLATE_KEY.REPO_NAME,
        user: TEMPLATE_KEY.USER_NAME,
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
                  <Grid container>
                    <Grid xs={12}>
                      <RemovableItems items={items} setItems={setItems} />
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
