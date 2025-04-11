import { MediaType } from '@evolutionv/vysta-ui/.build/v2/components/Gallery';
import * as cordovaFs from '../cordova/fs';
import { env } from './env';

export function resolveMedia(media: string, width?: number): string {
  const fileHref = new URL(getSafeMediaPath(media), env.DATA_PATH).href;

  if (env.IS_IPAD) {
    // This was not documented on the cordova docs.
    // That's the only function that works to get local files.

    if (width)
      return cordovaFs.convertFileUrl(
        `${fileHref.replace('/properties', '/resize/properties')}/w=${width}`
      );

    return cordovaFs.convertFileUrl(fileHref);
  }

  if (env.IS_COMPANION) {
    return fileHref;
  }

  if (getMediaType(fileHref) === 'image' && width) {
    return resolveExternalMedia(
      `${fileHref.replace('/properties', '/resize/properties')}/w=${width}`
    );
  }

  return fileHref;
}

export function resolveExternalMedia(media: string): string {
  return new URL(getSafeMediaPath(media), `https://${env.MEDIA_DOMAIN}`).href;
}

function getSafeMediaPath(media: string): string {
  return `${media}`.replace(/ /g, '%20');
}

export function getMediaType(path: string): MediaType {
  const ext = path.split('.').pop() || '';

  const mediaTypes = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    video: ['mp4', 'webm', 'flv', 'avi', 'mov', 'wmv', 'mpg', 'mpeg']
  };

  const type = Object.keys(mediaTypes).find((type) =>
    mediaTypes[type].includes(ext)
  );

  return (type as MediaType) || 'image';
}

/**
 * Given a relative path to an image, return a thumbnail url by resizing the image
 * @param relativeSrc eg. /property/123123-123123-1231-1/image.jpg
 * @param width
 * @param height
 * @returns
 */
export const getResizedImage = (relativeSrc: string, width: number): string => {
  return `https://${env.MEDIA_DOMAIN}/resize/${relativeSrc}/w=${width}`;
};
