import { SageConnection } from '@evolutionv/companion-devices-react';
import { useUiComponentStateSync } from '@evolutionv/companion-devices-react/.build/hook';
import { Box, Typography } from '@evolutionv/vysta-ui';
// import BackButton from '~/components/back-button';

const UI_COMPONENT_CLASS = 'SageNotFoundPage';
enum UiComponentStates {
  Loaded = 'loaded'
}

export function NotFoundPage() {
  const { stationId } = SageConnection.useCompanionConnection();
  useUiComponentStateSync<UiComponentStates>(
    UI_COMPONENT_CLASS,
    stationId,
    UiComponentStates.Loaded
  );

  return (
    <Box
      className={UI_COMPONENT_CLASS}
      height="100%"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* <Box position="absolute" top="2em" left="2em">
        <BackButton goHome />
      </Box> */}
      <Typography variant="h2" align="center">
        The page you're in does not seem to exist.
      </Typography>
      <Box height="2em" />
      <Typography variant="body2" align="center">
        Please contact support.
      </Typography>
    </Box>
  );
}
