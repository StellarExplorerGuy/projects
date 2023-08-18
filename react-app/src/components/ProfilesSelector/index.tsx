import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Chip from '@mui/joy/Chip'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import { ItemType } from 'types'

interface ProfilesSelectorProps {
  dialogValue: ItemType
  data: string[]
  setDialogValue: any
}
function ProfilesSelector({ dialogValue, data, setDialogValue }: ProfilesSelectorProps) {
  return (
    <Select
      placeholder="Select a profile"
      value={dialogValue.title}
      startDecorator={<AccountCircleIcon />}
      endDecorator={
        <Chip size="sm" color="primary" variant="soft">
         {data.length} {data.length > 1 ? 'profiles' : 'profile'}
        </Chip>
      }
      sx={{ width: 500 }}
      onChange={(e, newValue) => setDialogValue({ ...dialogValue, title: newValue })}
    >
      {data.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  )
}
export default ProfilesSelector
