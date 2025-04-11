import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getComingSoonAsset,
  getViews,
  useGalleries
} from '~/hooks/useGalleries';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import Page from '~/components/page';
import { useQueryString } from '~/hooks/useQueryString';
import clsx from 'clsx';
import { env } from '~/helpers/env';
import { useSyncedState } from '~/hooks/useSyncedState';
import { CompanionOnly, ExceptCompanion } from '~/components/conditionals';
import PanoramaViewer, {
  Position,
  setPosition,
  setScene
} from '@evolutionv/vysta-ui/.build/v2/components/PanoramaViewer';
import { use360Views } from '~/store/views-360';
import { bufferImage } from '~/helpers/buffer-image';

const useStyles = makeStyles((theme) => ({
  view: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  options: {
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    border: `1px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.background.paper
  },
  option: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '0.5rem 1rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    cursor: 'pointer',

    '&:active,&:hover,&:focus': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary
    },

    '& .MuiTypography-root': {
      width: 'fit-object',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
      '&.selected': {
        textDecoration: 'underline'
      }
    }
  }
}));

function filterUniqueIds(array: any[]): any[] {
  const seenIds = new Set<string | number>();
  return array.filter((item) => {
    if (seenIds.has(item.id)) {
      return false;
    } else {
      seenIds.add(item.id);
      return true;
    }
  });
}

const ViewsPage = () => {
  const galleries = useGalleries();
  const navigate = useNavigate();
  const classes = useStyles();
  const [option, setOption] = useSyncedState<string>('views-options', '11-12');
  const [queryString, setQueryString] = useQueryString({
    viewName: '11-12'
  });

  const handleBack = useCallback(() => {
    return navigate('/home');
  }, []);

  const media = useMemo(() => {
    const views = getViews(galleries);
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return views?.length
      ? views.sort((a, b) => {
        const aTitle = a.title.replace(/\s+/g, '');
        const bTitle = b.title.replace(/\s+/g, '');
        if (aTitle < bTitle) {
          return -1;
        }
        if (aTitle > bTitle) {
          return 1;
        }
        return 0;
      })
      : [comingSoon];
  }, [galleries]);

  useEffect(() => {
    setQueryString({
      ...queryString,
      viewName: option
    });
  }, [option]);

  const [currentPosition, setCurrentPosition] = useSyncedState<Position | null>(
    'current-position',
    null
  );
  const [sceneMap, setSceneMap] = useSyncedState<any | null>('scene-map', null);
  const [currentScene, setCurrentScene] = useSyncedState<any | null>(
    'current-scene',
    '11-12'
  );

  const { state, getUnit360Image } = use360Views();

  const handleMove = (position: Position) => {
    setCurrentPosition(position);
  };

  useEffect(() => {
    if (env.IS_COMPANION) return;
    const sceneMap = state?.views.map((v) => {
      const sceneImage = getUnit360Image(v.name);
      return {
        id: v.name,
        imageSrc: sceneImage?.image || '',
        hotSpots: []
      };
    });
    setSceneMap(filterUniqueIds(sceneMap));
  }, [state.views?.length]);

  useEffect(() => {
    if (!env.IS_COMPANION || currentPosition === null) return;

    setPosition(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (sceneMap && currentScene) setScene(currentScene);
  }, [currentScene, sceneMap]);

  return (
    <Page title="BACK" onClickTitle={handleBack}>
      <Box className={classes.view}>
        <PanoramaViewer
          scenes={sceneMap || []}
          initialSceneId={sceneMap ? sceneMap[0].id : '11-12'}
          onRender={handleMove}
        />
        <ExceptCompanion>
          <Box className={classes.options}>
            {media.map((m) => (
              <Button
                className={classes.option}
                onClick={() => {
                  setOption(m.title);
                  setScene(m.title);
                  setCurrentScene(m.title);
                }}
              >
                <Typography className={clsx({ selected: option === m.title })}>
                  {m.title}
                </Typography>
              </Button>
            ))}
          </Box>
        </ExceptCompanion>
      </Box>
    </Page>
  );
};

export default ViewsPage;
