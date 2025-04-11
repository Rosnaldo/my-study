import { createContext, useContext, useState } from 'react';
import { Client } from '~/api';
import { ClientSessionContext } from './client-session';

type State = {
  open: boolean;
  isEditing: boolean;
  client: Client | null;
};

type ClientModalContextValue = {
  open: boolean;
  isEditing: boolean;
  client: Client | null;

  handleToggleModal: (isEditing?: boolean, client?: Client | null) => void;
  handleOpenModal: (isEditing?: boolean, client?: Client | null) => void;
  handleCloseModal: () => void;
};

// TODO: repeated code, move to shared
export const ClientModalContext = createContext<ClientModalContextValue>({
  open: false,
  isEditing: false,
  client: null,

  handleToggleModal: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {}
});

export const ClientModalProvider: React.FC = ({ children }) => {
  const { client: clientOnSession } = useContext(ClientSessionContext);
  const [state, setState] = useState<State>({
    open: false,
    isEditing: false,
    client: clientOnSession
  });

  const handleToggleModal = (isEditing = false, client = clientOnSession) => {
    setState({
      open: !state.open,
      isEditing,
      client
    });
  };

  const handleOpenModal = (isEditing?: boolean, client = clientOnSession) => {
    setState({
      open: true,
      isEditing: isEditing !== undefined ? isEditing : state.isEditing,
      client
    });
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      open: false
    });
  };

  const clientModalContextValue: ClientModalContextValue = {
    open: state.open,
    isEditing: state.isEditing,
    client: state.client,
    handleToggleModal,
    handleOpenModal,
    handleCloseModal
  };

  return (
    <ClientModalContext.Provider value={clientModalContextValue}>
      {children}
    </ClientModalContext.Provider>
  );
};
