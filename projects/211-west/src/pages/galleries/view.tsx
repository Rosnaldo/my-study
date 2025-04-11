import { useCallback, useLayoutEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CarouselGallery } from '~/components/carousel';
import Page from '~/components/page';
import {
  getComingSoonAsset,
  getPresentationMedias,
  useGalleries
} from '~/hooks/useGalleries';

export const allPresentationGalleries = [
  'Residences',
  'Exterior',
  'Penthouses & Townhouses',
  'Amenities'
];

const allowedGalleries = ['All', ...allPresentationGalleries];

const GalleryView = () => {
  const { gallery = '' } = useParams();
  const galleries = useGalleries();
  const navigate = useNavigate();

  const media = useMemo(() => {
    const media = Object.values(
      getPresentationMedias(
        galleries,
        gallery === 'All' ? allPresentationGalleries : gallery
      )
    ).flat();
    const comingSoon = getComingSoonAsset(galleries, 'coming soon');
    return media?.length ? media : [comingSoon];
  }, [galleries, gallery]);

  useLayoutEffect(() => {
    if (!allowedGalleries.includes(gallery)) {
      navigate('/gallery');
    }
  }, []);

  const handleBack = useCallback(() => {
    return navigate(-1);
  }, []);

  return (
    <Page title="BACK" onClickTitle={handleBack}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <CarouselGallery fullscreen="" setFullScreen={() => {}} media={media} />
      </div>
    </Page>
  );
};

export default GalleryView;
