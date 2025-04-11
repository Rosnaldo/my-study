import { useCallback, useMemo } from 'react';
import {
  Amenity,
  Hotspot,
  Property,
  QueryPropertyQuery,
  View360,
  useListAmenitiesLazyQuery,
  useListDevicesLazyQuery,
  useListHotspotsLazyQuery,
  useQueryPropertyLazyQuery,
  useListViews360LazyQuery
} from '~/api';
import {
  ListPropertyGalleriesQuery,
  useListPropertyGalleriesLazyQuery
} from '~/api/__generated__/media';
import {
  downloadMedia as downloadMediaToDisk,
  loadManifest,
  updateManifest
} from '~/helpers/download';
import { env } from '~/helpers/env';
import {
  getMediaType,
  resolveExternalMedia,
  getResizedImage
} from '~/helpers/media';
import { parseDevices } from './useDevices';
import { parseGalleries } from './useGalleries';
import { mediaState } from '~/store/media';
import { devicesState } from '~/store/devices';
import { propertyState } from '~/store/property';
import { amenitiesState } from '~/store/amenities';
import { galleryState } from '~/store/galleries';
import { contentLoadState } from '~/store/content-load';
import { hotspotsState } from '~/store/hotspots';
import { views360Store } from '~/store/views-360';

export type MediasManifest = {
  [propertyId: string]: {
    [id: string]: string;
  };
};

export function useContentLoad() {
  const [queryDevices] = useListDevicesLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [queryProperty] = useQueryPropertyLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [listPropertyMediaGalleries] = useListPropertyGalleriesLazyQuery({
    fetchPolicy: 'cache-and-network',
    context: {
      client: 'media'
    }
  });

  const [listHotspots] = useListHotspotsLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [listView360] = useListViews360LazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [listAmenities] = useListAmenitiesLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  let propertyData: QueryPropertyQuery | undefined;
  let galleries: ListPropertyGalleriesQuery | undefined;
  const applicationId = env.APPLICATION_ID;

  const updateDevicesContent = useCallback(async () => {
    try {
      const { data: devicesData } = await queryDevices({
        variables: { applicationId }
      });

      if (devicesData) {
        devicesState.setDevices(parseDevices(devicesData));
      }
    } catch (e) {
      console.error(`[CONTENT LOAD] - ERROR GETTING DEVICES`, e);
    }
  }, []);

  const updateView360 = useCallback(
    async (property: Property) => {
      const propertyId = property.id || '';
      const componentId =
        property.components?.find((component) => !!component)?.id || '';

      const { data } = await listView360({
        variables: {
          input: {
            applicationId,
            propertyId,
            componentId
          }
        }
      });

      if (data) {
        views360Store.getState().setViews(data.listViews360 as View360[]);
      }
    },
    [applicationId]
  );

  const updateContent = useCallback(
    async (propertyId: string, showLoadingScreen?: boolean) => {
      contentLoadState.setContentLoadRunning(true);
      if (showLoadingScreen) {
        contentLoadState.setLoading(true);
      }

      const mediaManifest = await loadManifest();

      if (mediaManifest[propertyId]) {
        mediaState.setMedias(propertyId, mediaManifest[propertyId]);
      } else {
        mediaState.clearMediaByPropertyId(propertyId);
      }

      try {
        const { data } = await queryProperty({
          variables: { applicationId: env.APPLICATION_ID, id: propertyId }
        });

        propertyData = data;
      } catch (e) {
        console.error(`[CONTENT LOAD] - ERROR GETTING PROPERTY`, e);
      }

      try {
        await updateView360(propertyData?.property as Property);
      } catch (e) {
        console.error(`[CONTENT LOAD] - ERROR GETTING 360 VIEWS`, e);
      }

      try {
        const { data } = await listPropertyMediaGalleries({
          variables: { propertyId }
        });

        galleries = data;
      } catch (e) {
        console.error(`[CONTENT LOAD] - ERROR GETTING GALLERIES`, e);
      }

      try {
        const { data } = await listAmenities({
          variables: { applicationId: env.APPLICATION_ID }
        });

        if (data?.amenities) {
          amenitiesState.setAmenities(data.amenities as Amenity[]);
        }
      } catch (e) {
        console.error(`[CONTENT LOAD] - ERROR GETTING AMENITIES`, e);
      }

      try {
        const { data } = await listHotspots({
          variables: {
            applicationId: env.APPLICATION_ID,
            propertyId: env.PROPERTY_ID
          }
        });
        hotspotsState.setHotspots((data?.hotspots || []) as Hotspot[]);
      } catch (error) {
        console.error(`[CONTENT LOAD] - ERROR GETTING HOTSPOTS`, error);
      }

      const medias =
        galleries?.mediaGalleries?.flatMap((gallery) =>
          gallery.medias.flatMap(({ key: relativeSrc }, idx) => ({
            id: `${gallery.id || ''}-${idx}`,
            relativeSrc,
            propertyId,
            type: getMediaType(relativeSrc)
          }))
        ) || [];

      if (env.IS_IPAD || env.IS_COMPANION) {
        const mediasToUpdate = medias.filter(
          (media) =>
            !mediaManifest[media.propertyId]?.[media.id] ||
            mediaManifest[media.propertyId]?.[media.id] !== media.relativeSrc
        );

        const mediasToUpdateMetadata = await Promise.all(
          mediasToUpdate.map(async (media) => {
            try {
              const fileUrl = resolveExternalMedia(media.relativeSrc) as string;

              let totalSize = 0;

              if (media.type === 'image') {
                const thumbnailUrl = getResizedImage(
                  media.relativeSrc,
                  env.THUMBNAIL_IMAGE_WIDTH
                );
                const ipadUrl = getResizedImage(
                  media.relativeSrc,
                  env.IPAD_IMAGE_WIDTH
                );

                const thumbnailResult = await fetch(thumbnailUrl, {
                  method: 'HEAD'
                });
                const ipadResult = await fetch(ipadUrl, { method: 'HEAD' });

                totalSize +=
                  parseInt(
                    thumbnailResult.headers.get('Content-Length') || ''
                  ) || 0;
                totalSize +=
                  parseInt(ipadResult.headers.get('Content-Length') || '') || 0;
              }

              const fileResult = await fetch(fileUrl, { method: 'HEAD' });

              totalSize +=
                parseInt(fileResult.headers.get('Content-Length') || '') || 0;

              return {
                ...media,
                fileSize: totalSize ? totalSize / (1024 * 1024) : totalSize
              };
            } catch (err) {
              console.error('ERROR GETTING SIZE', err);
              return { ...media, fileSize: 0 };
            }
          })
        );

        const mediaSizes = mediasToUpdateMetadata.reduce(
          (acc, media) => acc + media.fileSize,
          0
        );

        /**
         * It's 3 because for each image we download the original, the thumbnail and the ipad version
         */
        contentLoadState.setTotalToDownload(mediasToUpdate.length * 3);
        contentLoadState.setTotalToDownloadSize(mediaSizes);
        contentLoadState.setTotalDownloaded(0);
        contentLoadState.setTotalDownloadedSize(0);

        await downloadMedias(mediasToUpdateMetadata, mediaManifest);
      }

      if (showLoadingScreen) {
        contentLoadState.setLoading(false);

        const property = propertyData?.property;

        if (property) {
          propertyState.setProperty(propertyId, property as Property);
        }

        if (galleries) {
          galleryState.setGallery(propertyId, parseGalleries(galleries));
        }
      }

      contentLoadState.setTotalToDownload(null);
      contentLoadState.setTotalToDownloadSize(null);
      contentLoadState.setTotalDownloaded(null);
      contentLoadState.setTotalDownloadedSize(null);
      contentLoadState.setContentLoadRunning(false);
      await updateDevicesContent();
    },
    [updateDevicesContent, updateView360]
  );

  return { updateContent, updateDevicesContent };
}

// DOWNLOAD

/**
 * @important
 * This will force the browser to cache
 * all downloaded images to display it without delay
 */
const cacheImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

type DownloadInput = {
  propertyId: string;
  id: string;
  relativeSrc: string;
  fileSize: number;
  type: string;
};

async function downloadMedia({
  propertyId,
  fileSize,
  id,
  relativeSrc,
  type
}: DownloadInput) {
  const fileUrl = resolveExternalMedia(relativeSrc) as string;
  const thumbnailUrl = getResizedImage(relativeSrc, env.THUMBNAIL_IMAGE_WIDTH);
  const ipadUrl = getResizedImage(relativeSrc, env.IPAD_IMAGE_WIDTH);

  if (type === 'image') {
    await Promise.all([
      cacheImage(thumbnailUrl),
      cacheImage(ipadUrl),
      cacheImage(fileUrl)
    ]);
  }

  await Promise.all([
    downloadMediaToDisk({
      fileUrl,
      relativePath: relativeSrc
    })
  ]);

  mediaState.updateMediaById(propertyId, id, relativeSrc);
  contentLoadState.addTotalDownloaded(3);
  contentLoadState.addTotalDownloadedSize(fileSize);
}

async function downloadMedias(
  medias: DownloadInput[],
  manifest: MediasManifest
) {
  let newManifest = { ...manifest };

  for (const media of medias) {
    try {
      await downloadMedia(media);
      if (!newManifest[media.propertyId]) newManifest[media.propertyId] = {};
      newManifest[media.propertyId][media.id] = media.relativeSrc;
      await updateManifest(newManifest);
    } catch (e) {
      console.error(`[CONTENT LOAD] - ERROR DOWNLOADING MEDIA`, e);
    }
  }
}
