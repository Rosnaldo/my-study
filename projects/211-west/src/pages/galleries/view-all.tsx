import { Box, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { getPresentationMedias, useGalleries } from '~/hooks/useGalleries';
import Page from '~/components/page';
import { useCallback, useState } from 'react';
import ImageWrapper from '~/components/image-wrapper';
import clsx from 'clsx';
import { ImageFromLocal } from '~/helpers/image-from-local';
import { useSyncScroll } from '~/hooks/useSyncScroll';
import { ExceptCompanion } from '~/components/conditionals';

const useStyles = makeStyles((theme) => ({
  viewAll: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 3rem'
  },
  tags: {
    display: 'flex',
    padding: '1rem',
    gap: '2rem',
    paddingBottom: '2rem',
    justifyContent: 'center'
  },
  tag: {
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: '3rem',
    color: theme.palette.background.paper,

    '&.seleted': {
      background: theme.palette.background.paper,
      color: theme.palette.common.white
    }
  },
  imagens: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 30%)',
    gap: '2rem',
    maxHeight: '67vh',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    scrollbarGutter: 'stable'
  }
}));

const ViewAll = () => {
  const galleries = useGalleries();
  const classes = useStyles();
  const navigate = useNavigate();
  const [tag, setTag] = useState('VIEW ALL');
  const { contentRef } = useSyncScroll();

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

  const medias = [
    ...(tag === 'VIEW ALL' || tag === 'RESIDENCES'
      ? Residences.map((m) => ({ ...m, type: 'Residences' }))
      : []),
    ...(tag === 'VIEW ALL' || tag === 'EXTERIOR'
      ? Exterior.map((m) => ({ ...m, type: 'Exterior' }))
      : []),
    ...(tag === 'VIEW ALL' || tag === 'PENTHOUSES & TOWNHOUSES'
      ? PenthousesAndTownhouses.map((m) => ({
          ...m,
          type: 'Penthouses & Townhouses'
        }))
      : []),
    ...(tag === 'VIEW ALL' || tag === 'AMENITIES'
      ? Amenities.map((m) => ({ ...m, type: 'Amenities' }))
      : [])
  ];

  const handleBack = useCallback(() => {
    return navigate('/gallery');
  }, []);

  return (
    <Page
      title="BACK"
      onClickNext={() => navigate('/gallery')}
      onClickTitle={handleBack}
    >
      <Box className={classes.viewAll}>
        <Box className={classes.tags}>
          <Button
            className={clsx(classes.tag, { seleted: 'VIEW ALL' === tag })}
            onClick={() => setTag('VIEW ALL')}
          >
            VIEW ALL
          </Button>
          <Button
            className={clsx(classes.tag, { seleted: 'EXTERIOR' === tag })}
            onClick={() => setTag('EXTERIOR')}
          >
            EXTERIOR
          </Button>
          <Button
            className={clsx(classes.tag, { seleted: 'RESIDENCES' === tag })}
            onClick={() => setTag('RESIDENCES')}
          >
            RESIDENCES
          </Button>
          <Button
            className={clsx(classes.tag, {
              seleted: 'PENTHOUSES & TOWNHOUSES' === tag
            })}
            onClick={() => setTag('PENTHOUSES & TOWNHOUSES')}
          >
            PENTHOUSES & TOWNHOUSES
          </Button>
          <Button
            className={clsx(classes.tag, { seleted: 'AMENITIES' === tag })}
            onClick={() => setTag('AMENITIES')}
          >
            AMENITIES
          </Button>
        </Box>
        <Box {...{ ref: contentRef }} className={classes.imagens}>
          {medias.map((media) => (
            <Box style={{ width: '100%', height: '20vh', cursor: 'pointer' }}>
              <ImageWrapper
                key={media.id}
                src={ImageFromLocal ? media.ipadRes : media.thumbnail}
                onClick={() => navigate(`/gallery/All?dataId=${media.id}`)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default ViewAll;
