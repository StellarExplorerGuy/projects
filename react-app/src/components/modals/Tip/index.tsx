import { Box, Card, CardContent } from '@mui/joy'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'
import TabsVertical from 'components/TabsVertical'
import { TIP_HEADERS, getTips } from './tips-content'

interface TipProps {
  open: boolean
  handleClose: () => void
}

function Tip({ open, handleClose }: TipProps) {
  const data = getTips()
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog sx={{ width: '70vw', height: '70vh' }} variant="outlined" role="alertdialog" size="lg">
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit">
          Git Tips
        </Typography>
        <Card variant="soft" sx={{ p: 0, mt: 0.5, mb: 2 }}>
          <CardContent>
            <TabsVertical tabs={{ headers: TIP_HEADERS, data }} />
          </CardContent>
        </Card>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
            pt: 2,
            bottom: 10,
            right: 10,
            position: 'absolute',
          }}
        >
          <Button variant="outlined" color="neutral" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default Tip
