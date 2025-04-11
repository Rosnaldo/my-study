import { createContext } from 'react';
import { useSyncedState } from '~/hooks/useSyncedState';

type State = {
  selected: string[];
  canCompare: boolean;
};

type Handlers = {
  toggleUnit: (unitId: string) => void;
  switchLastUnit: (unitId: string) => void;
  reset: () => void;
};

type Context = {
  state: State;
  handlers: Handlers;
};

const initialContext: Context = {
  state: {
    selected: [],
    canCompare: false
  },
  handlers: {
    toggleUnit: () => {},
    switchLastUnit: () => {},
    reset: () => {}
  }
};

export const CompareContext = createContext<Context>(initialContext);

const Provider: React.FC = ({ children }) => {
  const [state, setState] = useSyncedState<State>(
    'comparing-units',
    initialContext.state
  );

  const toggleUnit = (unitId: string) => {
    if (state.selected.length === 2 && !state.selected.includes(unitId)) {
      return;
    }

    const newSelected = state.selected.includes(unitId)
      ? state.selected.filter((id) => id !== unitId)
      : [...state.selected, unitId];

    setState({
      ...state,
      selected: newSelected,
      canCompare: newSelected.length === 2
    });
  };

  const switchLastUnit = (unitModelId: string) => {
    const newSelected = [...state.selected];
    newSelected[1] = unitModelId;

    setState({
      ...state,
      selected: newSelected
    });
  };

  const reset = () => {
    setState(initialContext.state);
  };

  const handlers: Handlers = {
    toggleUnit,
    switchLastUnit,
    reset
  };

  return (
    <CompareContext.Provider value={{ state, handlers }}>
      {children}
    </CompareContext.Provider>
  );
};

export default Provider;
