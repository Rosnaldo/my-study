import { Box, Typography, makeStyles } from '@material-ui/core';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import ComingSoon from '~/components/coming-soon';
import { Image } from '~/components/image';
import ImageWrapper from '~/components/image-wrapper';
import Page from '~/components/page';
import { ImageFromLocal } from '~/helpers/image-from-local';
import { resolveMedia } from '~/helpers/media';
import {
  MediaWithIpadRes,
  getComingSoonAsset,
  getNeighborhoodMedias,
  useGalleries
} from '~/hooks/useGalleries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '2rem',
    padding: '2rem 4rem'
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
  },
  comingSoon: {
    height: '100%'
  },
  overlay: {
    zIndex: 20
  },
  imageContainer: {
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageTitle: {
    fontSize: '2.5rem',
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    color: theme.palette.background.paper,
    fontFamily: 'Hw Atlantic',
    fontWeight: 'normal'
  }
}));

const findThumb = (gallery?: MediaWithIpadRes[]) => {
  return gallery?.[0]?.url || '';
};

const Neighborhood = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const galleries = useGalleries();

  const { poi, gallery } = useMemo(() => {
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    const poi = getNeighborhoodMedias(galleries, 'Thumbnails').filter(
      (m) => m.title === 'Neighborhood Map'
    ) || [comingSoon];
    const gallery = getNeighborhoodMedias(galleries, 'Thumbnails').filter(
      (m) => m.title === 'Neighborhood Gallery'
    ) || [comingSoon];

    return { poi, gallery };
  }, [galleries]);

  const cardsData = useMemo(
    () => [
      {
        title: 'Neighborhood Map',
        image: ImageFromLocal
          ? findThumb(poi)
          : resolveMedia(findThumb(poi), 800),
        onClick: () => navigate('/neighborhood/poi')
      },
      {
        title: 'Neighborhood Gallery',
        image: ImageFromLocal
          ? findThumb(gallery)
          : resolveMedia(findThumb(gallery), 800),
        onClick: () => navigate('/neighborhood/gallery')
      }
    ],
    [poi, gallery]
  );

  const handleBack = useCallback(() => {
    return navigate(-1);
  }, []);

  return (
    <>
      <Page title="BACK" onClickTitle={handleBack}>
        <Box className={classes.root}>
          {cardsData.map(({ title, image, onClick }) => (
            <Box key={title} className={classes.card} onClick={onClick}>
              <Box className={classes.imageContainer}>
                {image ? (
                  <ImageWrapper
                    objectPosition="bottom"
                    className={classes.image}
                    src={image}
                  />
                ) : (
                  <ComingSoon justImage />
                )}
              </Box>
              <Typography className={classes.imageTitle}>{title}</Typography>
            </Box>
          ))}
        </Box>
      </Page>
    </>
  );
};

export default Neighborhood;
