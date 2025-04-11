import { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { LocationContextProvider, useLocationContext } from './contexts/location.context'
import { ModalContextProvider, useModalContext } from './contexts/modal.context'
import { TravelPlanContextProvider, useTravelPlanContext } from './contexts/travelPlan.context'
import LocationModal from './LocationModal'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'
import AppendModal from './AppendModal'
import { TravelPlanType, UpdateCreateModalEnum } from './type'
import './App.css'

type RowType = {
  id: Number,
  travel_stops: Number[],
}

function createData(
  id: Number,
  travel_stops: Number[],
): RowType {
  return { id, travel_stops }
}

function BaseApp() {
  const [rows, setRows] = useState<RowType[]>([])
  const [tag, setTag] = useState<UpdateCreateModalEnum>(UpdateCreateModalEnum.Update)
  const [updateRow, setUpdateRow] = useState<boolean>(true)
  const [optimize, setOptimize] = useState(false)
  const { locationOpen, deleteOpen, updateOpen, appendOpen } = useModalContext()
  const { locationUpdate } = useLocationContext()
  const { selectTravelPlan } = useTravelPlanContext()

  useEffect(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
    })
    instance.get(`/travel_plans?optimize=${optimize}`)
      .then((response) => {
        const { data } = response
        setRows(
          data.map((t: TravelPlanType) => 
          createData(t.id, t.travel_stops))
        )
      })
  }, [updateRow, optimize])

  const handleUpdateRows = () => {
    setUpdateRow(!updateRow)
  }

  const handleOpenLocation = async (l: Number) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/location/${l}`)
    locationUpdate(response.data)
    locationOpen()
  }

  const handleOpenAppend = async (row: TravelPlanType) => {
    selectTravelPlan(row)
    appendOpen()
  }

  const handleOpenDelete = async (row: TravelPlanType) => {
    selectTravelPlan(row)
    deleteOpen()
  }

  const handleOpenUpdate = async (row: TravelPlanType) => {
    selectTravelPlan(row)
    updateOpen()
    setTag(UpdateCreateModalEnum.Update)
  }

  const handleOpenCreate = async () => {
    updateOpen()
    setTag(UpdateCreateModalEnum.Create)
  }

  const handleToggle = () => {
    setOptimize(!optimize)
  }

  return (
    <div>
      <AppendModal handleUpdateRows={handleUpdateRows} />
      <LocationModal />
      <DeleteModal handleUpdateRows={handleUpdateRows} />
      <UpdateModal tag={tag} handleUpdateRows={handleUpdateRows} />
      <Box style={{ margin: '5vh 5vw' }}>
        <Box style={{ display: 'flex' }}>
          <Typography variant='h4'>
            Travel Plans
          </Typography>
          <Box style={{ margin: '2vw' }}></Box>
          <label className="switch">
            <input onChange={handleToggle} type="checkbox" checked={optimize} />
            <span className="slider round"></span>
          </label>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label='caption table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Id</TableCell>
                <TableCell align='left'>Travel Stops</TableCell>
                <TableCell align='left'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id.toString()}>
                  <TableCell align='left'>{row.id.toString()}</TableCell>
                  <TableCell align='left'>
                    <Box style={{ display: 'flex' }}>
                      {row.travel_stops.map((l: Number) => (
                        <Typography
                          key={l.toString()}
                          onClick={() => handleOpenLocation(l)}
                          variant='h6'
                          style={{ marginRight: '1vw', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          {l.toString()}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align='left'>
                    <Grid container>
                      <Grid item xs={2}>
                        <Button onClick={() => handleOpenAppend(row)} variant='contained'>
                          append
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() => handleOpenDelete(row)}
                          variant='contained'
                        >
                          delete
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() => handleOpenUpdate(row)}
                          variant='contained'
                        >
                          update
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={{ margin: '3vh' }}></Box>
        <Button onClick={handleOpenCreate} variant='contained'>Create Plavel Plan</Button>
      </Box>
    </div>
  )
}

export default function App() {
  return (
    <TravelPlanContextProvider>
      <ModalContextProvider>
        <LocationContextProvider>
          <BaseApp />
        </LocationContextProvider>
      </ModalContextProvider>
    </TravelPlanContextProvider>
  )
}