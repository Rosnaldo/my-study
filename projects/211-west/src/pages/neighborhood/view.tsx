import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Page from '~/components/page';
import Viewlayout from './view-layout';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import {
  getComingSoonAsset,
  getNeighborhoodMedias,
  useGalleries
} from '~/hooks/useGalleries';
import ImageWrapper from '~/components/image-wrapper';
import { useSyncedState } from '~/hooks/useSyncedState';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `1px solid ${theme.palette.background.paper}`,

    '& .MuiTypography-root': {
      color: theme.palette.background.paper,
      fontWeight: 600
    }
  }
}));

const Neighborhood: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const galleries = useGalleries();
  const [showPoi, setShowPoi] = useSyncedState<boolean>('show-poi', false);

  const handleBack = useCallback(() => {
    return navigate('/neighborhood');
  }, []);

  const media = useMemo(() => {
    const media = getNeighborhoodMedias(galleries, 'Neighborhood');
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return media?.length ? media : [comingSoon];
  }, [galleries]);

  if (!showPoi) {
    return (
      <Page
        title="BACK"
        onClickTitle={handleBack}
        nextPage={
          <Button className={classes.button}>
            <Typography>VIEW POI LIST</Typography>
          </Button>
        }
        onClickNext={() => setShowPoi((prev) => !prev)}
      >
        <ImageWrapper src={media[0].url} />
      </Page>
    );
  }

  return (
    <Page title="BACK" onClickTitle={handleBack}>
      <Viewlayout media={media} />
    </Page>
  );
};

export default Neighborhood;
