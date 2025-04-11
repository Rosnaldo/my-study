import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useModalContext } from './contexts/modal.context'
import { useTravelPlanContext } from './contexts/travelPlan.context'
import axios from 'axios'

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

type Props = {
  handleUpdateRows: () => void
}

export default function DeleteModal({ handleUpdateRows }: Props) {
  const { deleteIsOpen, deleteClose } = useModalContext()
  const { selectedTravelPlan } = useTravelPlanContext()

  const handleSubmit = () => {
    axios({
      method: 'delete',
      url: `http://localhost:3000/travel_plans/${selectedTravelPlan.id}`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "*"
      }, 
    })
    .then(() => handleUpdateRows())
    deleteClose()
  }

  return (
    <Modal
        open={deleteIsOpen}
        onClose={deleteClose}
      >
      <Box sx={style}>
        <Typography  variant='h5' component='h2'>
          Are you sure you whant to delete tavel plan?
        </Typography>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            ID:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <Typography  variant='h6' component='h2'>
            {selectedTravelPlan.id.toString()}
          </Typography>
        </Box>
        <Button
          onClick={
            () => handleSubmit()
          }
          variant='contained'
        >
          yes
        </Button>
      </Box>
    </Modal>
  )
}

        