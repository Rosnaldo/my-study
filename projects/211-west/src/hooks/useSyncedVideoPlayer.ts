import { IVideoControlHandler } from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoControls';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { env } from '~/helpers/env';
import { useCompanion } from './useCompanion';

export function useSyncedVideoPlayer(stateName = 'video-player') {
  const handlerRef = useRef<IVideoControlHandler | null>(null);
  const [, { send, on }] = useCompanion();

  const onReady = useCallback((handler: IVideoControlHandler) => {
    handlerRef.current = handler;
  }, []);

  const onStart = useCallback(() => {
    if (!env.IS_COMPANION) {
      send(`${stateName}::start`);
    }
  }, [stateName]);

  const onPlay = useCallback(() => {
    if (!env.IS_COMPANION) {
      send(`${stateName}::play`);
    }
  }, [stateName]);

  const onPause = useCallback(() => {
    if (!env.IS_COMPANION) {
      send(`${stateName}::pause`);
    }
  }, [stateName]);

  const onSeek = useCallback(
    (seconds: number) => {
      if (!env.IS_COMPANION) {
        send(`${stateName}::seek`, seconds);
      }
    },
    [stateName]
  );

  const onEnded = useCallback(() => {
    if (!env.IS_COMPANION) {
      send(`${stateName}::ended`);
    }
  }, [stateName]);

  const pause = useCallback(() => {
    handlerRef.current?.pause();
  }, [handlerRef]);

  const onFullscreen = useCallback(
    (isFullscreen: boolean) => {
      if (!env.IS_COMPANION) {
        send(`${stateName}::fullscreen`, isFullscreen);
      }
    },
    [stateName]
  );

  useEffect(() => {
    if (!env.IS_COMPANION) return;

    const unsubscribeStart = on(`${stateName}::start`, () => {
      handlerRef.current?.play();
    });
    const unsubscribePlay = on(`${stateName}::play`, () => {
      handlerRef.current?.play();
    });
    const unsubscribePause = on(`${stateName}::pause`, () => {
      handlerRef.current?.pause();
    });
    const unsubscribeSeek = on(`${stateName}::seek`, (_ev, seconds: number) => {
      handlerRef.current?.seek(seconds);
    });
    const unsubscribeEnded = on(`${stateName}::ended`, () => {
      handlerRef.current?.pause();
      handlerRef.current?.seek(0);
    });
    const unsubscribeFullscreen = on(
      'video-player::fullscreen',
      (_ev, isFullscreen: boolean) => {
        handlerRef.current?.fullscreen(isFullscreen);
      }
    );

    return () => {
      unsubscribeStart();
      unsubscribePlay();
      unsubscribePause();
      unsubscribeSeek();
      unsubscribeEnded();
      unsubscribeFullscreen();
    };
  }, [stateName]);

  const controls = useMemo(
    () => ({
      onReady,
      onStart,
      onPlay,
      onPause,
      onSeek,
      onEnded,
      onFullscreen,
      pause
    }),
    [onReady, onStart, onPlay, onPause, onSeek, onEnded, onFullscreen, pause]
  );

  return controls;
}
