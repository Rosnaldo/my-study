import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  getComingSoonAsset,
  getNaftaliGroup,
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

const NaftaliGroupPage = () => {
  const galleries = useGalleries();
  const navigate = useNavigate();
  const classes = useStyles();

  const media = useMemo(() => {
    const media = getNaftaliGroup(galleries);
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return media?.length ? media : [comingSoon];
  }, [galleries]);

  return (
    <Gallery
      media={media}
      pageProps={{
        title: 'BACK',
        onClickTitle: () => navigate('/home'),
        className: classes.gallery
      }}
    />
  );
};

export default NaftaliGroupPage;
