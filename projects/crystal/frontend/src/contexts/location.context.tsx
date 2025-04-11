import { ReactNode, createContext, useReducer, useContext, useCallback } from "react"
import { TravelStopType } from "../type"

type LocationProps = TravelStopType

type LocationState = {
  location: LocationProps
}

type LocationContextProps = {
  locationUpdate: (location: LocationProps) => void,
} & LocationState

type Props = {
  children: ReactNode
}

const initLocationState: LocationState = {
  location: {
    id: 0,
    name: '',
    type: '',
    dimension: '',
    residents: [],
  }
}

const defaultParam = {
  ...initLocationState,
  locationUpdate: () => {},
}

export const LocationContext = createContext<LocationContextProps>(defaultParam)

export const LocationAction = {
  LOCATION_UPDATE: "LOCATION_UPDATE",
} as const

export const reducer = (state: LocationState, action: any) => {
  switch (action.type) {
    case LocationAction.LOCATION_UPDATE: {
      const { location } = action.payload
      return {
        ...state,
        location,
      }
    }
    default:
      throw new Error("Ação do reducer não encontrada")
  }
}

export const LocationContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initLocationState)
  const {
    location,
  } = state

  const locationUpdate = useCallback((location: LocationProps) => {
    dispatch({
      type: LocationAction.LOCATION_UPDATE,
      payload: { location },
    })
  }, [])

  return (
    <LocationContext.Provider
      value={{
        location,
        locationUpdate,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
