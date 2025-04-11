import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { env } from '~/helpers/env';
import {
  getComingSoonAsset,
  getPresentationMedias,
  MediaWithIpadRes,
  useGalleries
} from '~/hooks/useGalleries';
import Page from '~/components/page';
import ImageWrapper from '~/components/image-wrapper';
import { useCallback } from 'react';
import { resolveMedia } from '~/helpers/media';
import { ImageFromLocal } from '~/helpers/image-from-local';

type StyleProps = {
  residenceImage: string;
  exteriorImage: string;
  PenthousesAndTownhousesImage: string;
  amenityImage: string;
  isCompanion: boolean;
};

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    padding: '5em 8rem',
    maxWidth: '90rem',
    justifyItems: 'center',
    gap: '3rem',
    pointerEvents: (props: StyleProps) => (props.isCompanion ? 'none' : 'all'),
    color: '#F1ECE3'
  },
  pageContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  filter: {
    position: 'absolute',
    background: 'rgba(27, 29, 31, 0.5)',
    width: '100%',
    height: '100%'
  },
  font: {
    textTransform: 'uppercase',
    fontSize: '2rem',
    color: theme.palette.background.paper,
    fontFamily: 'Hw Atlantic',
    fontWeight: 300,
    textAlign: 'center'
  },
  footer: {
    marginTop: '.5rem',
    marginRight: '6em',
    display: 'flex',
    justifyContent: 'flex-end',

    '& button': {
      width: '5vw',
      border: '0.39px solid #446665',
      background: '#001E60',
      color: 'white'
    }
  },
  childrenContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    cursor: 'pointer'
  },
  viewAll: {
    border: `1px solid ${theme.palette.background.paper}`,
    color: theme.palette.background.paper,
    padding: '0.8rem 1.5rem',
    marginRight: '1rem',

    '& .MuiTypography-root': {
      fontSize: '1.2rem',
      fontWeight: 600
    }
  }
}));

const GalleryPicker = () => {
  const galleries = useGalleries();

  const {
    Residences,
    Exterior,
    ['Penthouses & Townhouses']: PenthousesAndTownhouses,
    Amenities
  } = getPresentationMedias(galleries, [
    'Residences',
    'Exterior',
    'Penthouses & Townhouses',
    'Amenities'
  ]);

  const comingSoon = getComingSoonAsset(galleries, 'coming soon');

  const findFirstImage = (medias: MediaWithIpadRes[]): string =>
    medias[0]?.url || comingSoon?.url;

  const classes = useStyles({
    residenceImage: findFirstImage(Residences),
    exteriorImage: findFirstImage(Exterior),
    PenthousesAndTownhousesImage: findFirstImage(PenthousesAndTownhouses),
    amenityImage: findFirstImage(Amenities),
    isCompanion: env.IS_COMPANION
  });
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    return navigate('/home');
  }, []);

  const getGalleryImageId = (galleryType: MediaWithIpadRes[]) => {
    return galleryType[0]?.id || comingSoon.id;
  };

  return (
    <Page
      classNameChildrenContent={classes.pageContent}
      title="BACK"
      nextPage={
        <Button className={classes.viewAll}>
          <Typography>VIEW ALL</Typography>
        </Button>
      }
      onClickNext={() => navigate('/gallery/view-all')}
      onClickTitle={handleBack}
    >
      <Box className={classes.content}>
        <Box className={classes.imageContainer}>
          <ImageWrapper
            src={
              ImageFromLocal
                ? findFirstImage(Exterior)
                : resolveMedia(findFirstImage(Exterior), 500)
            }
            onClick={() =>
              navigate(
                `/gallery/Exterior?dataId=${getGalleryImageId(Exterior)}`
              )
            }
          />
          <Typography variant="inherit" className={classes.font}>
            Exterior
          </Typography>
        </Box>

        <Box className={classes.imageContainer}>
          <ImageWrapper
            src={
              ImageFromLocal
                ? findFirstImage(Residences)
                : resolveMedia(findFirstImage(Residences), 500)
            }
            onClick={() =>
              navigate(
                `/gallery/Residences?dataId=${getGalleryImageId(Residences)}`
              )
            }
          />
          <Typography variant="inherit" className={classes.font}>
            Residences
          </Typography>
        </Box>

        <Box className={classes.imageContainer}>
          <ImageWrapper
            src={
              ImageFromLocal
                ? findFirstImage(PenthousesAndTownhouses)
                : resolveMedia(findFirstImage(PenthousesAndTownhouses), 500)
            }
            onClick={() =>
              navigate(
                `/gallery/Penthouses & Townhouses?dataId=${getGalleryImageId(
                  PenthousesAndTownhouses
                )}`
              )
            }
          />
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: 'fit-content'
            }}
          >
            <Typography variant="inherit" className={classes.font}>
              Penthouses & Townhouses
            </Typography>
          </Box>
        </Box>

        <Box className={classes.imageContainer}>
          <ImageWrapper
            src={
              ImageFromLocal
                ? findFirstImage(Amenities)
                : resolveMedia(findFirstImage(Amenities), 500)
            }
            onClick={() =>
              navigate(
                `/gallery/Amenities?dataId=${getGalleryImageId(Amenities)}`
              )
            }
          />
          <Typography variant="inherit" className={classes.font}>
            Amenities
          </Typography>
        </Box>
      </Box>
    </Page>
  );
};

export default GalleryPicker;
