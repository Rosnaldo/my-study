import { useEffect, useRef } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';
import { env } from '~/helpers/env';
import { useCompanion } from '~/hooks/useCompanion';
import { useScreenSaver } from '~/hooks/useScreenSaver';

interface RouteResponse {
  pathname: string;
  search: string;
}

const ROUTE_WHITELIST: string[] = [
  '/',
  '/home',
  '/residences',
  '/residences/:unitId',
  '/compare',
  '/compare/view',
  '/gallery',
  '/gallery/:gallery',
  '/neighborhood',
  '/neighborhood/poi',
  '/neighborhood/gallery',
  '/films',
  '/naftali-group',
  '/views'
];

export const RoutesSync = () => {
  const redirectPath = useRef<RouteResponse | null>(null);
  const [{}, { send, on }] = useCompanion();
  const [{}, { hideScreenSaver }] = useScreenSaver();
  const navigate = useNavigate();
  const location = useLocation();

  const locationRef = useRef(location);

  // update location ref, avoids useEffect loops
  useEffect(() => {
    locationRef.current = location;
  }, [location.pathname, location.search]);

  // set initial route on load
  useEffect(() => {
    if (!env.IS_COMPANION) {
      send('route-change', {
        pathname: locationRef.current.pathname,
        search: locationRef.current.search
      });
    }
  }, []);

  useEffect(() => {
    if (!env.IS_COMPANION) {
      send('route-change', {
        pathname: location.pathname,
        search: location.search
      });
    }
  }, [location.pathname, location.search]);

  const checkWhiteList = (input?: string): string | undefined => {
    const pathname = input || '';

    return ROUTE_WHITELIST.map((item) => {
      const match = matchPath(item, pathname);

      if (match !== null && pathname.includes(match.pathname)) {
        return pathname;
      }
    }).find((item) => item !== undefined);
  };

  useEffect(() => {
    if (env.IS_COMPANION && redirectPath.current !== null) {
      const res = checkWhiteList(redirectPath.current.pathname);
      if (res) {
        navigate(
          `${redirectPath.current.pathname}${redirectPath.current.search}`
        );
      } else {
        navigate('/');
      }
    }
  }, []);

  // send page changes to companion app
  useEffect(() => {
    let handleOn;
    if (env.IS_COMPANION) {
      handleOn = on('route-change', (_, data: RouteResponse) => {
        const res = checkWhiteList(data.pathname);
        const composedMessagePath = `${data.pathname}${data.search ?? ''}`;
        const composedCurrentPath = `${locationRef.current.pathname}${locationRef.current.search}`;

        if (res && composedMessagePath !== composedCurrentPath) {
          navigate(composedMessagePath);
          hideScreenSaver();
        }
      });
    }
    return () => {
      handleOn && handleOn();
    };
  }, [checkWhiteList]);

  return null;
};
