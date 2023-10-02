import Typography from '@mui/joy/Typography'

function MessageBox(props: any) {
  const { sx, message } = props
  return (
    <Typography
      variant="soft"
      color="primary"
      borderRadius="xs"
      display="inline-flex"
      fontSize="sm"
      sx={{
        '--Typography-gap': '0.5rem',
        marginInline: 0,
        borderRadius: 10,
        px: 1,
        py: 1,
        fontWeight: 400,
        lineHeight: 1.57,
        ...sx,
      }}
    >
      {message}
    </Typography>
  )
}

export default MessageBox
