import { ReactNode, createContext, useReducer, useContext, useCallback } from 'react'
import { TravelPlanType } from '../type'

type TravelPlanState = {
  selectedTravelPlan: TravelPlanType
}

type TravelPlanContextProps = {
  selectTravelPlan: (selectedTravelPlan: TravelPlanType) => void
} & TravelPlanState

type Props = {
  children: ReactNode
}

const initTravelPlanState: TravelPlanState = {
  selectedTravelPlan: {
    id: 0,
    travel_stops: [],
  },
}

const defaultParam = {
  ...initTravelPlanState,
  selectTravelPlan: () => {},
}

export const TravelPlanContext = createContext<TravelPlanContextProps>(defaultParam)

export const TravelPlanAction = {
  SELECT_TRAVEL_PLAN: 'SELECT_TRAVEL_PLAN',
} as const

export const reducer = (state: TravelPlanState, action: any) => {
  switch (action.type) {
    case TravelPlanAction.SELECT_TRAVEL_PLAN: {
      const { selectedTravelPlan } = action.payload
      return {
        ...state,
        selectedTravelPlan,
      }
    }

    default:
      throw new Error('Ação do reducer não encontrada')
  }
}

export const TravelPlanContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initTravelPlanState)
  const {
    selectedTravelPlan,
  } = state
  const selectTravelPlan = useCallback((selectedTravelPlan: TravelPlanType) => {
    dispatch({
      type: TravelPlanAction.SELECT_TRAVEL_PLAN,
      payload: { selectedTravelPlan },
    })
  }, [])

  return (
    <TravelPlanContext.Provider
      value={{
        selectTravelPlan,
        selectedTravelPlan,
      }}
    >
      {children}
    </TravelPlanContext.Provider>
  )
}

export const useTravelPlanContext = () => useContext(TravelPlanContext)
