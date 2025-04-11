import { useEffect, useState } from 'react';
import { ImageFactor } from '../types';

type Props = {
  src: string;
  mainRef: React.RefObject<HTMLDivElement>;
  imgRef: React.RefObject<HTMLImageElement>;
};

type ReturnType = {
  imageFactor: ImageFactor;
};

function useImagefactor({ src, mainRef, imgRef }: Props): ReturnType {
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    const main = mainRef.current;
    const img = imgRef.current;
    if (!main) return;
    if (!img) return;

    const clientRect = main.getBoundingClientRect();

    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (!imgRef.current) return;
      const realSquareRateHeight =
        (clientRect.width || 0) / (clientRect.height || 0);
      const naturalSquareRateHeight =
        (img.naturalWidth || 0) / (img.naturalHeight || 0);
      const heightFator = realSquareRateHeight / naturalSquareRateHeight;

      const realSquareRateWidth =
        (clientRect.height || 0) / (clientRect.width || 0);
      const naturalSquareRateWidth =
        (img.naturalHeight || 0) / (img.naturalWidth || 0);
      const widthFator = realSquareRateWidth / naturalSquareRateWidth;

      if (widthFator > heightFator) {
        setImageHeight(100);
        setImageWidth(widthFator * 100);
      } else {
        setImageHeight(heightFator * 100);
        setImageWidth(100);
      }
    };
  }, []);

  return {
    imageFactor: { height: imageHeight, width: imageWidth }
  };
}

export { useImagefactor };
