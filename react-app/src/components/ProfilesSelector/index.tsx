import { ItemType } from 'types'
import { FASTER_PR_PROFILE, FASTER_PR_PROFILE_KEY } from 'utils/constants'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Chip from '@mui/joy/Chip'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'

interface ProfilesSelectorProps {
  dialogValue: ItemType
  data: string[]
  setDialogValue: any
}
function ProfilesSelector({ dialogValue, data, setDialogValue }: ProfilesSelectorProps) {
  const handleSubmit = ({ profile }: { profile: string }) => {
    window.localStorage.setItem(FASTER_PR_PROFILE_KEY, JSON.stringify(profile))

    let localProfile = localStorage.getItem(FASTER_PR_PROFILE)!
    const allProfiles = JSON.parse(localProfile)
    const profileItem = allProfiles[profile]
    setDialogValue({
      ...profileItem,
      profiles: [...dialogValue.profiles],
    })
  }
  return (
    <Select
      variant="outlined"
      color="primary"
      placeholder="Select a profile"
      value={dialogValue.profile}
      startDecorator={<AccountCircleIcon color="primary" fontSize="small"  />}
      endDecorator={
        <Chip size="sm" color="primary" variant="soft">
          {data.length} {data.length > 1 ? 'profiles' : 'profile'}
        </Chip>
      }
      sx={{ width: '100%' }}
      onChange={(e, newValue) => handleSubmit({ profile: newValue! })}
    >
      {data.map((item) => (
        <Option key={item} value={item} color="primary">
          {item}
        </Option>
      ))}
    </Select>
  )
}
export default ProfilesSelector
