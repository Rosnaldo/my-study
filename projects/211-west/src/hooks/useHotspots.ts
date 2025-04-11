import { useHotspotsStore } from '~/store/hotspots';
import { useGalleries } from './useGalleries';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HotspotMap } from '~/api';
import { useSyncedState } from './useSyncedState';
import { MapArea, Position } from '~/components/v2-poi/types';
import { toAlphabet } from '~/components/v2-poi/helpers/toAlphabet';

export type Pois = Record<string, HotspotMap[]> | undefined;

type UseHotspotProps = {
  name?: string;
  showAll?: boolean;
};

export type POIModalProps = {
  open: boolean;
  area: HotspotMap;
  mediaSrc: string;
};

export const useHotspot = ({ name, showAll }: UseHotspotProps) => {
  const [hotspot] = name
    ? [
        useHotspotsStore((state) =>
          state.hotspots.find((hotspot) => hotspot.name === name)
        )!
      ]
    : useHotspotsStore((state) => state.hotspots) || [];

  const pois: Pois = useMemo(() => {
    const pois = hotspot?.map?.reduce((acc: any, hotspotMap) => {
      if (!hotspotMap.category) return acc;

      if (!acc[hotspotMap.category]) acc[hotspotMap.category] = [];

      acc[hotspotMap.category].push(hotspotMap);

      return acc;
    }, {} as Pois);

    return pois;
  }, [hotspot]);

  const getAreas = useCallback(
    (showCategories?: Record<string, any>) =>
      [...(hotspot?.map || [])]
        ?.sort((a, b) =>
          a?.category === b?.category
            ? 0
            : (a?.category || '') > (b?.category || '')
            ? -1
            : 1
        )
        ?.map((areaMapItem) => {
          const { __typename, ...rest } = areaMapItem;

          if (
            showCategories &&
            !showAll &&
            !showCategories[rest.category || '']
          )
            return [];

          return rest as HotspotMap;
        })
        .flat() || [],
    [hotspot, showAll]
  );

  return { hotspot, pois, getAreas };
};

export const useSyncedHotspot = ({
  ...hotspotProps
}: {
  color?: string;
  selectedAreaColor?: string;
} & UseHotspotProps) => {
  const context = useHotspot(hotspotProps);
  const [openModal, setOpenModal] = useSyncedState<string>(
    'open-hotspot-modal',
    ''
  );
  const [modal, setModal] = useSyncedState<POIModalProps>('poi-modal-handler', {
    open: false,
    area: {} as HotspotMap,
    mediaSrc: ''
  });

  const [openTooltips, setOpenTooltips] = useSyncedState<string[]>(
    'open-areas-tooltips',
    []
  );
  const [isAccordionExpanded, setIsAccordionExpanded] = useSyncedState<
    Record<string, boolean>
  >('is-accordion-expanded', {});
  const galleries = useGalleries();

  const toogleTooltip = useCallback(
    (id: string) =>
      setOpenTooltips((opened) => {
        if (opened.includes(id)) return [];

        return [id];
      }),
    []
  );

  const setTooltip = useCallback(
    (id: string, show: boolean) =>
      setOpenTooltips(() => {
        if (show) return [id];
        return [];
      }),
    []
  );

  const toggleDrawer = useCallback(
    (category: string) =>
      setIsAccordionExpanded((prev) => ({
        ...prev,
        [category]: !prev[category]
      })),
    []
  );

  const closeTooltips = useCallback(() => {
    setOpenTooltips([]);
  }, []);

  useEffect(() => {
    setIsAccordionExpanded(
      Object.keys(context.pois || {}).reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {} as Record<string, boolean>)
    );
  }, [context.pois]);

  const map = useMemo(() => {
    const areas = context.getAreas(isAccordionExpanded);
    const memoCategory = {};

    const addToMemoCategory = (category: string) => {
      if (!category) return;
      if (!(category in memoCategory)) {
        memoCategory[category] = -1;
      }
      return memoCategory[category]++;
    };

    const areaToMapArea = (area: HotspotMap): MapArea => {
      const { x, y, width } = area;

      const id = `${area.category}-${area.name}`;

      addToMemoCategory(area.category!);
      const letter = toAlphabet(memoCategory[area.category!]);

      return {
        id,
        name: area.name,
        letter,
        category: area.category!,
        position: { x, y },
        size: width || 0
      };
    };

    return {
      areas: areas.map(areaToMapArea)
    };
  }, [isAccordionExpanded, context.getAreas]);

  return {
    ...context,
    openModal,
    setOpenModal,
    openTooltips,
    isAccordionExpanded,
    toogleTooltip,
    setTooltip,
    toggleDrawer,
    map,
    closeTooltips,
    modal,
    setModal
  };
};
