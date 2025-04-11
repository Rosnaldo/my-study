import { ReactNode, createContext, useReducer, useContext, useCallback } from "react"

type ModalState = {
  locationIsOpen: boolean
  deleteIsOpen: boolean
  updateIsOpen: boolean
  appendIsOpen: boolean
}

type ModalContextProps = {
  locationOpen: () => void,
  locationClose: () => void,
  deleteOpen: () => void,
  deleteClose: () => void,
  updateOpen: () => void,
  updateClose: () => void,
  appendOpen: () => void,
  appendClose: () => void,
} & ModalState

type Props = {
  children: ReactNode
}

const initModalState: ModalState = {
  locationIsOpen: false,
  deleteIsOpen: false,
  updateIsOpen: false,
  appendIsOpen: false,
}

const defaultParam = {
  ...initModalState,
  locationOpen: () => {},
  locationClose: () => {},
  deleteOpen: () => {},
  deleteClose: () => {},
  updateOpen: () => {},
  updateClose: () => {},
  appendOpen: () => {},
  appendClose: () => {},
}

export const ModalContext = createContext<ModalContextProps>(defaultParam)

export const ModalAction = {
  LOCATION_OPEN: "LOCATION_OPEN",
  LOCATION_CLOSE: "LOCATION_CLOSE",
  DELETE_OPEN: "DELETE_OPEN",
  DELETE_CLOSE: "DELETE_CLOSE",
  UPDATE_OPEN: "UPDATE_OPEN",
  UPDATE_CLOSE: "UPDATE_CLOSE",
  APPEND_OPEN: "APPEND_OPEN",
  APPEND_CLOSE: "APPEND_CLOSE",
} as const

export const reducer = (state: ModalState, action: any) => {
  switch (action.type) {
    case ModalAction.LOCATION_OPEN: {
      const { locationIsOpen } = action.payload
      return {
        ...state,
        locationIsOpen,
      }
    }
    case ModalAction.LOCATION_CLOSE: {
      const { locationIsOpen } = action.payload
      return {
        ...state,
        locationIsOpen,
      }
    }
    case ModalAction.DELETE_OPEN: {
      const { deleteIsOpen } = action.payload
      return {
        ...state,
        deleteIsOpen,
      }
    }
    case ModalAction.DELETE_CLOSE: {
      const { deleteIsOpen } = action.payload
      return {
        ...state,
        deleteIsOpen,
      }
    }
    case ModalAction.UPDATE_OPEN: {
      const { updateIsOpen } = action.payload
      return {
        ...state,
        updateIsOpen,
      }
    }
    case ModalAction.UPDATE_CLOSE: {
      const { updateIsOpen } = action.payload
      return {
        ...state,
        updateIsOpen,
      }
    }
    case ModalAction.APPEND_OPEN: {
      const { appendIsOpen } = action.payload
      return {
        ...state,
        appendIsOpen,
      }
    }
    case ModalAction.APPEND_CLOSE: {
      const { appendIsOpen } = action.payload
      return {
        ...state,
        appendIsOpen,
      }
    }
    default:
      throw new Error("Ação do reducer não encontrada")
  }
}

export const ModalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initModalState)
  const {
    locationIsOpen,
    deleteIsOpen,
    updateIsOpen,
    appendIsOpen,
  } = state

  const locationOpen = useCallback(() => {
    dispatch({
      type: ModalAction.LOCATION_OPEN,
      payload: { locationIsOpen: true },
    })
  }, [])

  const locationClose = useCallback(() => {
    dispatch({
      type: ModalAction.LOCATION_CLOSE,
      payload: { locationIsOpen: false },
    })
  }, [])

  const deleteOpen = useCallback(() => {
    dispatch({
      type: ModalAction.DELETE_OPEN,
      payload: { deleteIsOpen: true },
    })
  }, [])

  const deleteClose = useCallback(() => {
    dispatch({
      type: ModalAction.DELETE_CLOSE,
      payload: { deleteIsOpen: false },
    })
  }, [])

  const updateOpen = useCallback(() => {
    dispatch({
      type: ModalAction.UPDATE_OPEN,
      payload: { updateIsOpen: true },
    })
  }, [])

  const updateClose = useCallback(() => {
    dispatch({
      type: ModalAction.UPDATE_CLOSE,
      payload: { updateIsOpen: false },
    })
  }, [])

  const appendOpen = useCallback(() => {
    dispatch({
      type: ModalAction.APPEND_OPEN,
      payload: { appendIsOpen: true },
    })
  }, [])

  const appendClose = useCallback(() => {
    dispatch({
      type: ModalAction.APPEND_CLOSE,
      payload: { appendIsOpen: false },
    })
  }, [])

  return (
    <ModalContext.Provider
      value={{
        locationIsOpen,
        locationOpen,
        locationClose,
        deleteOpen,
        deleteClose,
        deleteIsOpen,
        updateOpen,
        updateClose,
        updateIsOpen,
        appendOpen,
        appendClose,
        appendIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
