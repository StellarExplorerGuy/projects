import FormItem from 'components/FormItem'
import InfoIconButton from 'components/InfoIcon'

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { Box } from '@mui/joy'
import FormControl from '@mui/joy/FormControl'
import Grid from '@mui/joy/Grid'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import { GlobalConfig } from 'types'
import { TEXT } from 'utils/constants'

interface SignatureProps {
  data: GlobalConfig
  setValue: React.Dispatch<React.SetStateAction<GlobalConfig>>
}

export default function Signature({ data, setValue }: SignatureProps) {
  return (
    <Grid container spacing={2}>
      <Grid xs={5}>
        <Box sx={{ float: 'left', pt: 0.5 }}>
          <FormItem text="Signature" />
        </Box>
        <InfoIconButton text={TEXT.TOOLTIP.SIGNATURE} />
        <FormControl>
          <Input
            value={data.signature}
            name="email"
            type="email"
            variant="outlined"
            color="primary"
            placeholder={TEXT.MAIN.USERNAME_PLACEHOLDER}
            onChange={(event) => setValue({ ...data, signature: event.target.value })}
            endDecorator={
              <IconButton onClick={() => setValue({ ...data, signature: '' })}>
                <ClearOutlinedIcon color="info" fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
