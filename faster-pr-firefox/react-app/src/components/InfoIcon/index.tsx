import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/joy/IconButton'
import Tooltip from '@mui/joy/Tooltip'

function InfoIconButton({ text }: { text: string }) {
  return (
    <Tooltip arrow color="neutral" size="lg" variant="solid" placement="right" title={text}>
      <IconButton
        sx={{
          '--IconButton-size': '32px',
        }}
      >
        <InfoIcon color="primary" fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export default InfoIconButton
