import { UnitDetails as UnitDetailsPrev } from '@evolutionv/vysta-ui/.build/v2/pages/unit/details';
import { useMemo } from 'react';
import { SalesStatusType, UnitModel } from '~/api';
import { env } from '~/helpers/env';
import { resolveMedia } from '~/helpers/media';
import { getFeatureCollection } from '~/helpers/sageAttributes';
import { convertApiStatusToLabel } from '~/helpers/status';
import { IMedia, MediaWithIpadRes, useGalleries } from '~/hooks/useGalleries';
import { usePropertyStore } from '~/store/property';

// HOOK

export type UnitDetails = UnitDetailsPrev & {
  totalPrice: number;
  floorName: string | undefined;
  renderingsMedia: MediaWithIpadRes[];
  floorplans: IMedia[];
  viewsMedia: MediaWithIpadRes[];
  componentId: string;
  features: {
    exterior: string;
    interior: string;
    den: '' | 'Y' | 'N';
    collections: {
      name: string;
      features: string[];
    }[];
  };
};

export const findUnitModelDen = (unitModel: UnitModel): '' | 'Y' | 'N' => {
  const hasDen = !!unitModel?.sage?.find(
    (sageAttribute) =>
      !!sageAttribute?.customAttributes?.find(
        (customAttribute) =>
          customAttribute?.name?.toUpperCase() === 'DEN' &&
          customAttribute?.value?.toUpperCase().includes('Y')
      )
  );
  if (hasDen === undefined) return '';
  return hasDen ? 'Y' : 'N';
};
export function useUnits() {
  const galleries = useGalleries();

  const propertyId = env.PROPERTY_ID;
  const property = usePropertyStore((state) => state.getProperty(propertyId));
  const prepareFeaturesString = (features: string[]) => {
    return (
      features
        .map((feature) => feature.toUpperCase().trim())
        .join(', ')
        // Replace last comma with AND
        .replace(/,(?=[^,]+$)/gm, ' AND')
    );
  };

  const { units, unitModels } = useMemo(() => {
    let unitModels = {} as Record<
      string,
      UnitModel & {
        floorPlans: string[];
        floorPlansCompare: string[];
        floors?: number;
      }
    >;

    const units: UnitDetails[] =
      property?.components?.flatMap((component) => {
        const unitModelsMap =
          component?.unitModels?.reduce(
            (acc, unitModel) =>
              unitModel?.id
                ? {
                    ...acc,
                    [unitModel.id]: {
                      ...unitModel,
                      floorPlansCompare:
                        [
                          ...(galleries?.floorplansCompare?.[
                            unitModel?.id || ''
                          ] || [])
                        ]
                          .sort(({ name: a = '' }, { name: b = '' }) =>
                            a.localeCompare(b)
                          )
                          .map((f) => resolveMedia(f.image)) || [],
                      floorPlans:
                        [
                          ...(galleries?.floorplans?.[unitModel?.id || ''] ||
                            [])
                        ]
                          .sort(({ name: a = '' }, { name: b = '' }) =>
                            a.localeCompare(b)
                          )
                          .map((f) => resolveMedia(f.image)) || []
                    }
                  }
                : acc,
            {}
          ) || ({} as Record<string, UnitModel>);
        unitModels = {
          ...unitModels,
          ...unitModelsMap
        };
        return (
          component?.units?.flatMap((unit) => {
            const floors = parseInt(unit?.floor?.name || '1') || 1;

            const unitModel = unitModelsMap[unit?.unitModelId || ''];
            if (unitModel) {
              unitModel.floors = unitModel.floors || floors;
            }

            const floorplans =
              galleries?.floorplans[unit?.id || ''] ||
              galleries?.floorplans[unitModel?.id || ''] ||
              [];
            const keyplans =
              galleries?.keyplans?.[unit?.id || ''] ||
              galleries?.keyplans?.[unitModel?.id || ''] ||
              [];
            const renderingsMedia =
              galleries?.renderings[unit?.id || ''] ||
              galleries?.renderings[unitModel?.id || ''] ||
              [];
            const viewsMedia =
              galleries?.views[unit?.id || ''] ||
              galleries?.views[unitModel?.id || ''] ||
              [];

            // we only want listings that are 'AVAILABLE', 'HOLD' or 'RESERVED'
            if (
              ![
                SalesStatusType.ForSale,
                SalesStatusType.Hold,
                SalesStatusType.Reserved
              ].includes(unit?.salesStatus as SalesStatusType)
            ) {
              return [];
            }

            const keyplan = unit?.floor?.keyPlan;
            const keyplanMinimap = keyplan?.minimap
              ? {
                  svgUrl: keyplan.minimap.svgUrl || '',
                  groups:
                    keyplan.minimap.unitModelGroups?.map((item) => ({
                      groupId: item?.groupId || '',
                      externalIds: (item?.externalIds || []) as string[]
                    })) || []
                }
              : undefined;
            let unitBathrooms = `${unitModel?.bathrooms || 0}`;
            return {
              floorPlanSrc: resolveMedia(floorplans[0]?.image),
              floorplans: floorplans
                .map((f) => ({
                  ...f,
                  image: resolveMedia(f.image),
                  url: resolveMedia(f.image)
                }))
                .filter(Boolean)
                .sort(
                  ({ name: a }, { name: b }) => a?.localeCompare(b || '') || 0
                ),
              id: unit?.id || '',
              totalPrice:
                (unit?.pricingExternal || 0) + (unit?.pricingInternal || 0),
              componentId: component.id || '',
              modelId: unit?.unitModelId || unit?.unitModel?.id || '',
              unitName: unit?.name || '',
              keyplan: keyplans?.[0]?.url || '',
              status: convertApiStatusToLabel(unit?.salesStatus || ''),
              externalId: getFeatureCollection(
                'ID',
                unit?.featureCollections || []
              ).join(' / '),
              bedrooms: `${
                (unitModel?.bedrooms || 0) + (unitModel?.halfBedrooms ? 0.5 : 0)
              }`,
              bathrooms: unitModel?.halfBathrooms
                ? (unitBathrooms += ',5'.repeat(unitModel?.halfBathrooms))
                : unitBathrooms,
              views:
                unit?.unitViews?.flatMap((view) => view?.trim() || []) || [],
              interiorSqFt: unitModel?.interiorArea || 0,
              exteriorSqFt: unitModel?.exteriorArea || 0,
              totalSqFt:
                (unitModel?.interiorArea || 0) + (unitModel?.exteriorArea || 0),
              floor: floors,
              floorName: unit?.floor?.name || '',
              floorplanName: unit?.floor?.keyPlan?.name || '',
              features: {
                exterior: prepareFeaturesString(
                  unit?.featureCollections?.find(
                    (it) => it?.name.toLowerCase() === 'exterior'
                  )?.features || []
                ),
                interior: prepareFeaturesString(
                  unit?.featureCollections?.find(
                    (it) => it?.name.toLowerCase() === 'interior'
                  )?.features || []
                ),
                den: unitModel && findUnitModelDen(unitModel),
                collections: []
              },
              keyplanMinimap,
              renderingsMedia,
              viewsMedia
            };
          }) || []
        );
      }) || [];

    return { units, unitModels };
  }, [property, galleries?.[propertyId]]);

  return { units, unitModels };
}

export type UnitModelDetails = ReturnType<
  typeof useUnits
>['unitModels'][number];

export const getUnitModelCompareFloorplan = (
  unitModel: UnitModelDetails,
  isFullscreen: boolean = false
) => {
  if (unitModel.floorPlans.length > 1 && !isFullscreen)
    return unitModel.floorPlans[1];
  return unitModel.floorPlans[0];
};
