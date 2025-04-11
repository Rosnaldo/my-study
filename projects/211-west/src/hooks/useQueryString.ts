import { SetStateAction, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function useQueryString<T>(defaultValue: T) {
  const location = useLocation();
  const navigate = useNavigate();

  const value: T = useMemo(
    () => parseQueryString(location.search),
    [location.search]
  );
  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      const newValue =
        value instanceof Function
          ? value(parseQueryString(location.search))
          : value;
      return navigate({
        search: new URLSearchParams(
          newValue as unknown as Record<string, string>
        ).toString()
      });
    },
    [location.search]
  );

  useEffect(() => {
    navigate(
      {
        search: new URLSearchParams(
          Object.assign(
            defaultValue as Record<string, unknown>,
            parseQueryString(location.search)
          ) as unknown as Record<string, string>
        ).toString()
      },
      { replace: true }
    );
  }, []);

  const context = useMemo(
    () => [value, setValue] as [T, typeof setValue],
    [value, setValue]
  );

  return context;
}

function parseQueryString<T>(queryString: string) {
  return Array.from(
    new URLSearchParams(queryString.substring(1)).entries()
  ).reduce(
    (obj, [key, value]) => ({ ...obj, [key]: value }),
    {}
  ) as unknown as T;
}
