import React, { createContext, useCallback, useState } from 'react';
import { useSyncedState } from '~/hooks/useSyncedState';

type TemplateContextType = {
  state: StateType;
  handlers: HandlersType;
};

type HandlersType = {
  toggleMenu: () => void;
  toggleSettings: () => void;
};

type StateType = {
  isMenuOpen: boolean;
  isSettingsOpen: boolean;
};

const initialContext: TemplateContextType = {
  state: {
    isMenuOpen: false,
    isSettingsOpen: false
  },
  handlers: {
    toggleMenu: () => {},
    toggleSettings: () => {}
  }
};

export const LayoutContext = createContext<TemplateContextType>(initialContext);

const Provider: React.FC = ({ children }) => {
  const [state, setState] = useSyncedState<StateType>(
    'layout-provider-state',
    initialContext.state
  );

  const toggleMenu = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen
    }));
  }, []);

  const toggleSettings = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isSettingsOpen: !prevState.isSettingsOpen
    }));
  }, []);

  const value: TemplateContextType = {
    state,
    handlers: {
      toggleMenu,
      toggleSettings
    }
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default Provider;
