import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useModalContext } from './contexts/modal.context'
import { useTravelPlanContext } from './contexts/travelPlan.context'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UpdateCreateModalEnum } from './type'

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
  tag: UpdateCreateModalEnum
}

export default function UpdateModal({ handleUpdateRows, tag }: Props) {
  const { updateIsOpen, updateClose } = useModalContext()
  const { selectedTravelPlan } = useTravelPlanContext()
  const [travelStops, setTravelStops] = useState('')

  const handleTravelStops = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value
    setTravelStops(value)
  }

  const handleUpdateSubmit = () => {
    axios({
      method: 'put',
      url: `http://localhost:3000/travel_plans/${selectedTravelPlan.id}`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "*"
      }, 
      data: {
        travel_stops: travelStops.split(',').map((s) => Number(s)),
      },
    })
    .then(() => handleUpdateRows())
    updateClose()
  }

  const handleCreateSubmit = () => {
    axios({
      method: 'post',
      url: `http://localhost:3000/travel_plans`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        'Access-Control-Allow-Origin': "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "*"
      }, 
      data: {
        travel_stops: travelStops.split(',').map((s) => Number(s)),
      },
    })
    .then(() => handleUpdateRows())
    updateClose()
  }

  const handleSubmit = () => {
    if (tag === UpdateCreateModalEnum.Update) {
      handleUpdateSubmit()
    }
    if (tag === UpdateCreateModalEnum.Create) {
      handleCreateSubmit()
    }
  }

  useEffect(() => {
    setTravelStops(selectedTravelPlan.travel_stops.toString())
  }, [updateIsOpen])

  return (
    <Modal
        open={updateIsOpen}
        onClose={updateClose}
      >
      <Box sx={style}>
        <Typography  variant='h5' component='h2'>
          {tag === UpdateCreateModalEnum.Update ? 'Update' : 'Create' }
        </Typography>
        <Box style={{ display: 'flex' }}>
          {
            tag === UpdateCreateModalEnum.Update &&
            <>
              <Typography variant='h6' component='h2'>
                ID:
              </Typography>
              <Box style={{ marginRight: '1vw' }}></Box>
              <Typography  variant='h6' component='h2'>
                {selectedTravelPlan.id.toString()}
              </Typography>
            </>
          }
        </Box>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h6' component='h2'>
            Travel Stops:
          </Typography>
          <Box style={{ marginRight: '1vw' }}></Box>
          <OutlinedInput onChange={(e) => handleTravelStops(e)} value={travelStops} />
        </Box>
        <Button
          onClick={() => handleSubmit()}
          variant='contained'
        >
          submit
        </Button>
      </Box>
    </Modal>
  )
}

        