import { Media as MediaPrev } from '@evolutionv/vysta-ui/.build/v2/components/Gallery';
import { env } from '~/helpers/env';
import {
  GalleryTarget,
  ListPropertyGalleriesQuery,
  MediaGallery,
  NewMedia
} from '../api/__generated__/media';
import { getMediaType, resolveMedia } from '~/helpers/media';
import { useGalleryStore } from '~/store/galleries';

// CONTANTS
export type Media = MediaPrev & {
  tags: string[];
};

export const defaultVideoExtension = '.mp4';

// TYPE DEFINITIONS
export type NewMediaWithThumbnail = NewMedia & {
  thumbnail?: string;
};

export type MediaWithIpadRes = Media & {
  ipadRes: string;
  tags?: string[];
  key: string;
};

export interface IMedia {
  url: string;
  image: string;
  showTitle: boolean;
  name?: string;
  id: string;
  key: string;
  tags?: string[];
}

export type CategoryGallery = {
  id: string;
  name: string;
  category: string;
  order: number;
  medias: IMedia[];
};

export interface IGalleries {
  galleries: CategoryGallery[];
  homepage: IMedia[];
  mainVideo: IMedia[];
  mainGallery: IMedia[];
  amenities: IMedia[];
  neighborhood: IMedia[];
  views: {
    [unitId: string]: MediaWithIpadRes[];
  };
  renderings: {
    [unitId: string]: MediaWithIpadRes[];
  };
  floorplans: {
    [unitId: string]: IMedia[];
  };
  floorplansCompare: {
    [unitId: string]: IMedia[];
  };
  keyplans: {
    [unitId: string]: IMedia[];
  };
}

// HOOK

export function useGalleries() {
  return useGalleryStore((state) => state.getGalleries(env.PROPERTY_ID));
}

// HELPER FUNCTIONS

function parseCategoryGallery(gallery: MediaGallery): CategoryGallery {
  return {
    id: gallery.id,
    name: gallery.name,
    order: gallery.order || 0,
    category: gallery.category.name,
    medias: parseMedias(gallery.medias as NewMedia[])
  };
}

export const getCustomerGallery = (
  galleries: IGalleries | null,
  galleryName: string
): MediaWithIpadRes[] => {
  return (
    getMediaFromCategoryAndGallery(galleries, 'Customer', galleryName) || []
  );
};

export function parseGalleries(data?: ListPropertyGalleriesQuery): IGalleries {
  const parsedGalleries = {};

  const galleries = (data?.mediaGalleries || []).map((gallery) =>
    parseCategoryGallery(gallery as unknown as MediaGallery)
  );

  data?.mediaGalleries.forEach((media) => {
    const { category, name } = media;

    if (!parsedGalleries[category.name]) {
      parsedGalleries[category.name] = {};
    }
    parsedGalleries[category.name][name] = parseMedias(
      media.medias as NewMediaWithThumbnail[]
    );
  });

  const renderings: { [unitId: string]: MediaWithIpadRes[] } =
    data?.mediaGalleries?.reduce(
      (galleries, gallery) => ({
        ...galleries,
        ...(gallery.category.name === 'Renderings'
          ? parseGalleryTargets(
              gallery as unknown as MediaGallery,
              gallery.unitTargets,
              true
            )
          : {})
      }),
      {}
    ) || {};

  const views: { [unitId: string]: MediaWithIpadRes[] } =
    data?.mediaGalleries?.reduce(
      (galleries, gallery) => ({
        ...galleries,
        ...(gallery.category.name.includes('View')
          ? parseGalleryTargets(
              gallery as unknown as MediaGallery,
              gallery.unitTargets,
              true
            )
          : {})
      }),
      {}
    ) || {};

  const floorplans: { [unitId: string]: IMedia[] } =
    data?.mediaGalleries?.reduce(
      (galleries, gallery) => ({
        ...galleries,
        ...(gallery.category.name === 'Floorplan'
          ? parseGalleryTargets(
              gallery as unknown as MediaGallery,
              gallery.unitTargets
            )
          : {})
      }),
      {}
    ) || {};

  const keyplans: { [unitId: string]: IMedia[] } =
    data?.mediaGalleries?.reduce(
      (galleries, gallery) => ({
        ...galleries,
        ...(gallery.category.name === 'Keyplan'
          ? parseGalleryTargets(
              gallery as unknown as MediaGallery,
              gallery.unitTargets
            )
          : {})
      }),
      {}
    ) || {};

  const floorplansCompare: { [unitId: string]: IMedia[] } =
    data?.mediaGalleries?.reduce(
      (galleries, gallery) => ({
        ...galleries,
        ...(gallery.category.name === 'Floorplan Compare'
          ? parseGalleryTargets(
              gallery as unknown as MediaGallery,
              gallery.unitTargets
            )
          : {})
      }),
      {}
    ) || {};

  return {
    galleries,
    amenities: [],
    homepage: [],
    mainGallery: [],
    mainVideo: [],
    neighborhood: [],
    ...parsedGalleries,
    floorplans,
    floorplansCompare,
    renderings,
    views,
    keyplans
  };
}

export function getAssetsApplicationMedias(
  galleries: IGalleries | null,
  name: string
): MediaWithIpadRes[] {
  return [
    getMediaFromCategoryAndGallery(galleries, 'Assets', 'Application').find(
      (m) => m.title === name
    ) || []
  ].flat();
}

export function getComingSoonMedias(
  galleries: IGalleries | null
): MediaWithIpadRes[] {
  console.log('galleries: ', galleries);
  return [
    getMediaFromCategoryAndGallery(galleries, 'Assets', 'Application').find(
      (m) => m.title === 'coming-soon'
    ) || []
  ].flat();
}

function parseGalleryTargets(
  gallery: MediaGallery,
  targets: GalleryTarget[],
  parseToIpad?: boolean
) {
  return (
    targets?.reduce(
      (components, target) => ({
        ...components,
        [target?.id || '']: [
          ...(components[target.id] || []),
          ...parseMedias(gallery?.medias || []).map((media) =>
            parseToIpad ? parseApiMediaToComponentMedia(media) : media
          )
        ]
      }),
      {}
    ) || {}
  );
}

function parseMedia(media: NewMediaWithThumbnail): IMedia {
  const image = media.url?.endsWith(defaultVideoExtension)
    ? media.thumbnail
    : media.url;

  return {
    tags: media?.tags?.map((tag) => tag.name) || [],
    url: resolveMedia(media.url),
    image: image ? resolveMedia(image) : '',
    name: media?.title || '',
    showTitle: !!media?.showTitle,
    id: media?.id || '',
    key: media?.key || ''
  };
}

function parseMedias(medias: NewMediaWithThumbnail[]): IMedia[] {
  return medias?.flatMap((media) => parseMedia(media)) || [];
}

export function parseApiMediaToComponentMedia(media: IMedia): MediaWithIpadRes {
  return {
    id: media.id,
    thumbnail: media?.url?.includes('.mp4')
      ? resolveMedia(media.image)
      : resolveMedia(media.key),
    ipadRes: resolveMedia(media.key),
    title: media.name || '',
    showTitle: !!media.showTitle,
    type: getMediaType(media.url),
    url: resolveMedia(media.key),
    key: resolveMedia(media.key),
    tags: media?.tags || []
  };
}

// GETTERS

const getMediaFromCategoryAndGallery = (
  data: IGalleries | null,
  categoryName: string,
  galleryName: string
) => {
  if (!data) return [];

  return (data?.[categoryName]?.[galleryName] || []).map((media) =>
    parseApiMediaToComponentMedia(media)
  );
};

export const getApplicationAssetsGallery = (
  galleries: IGalleries | null,
  mediaName: string
): MediaWithIpadRes => {
  const medias = getMediaFromCategoryAndGallery(
    galleries,
    'Assets',
    'Application'
  );

  return medias.find((media) => media.title === mediaName);
};

export const getNaftaliGroup = (
  galleries: IGalleries | null
): MediaWithIpadRes[] => {
  return getMediaFromCategoryAndGallery(
    galleries,
    'Naftali Group',
    'Naftali Group'
  );
};

export const getViews = (galleries: IGalleries | null): MediaWithIpadRes[] => {
  return getMediaFromCategoryAndGallery(galleries, 'Views', 'Views');
};

export const getFilmAssets = (
  galleries: IGalleries | null
): MediaWithIpadRes[] => {
  return getMediaFromCategoryAndGallery(galleries, 'Film', 'Film');
};

export const getComingSoonAsset = (
  galleries: IGalleries | null,
  mediaName: string
): MediaWithIpadRes => {
  const medias = getMediaFromCategoryAndGallery(
    galleries,
    'Assets',
    'Application'
  );

  return medias.find((media) => media.title === mediaName);
};

export const getTeamGallery = (
  galleries: IGalleries | null,
  team: string
): MediaWithIpadRes[] => {
  return getMediaFromCategoryAndGallery(galleries, 'Team', team);
};

// Yes, "Gallery" here is the section/category name
export const getGalleryGallery = (
  galleries: IGalleries | null,
  gallery: string
) => {
  return getMediaFromCategoryAndGallery(galleries, 'Gallery', gallery);
};

export function getNeighborhoodMedias(
  galleries: IGalleries | null,
  gallery?: 'Neighborhood' | 'Gallery' | 'Thumbnails'
): MediaWithIpadRes[] {
  if (!gallery) return [];
  return getMediaFromCategoryAndGallery(galleries, 'Neighborhood', gallery);
}

export function getVideoGalleryMedias(
  galleries: IGalleries | null
): MediaWithIpadRes[] {
  return getMediaFromCategoryAndGallery(galleries, 'Video', 'Video');
}

export function getMainGalleryMedias(
  galleries: IGalleries | null
): MediaWithIpadRes[] {
  return (
    galleries?.mainGallery?.flatMap((media) =>
      parseApiMediaToComponentMedia(media)
    ) || []
  );
}

export function getMainVideoMedias(
  galleries: IGalleries | null
): MediaWithIpadRes[] {
  return (
    galleries?.mainVideo?.flatMap((media) =>
      parseApiMediaToComponentMedia(media)
    ) || []
  );
}

export function getPresentationMedias(
  galleries: IGalleries | null,
  gallery: string | string[]
): Record<string, MediaWithIpadRes[]> {
  if (!Array.isArray(gallery)) gallery = [gallery];

  return gallery.reduce((acc, g) => {
    return {
      ...acc,
      [g]: getMediaFromCategoryAndGallery(galleries, 'Gallery', g) || []
    };
  }, {} as Record<string, MediaWithIpadRes[]>);
}

export type ViewsGalleries = {
  [floor: string]: {
    [floorView: string]: IMedia[];
    all: IMedia[];
  };
};

const parseViewsCategories = (
  viewsCategories: Record<string, IMedia[]> | null,
  getFloorFloorView: (categoryName: string) => [string, string]
) => {
  return (
    viewsCategories &&
    Object.entries(viewsCategories).reduce(
      (acc, [name, gallery]: [string, IMedia[]]) => {
        const [floor, floorView] = getFloorFloorView(name);
        if (!floor || !floorView || !gallery?.length) return acc;
        if (!acc[floor]) {
          acc[floor] = { [floorView]: gallery, all: gallery };
        } else {
          acc[floor][floorView] = gallery;
          acc[floor].all = acc[floor].all.concat(gallery);
        }

        return acc;
      },
      {} as ViewsGalleries
    )
  );
};

export function getViewsGalleries(galleries: IGalleries | null) {
  return parseViewsCategories(
    galleries?.['Views'] as Record<string, IMedia[]>,
    (categoryName) =>
      categoryName.split(':').map((n) => n.trim()) as [string, string]
  );
}

export function get360ViewsGalleries(galleries: IGalleries | null) {
  if (!galleries) return null;

  const _360categories = Object.keys(galleries).reduce(
    (acc, name: string) =>
      name?.match(/360.+\((\S+).+\)/)?.[1] ? [...acc, name] : acc,
    [] as string[]
  );

  return _360categories.reduce((acc, galleryName) => {
    return {
      ...acc,
      ...(parseViewsCategories(
        galleries?.[galleryName] as Record<string, IMedia[]>,
        (categoryName) => {
          const floor = galleryName!.match(/360.+\((\S+).+\)/)![1]!;
          return [floor, categoryName];
        }
      ) || {})
    };
  }, {} as ViewsGalleries);
}

export function getNeighborhoodGallery(
  galleries: IGalleries | null
): MediaWithIpadRes[] {
  return getMediaFromCategoryAndGallery(galleries, 'Neighborhood', 'Gallery');
}

export const getNaftaliGroupGallery = (galleries: IGalleries | null) =>
  galleries &&
  getMediaFromCategoryAndGallery(galleries, 'Naftali Group', 'Naftali Group');

export const getPresentationGallery = (galleries: IGalleries | null) =>
  galleries &&
  getMediaFromCategoryAndGallery(galleries, 'Presentation', 'Presentation');

export const getViewsGallery = (
  galleries: IGalleries | null,
  unitModel: string
) => galleries && getMediaFromCategoryAndGallery(galleries, 'Views', unitModel);

export function getCustomerAsset(
  Gallery: IGalleries | null,
  asset: string
): MediaWithIpadRes | null {
  return (
    getMediaFromCategoryAndGallery(Gallery, 'Customer', 'Assets')?.find(
      (media) => media.title === asset
    ) || null
  );
}

export function getPoiGallery(
  galleries: IGalleries | null,
  name: string
): Media[] {
  return getMediaFromCategoryAndGallery(galleries, 'Neighborhood', name).sort();
}

export const getAllGalleries = () => {
  return useGalleries()?.galleries;
};

export const getImageById = (imageId: string) => {
  return useGalleries()?.galleries?.reduce(
    (result: string | undefined | null, obj: CategoryGallery) => {
      if (result !== null) return result;
      const imageIndex = obj.medias.findIndex((image) => image.id === imageId);
      if (imageIndex !== -1) return obj.medias[imageIndex].name;
      return null; // Image not found in current object
    },
    null
  );
};

export const getGalleriesFromCategory = (categoryName: string) => {
  return (
    useGalleries()?.galleries?.filter(
      (gallery) => gallery.category.toLowerCase() === categoryName.toLowerCase()
    ) || []
  );
};

export const getAllMedias = () => {
  return Object.entries(useGalleries() || {})
    ?.map(([_, data]) => {
      let medias: IMedia[] = [];
      Object.entries(data).forEach(([k, d]) => {
        let newData = [...((Array.isArray(d) ? d : []) as IMedia[])];
        if (!Array.isArray(d)) newData = [d as IMedia];
        medias = [...medias, ...newData];
      });
      return medias;
    })
    .flat();
};
