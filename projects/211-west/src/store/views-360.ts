import { useCallback } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { View360 } from '~/api';
import { resolveMedia } from '~/helpers/media';
import * as storage from '~/helpers/storage';
import { getAllMedias } from '~/hooks/useGalleries';
import { useUnits } from '~/hooks/useUnits';

export type View360sState = {
  views: View360[];
};

export type View360sActions = {
  setViews: (views: View360[]) => void;
};

export const views360Store = create(
  persist(
    immer<View360sState & View360sActions>((set) => ({
      views: [],
      setViews: (views) =>
        set((state) => {
          state.views = [...views];
        })
    })),
    {
      name: 'store::threesixties',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const use360Views = () => {
  const state = views360Store((state) => state);

  const medias = getAllMedias();
  const { units } = useUnits();

  const getImageById = useCallback(
    (id: string) => {
      return medias?.find((e) => e?.id === id) ?? null;
    },
    [medias]
  );

  const getUnit360Image = useCallback(
    (viewName: string) => {
      const threeSixtyMatch = state.views.filter((e) => e.name === viewName);
      if (!threeSixtyMatch?.length) return null;

      const imageMatch = threeSixtyMatch.find(
        (e) => getImageById(e.mediaId)?.name === viewName && !!e?.scenes?.length
      );
      if (!imageMatch) return null;
      const image = getImageById(imageMatch.mediaId);
      if (!image) return null;

      return {
        image: resolveMedia(image?.key),
        horizontalDegrees: imageMatch?.scenes?.[0]?.horizontalDegrees ?? 0,
        startingHorizontalDegree: imageMatch?.scenes?.[0]?.left ?? 0,
        verticalDegrees: imageMatch?.scenes?.[0]?.verticalDegrees ?? 0,
        startingVerticalDegree: imageMatch?.scenes?.[0]?.top ?? 0
      };
    },
    [state, units, getImageById]
  );

  return {
    state,
    getUnit360Image
  };
};
