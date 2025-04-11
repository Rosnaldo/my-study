import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useModalContext } from './contexts/modal.context'
import { useLocationContext } from './contexts/location.context'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function LocationModal() {
  const { locationIsOpen, locationClose } = useModalContext()
  const { location } = useLocationContext()

  return (
    <Modal
        open={locationIsOpen}
        onClose={locationClose}
      >
      <Box sx={style}>
        <Typography  variant='h2' component='h2'>
          Location
        </Typography>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            ID:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <Typography  variant='h6' component='h2'>
            {location.id.toString()}
          </Typography>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            Name:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <Typography  variant='h6' component='h2'>
            {location.name}
          </Typography>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            Type:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <Typography  variant='h6' component='h2'>
            {location.type}
          </Typography>
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            Dimension:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <Typography  variant='h6' component='h2'>
            {location.dimension}
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

        