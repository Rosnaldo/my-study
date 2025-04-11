import { useLayoutEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  IGalleries,
  getComingSoonAsset,
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

type Props = {
  gallery: string;
  allowedGalleries: string[];
  fallbackPath: string;
  fetchGalleryFn?: (galleries: any, gallery: string) => any;
};

export const allPresentationGalleries = [
  'Residences',
  'Exterior',
  'Penthouses',
  'Amenities'
];

const defaultFetchGalleryFn = (
  galleries: IGalleries | null,
  gallery: string
) => {
  if (!galleries) return [];

  return Object.values(
    getPresentationMedias(
      galleries,
      gallery === 'All' ? allPresentationGalleries : gallery
    )
  ).flat();
};

const MultipleGalleryPage: React.FC<Props> = ({
  gallery,
  allowedGalleries,
  fallbackPath,
  fetchGalleryFn = defaultFetchGalleryFn
}) => {
  const galleries = useGalleries();
  const navigate = useNavigate();
  const classes = useStyles();

  const media = useMemo(() => {
    const media = fetchGalleryFn(galleries, gallery);
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return media?.length ? media : [comingSoon];
  }, [galleries, gallery]);

  useLayoutEffect(() => {
    if (!allowedGalleries.includes(gallery)) {
      navigate(fallbackPath);
    }
  }, []);

  return (
    <Gallery
      title={gallery.toUpperCase()}
      media={media}
      pageProps={{
        title: 'BACK',
        onClickTitle: () => navigate(fallbackPath),
        className: classes.gallery
      }}
    />
  );
};

export default MultipleGalleryPage;
