import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  IGalleries,
  getComingSoonAsset,
  getNeighborhoodGallery,
  getPresentationMedias,
  useGalleries
} from '~/hooks/useGalleries';
import Gallery from '~/components/gallery';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gallery: {
    '& div': {
      background: theme.palette.background.paper
    }
  }
}));

const defaultFetchGalleryFn = (
  galleries: IGalleries | null,
  gallery: string
) => {
  if (!galleries) return [];

  return Object.values(getPresentationMedias(galleries, gallery)).flat();
};

const NeighborhoodgalleryPage: React.FC = () => {
  const galleries = useGalleries();
  const navigate = useNavigate();
  const classes = useStyles();

  const media = useMemo(() => {
    const media = getNeighborhoodGallery(galleries);
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return media?.length ? media : [comingSoon];
  }, [galleries]);

  return (
    <Gallery
      title="Neighborhood"
      media={media}
      pageProps={{
        title: 'BACK',
        onClickTitle: () => navigate('/neighborhood'),
        className: classes.gallery
      }}
    />
  );
};

export default NeighborhoodgalleryPage;
