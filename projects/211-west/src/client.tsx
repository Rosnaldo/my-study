import { ClientModalProvider } from '~/contexts/client-modal';
import { ClientSessionProvider } from '~/contexts/client-session';
import './style.css';

type ClientProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const ClientProvider = (props: ClientProviderProps) => {
  return (
    <ClientSessionProvider>
      <ClientModalProvider>{props.children}</ClientModalProvider>
    </ClientSessionProvider>
  );
};
