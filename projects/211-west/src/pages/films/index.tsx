import { useCallback, useMemo } from 'react';
import {
  getComingSoonAsset,
  getFilmAssets,
  useGalleries
} from '~/hooks/useGalleries';
import { CarouselGallery } from '~/components/carousel';
import Page from '~/components/page';
import { useNavigate } from 'react-router';

const FilmsPage = () => {
  const galleries = useGalleries();
  const navigate = useNavigate();

  const media = useMemo(() => {
    const media = getFilmAssets(galleries);
    const filtered = media.filter((m) => m.title !== 'thumbnail');
    const mapped = filtered.map((m) => {
      return {
        ...m,
        thumbnail:
          media.find((m) => m.title === 'thumbnail')?.url || m.thumbnail
      };
    });
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return mapped?.length ? mapped : [comingSoon];
  }, [galleries]);
  const handleBack = useCallback(() => {
    return navigate('/home');
  }, []);

  return (
    <Page title="BACK" onClickTitle={handleBack}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <CarouselGallery media={media} fullscreen="" setFullScreen={() => {}} />
      </div>
    </Page>
  );
};

export default FilmsPage;
