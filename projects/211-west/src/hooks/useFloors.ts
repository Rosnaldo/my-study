import { useMemo } from 'react';
import { env } from '~/helpers/env';
import { usePropertyStore } from '~/store/property';

// HOOK

export function useFloors() {
  const property = usePropertyStore((state) =>
    state.getProperty(env.PROPERTY_ID)
  );
  const floors = useMemo(
    () =>
      (property?.components || []).flatMap((component) =>
        (component?.units || [])
          .reduce((acc, unit) => {
            if (acc.find((floor) => floor.id === unit?.floor?.id)) {
              return acc;
            }

            const newFloor = {
              id: unit?.floor?.id || '',
              name: parseInt(unit?.floor?.name?.replace(/\D/g, '') || '1'),
              label: unit?.floor?.name || ''
            };
            acc.push(newFloor);
            return acc;
          }, [] as { id: string; name: number; label: string }[])
          .sort((a, b) => a.name - b.name)
      ),
    [property]
  );

  return { floors };
}
