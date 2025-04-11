import { usePropertyStore } from '~/store/property';
import { env } from '~/helpers/env';
import { Property } from '~/api';

export function useProperty() {
  const property = usePropertyStore((state) =>
    state.getProperty(env.PROPERTY_ID)
  );
  return property as Property;
}
