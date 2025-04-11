import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ApiProvider } from '~/providers/api';
import LayoutProvider from '~/providers/layout';
import { ThemeProvider } from '~/providers/theme';
import ScreenSaverProvider from '~/providers/screen-saver';
import CompareProvider from '~/contexts/compare';
import { ClientModalProvider } from '~/contexts/client-modal';
import { useCompanion } from '~/hooks/useCompanion';
import CompanionOverlay from '~/components/companion-overlay';
import ContentUpdater from '~/components/content-updater';
import PhysicalAutoConnection from '~/components/physical-auto-connection';
import { SuspendPinchZoom } from '~/components/suspend-pinch-zoom';
import AppRoutes from '~/routes';
import { ClientProvider } from './client';
import { ClientSessionProvider } from '~/contexts/client-session';

const App: React.FC = () => {
  const [{ companionConnection, isConnected }, { send, setIsConnected }] =
    useCompanion();

  useEffect(() => {
    if (!companionConnection.deviceId && isConnected) {
      setIsConnected(false);
      return;
    }
    function sendHeartbeat() {
      send('connection::heartbeat')
        .then(() => {
          if (!isConnected && companionConnection.deviceId) {
            setIsConnected(true);
          }
        })
        .catch(() => {
          if (isConnected) {
            setIsConnected(false);
          }
        });
    }
    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [companionConnection]);

  return (
    <ApiProvider>
      <ThemeProvider>
        <LayoutProvider>
          <ClientModalProvider>
            <CompareProvider>
              <ScreenSaverProvider>
                <HashRouter>
                  <ClientSessionProvider>
                    <ClientProvider>
                      <SuspendPinchZoom>
                        <AppRoutes />
                      </SuspendPinchZoom>
                    </ClientProvider>
                  </ClientSessionProvider>

                  <PhysicalAutoConnection />
                </HashRouter>
              </ScreenSaverProvider>
              <ContentUpdater />
              <CompanionOverlay />
            </CompareProvider>
          </ClientModalProvider>
        </LayoutProvider>
      </ThemeProvider>
    </ApiProvider>
  );
};
export default App;
