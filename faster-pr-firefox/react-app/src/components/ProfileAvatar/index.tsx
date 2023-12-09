import { Avatar } from '@mui/joy'
import { getAppConfig } from '../../utils/data'

interface ProfileAvatarProps {
  size?: { height: number; width: number; fontSize: number }
}
function ProfileAvatar({ size = { height: 28, width: 28, fontSize: 18 } }: ProfileAvatarProps) {
  const { profile } = getAppConfig()
  return (
    <Avatar
      sx={{ height: size.height, width: size.width, fontSize: size.fontSize }}
      variant="soft"
      aria-hidden="true"
      size="md"
      color="primary"
    >
      {profile.avatar}
    </Avatar>
  )
}

export default ProfileAvatar
