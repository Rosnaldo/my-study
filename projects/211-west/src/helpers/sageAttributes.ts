import {
  SageListingAttributes,
  SageUnitAttributes,
  SageUnitModelAttributes,
  UnitFeatureCollection
} from '../api';

export function getSageAttribute(
  name: string,
  sageAttributes: Array<
    SageUnitModelAttributes | SageUnitAttributes | SageListingAttributes | null
  >
): string | null {
  return sageAttributes?.reduce(
    (value, sageAttribute) =>
      value ||
      sageAttribute?.customAttributes?.find(
        (attribute) => attribute?.name === name
      )?.value ||
      null,
    null as string | null
  );
}

export function getFeatureCollection(
  name: string,
  featuerCollection: Array<UnitFeatureCollection | null>
): string[] {
  return featuerCollection.flatMap((coll) =>
    coll?.name === name ? coll?.features || [] : []
  );
}
