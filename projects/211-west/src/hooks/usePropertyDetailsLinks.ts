import { useMemo } from 'react';
import {
  MediaWithIpadRes,
  getCustomerGallery,
  useGalleries
} from './useGalleries';

const links = [
  {
    title: 'Property Details',
    link: '/property-details'
  }
];

type LinkWithImage = {
  title: string;
  link: string;
  media: MediaWithIpadRes[];
};

export const UsePropertyDetailsLinks = (): LinkWithImage[] => {
  const galleries = useGalleries();
  return useMemo(
    () =>
      links.map((link) => ({
        ...link,
        media: getCustomerGallery(galleries, link.title)
      })),
    [galleries]
  );
};
