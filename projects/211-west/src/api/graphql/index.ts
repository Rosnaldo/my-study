import { ApolloClient } from '@apollo/client';
import { cache } from './cache';
import { linkClient } from './link';

import {
  GalleryTarget,
  MediaCategory as MediaCategoryGenerate,
  MediaGallery as MediaGalleryGenerate,
  NewMedia as NewMediaGenerate
} from '../__generated__/media';
export * from '../__generated__/sage';

export type NewMedia = NewMediaGenerate & {
  originalFileUrl?: string;
  thumbnail?: string;
  unitTargets?: GalleryTarget[];
};
export type MediaGallery = MediaGalleryGenerate & {
  medias: Array<NewMedia>;
  componentTargets?: GalleryTarget[];
  unitTargets?: GalleryTarget[];
  unitModelTargets?: GalleryTarget[];
  floorplanTargets?: GalleryTarget[];
  keyplanTargets?: GalleryTarget[];
  amenityTargets?: GalleryTarget[];
  poiTargets?: GalleryTarget[];
};
export type MediaCategory = MediaCategoryGenerate & { medias: Array<NewMedia> };

export const client = new ApolloClient({
  link: linkClient,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    },
    mutate: {
      fetchPolicy: 'no-cache'
    }
  }
});
