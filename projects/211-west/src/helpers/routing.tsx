import { RouteBinding } from '@evolutionv/companion-devices-react';
import { ReactNode } from 'react';
import { matchPath } from 'react-router';
import { Page } from '~/api';
import { NotFoundPage } from '~/pages/not-found';

export function checkCompanionRouting() {
  const routeMatches =
    matchPath(`/companion/:screenId`, window.location.pathname) ||
    matchPath(`/companion`, window.location.pathname);

  return { isCompanion: !!routeMatches, params: routeMatches?.params };
}

export function checkComponentRouting() {
  const routeMatches = matchPath(`/component`, window.location.pathname);

  return { isComponent: !!routeMatches };
}

export function checkCustomerRouting() {
  const routeMatches = matchPath(`/customer`, window.location.pathname);

  return { isCustomer: !!routeMatches };
}

export function bindPages(
  appPages: Page[],
  binding: { [path: string]: ReactNode },
  allowUnbound: boolean = false
): RouteBinding[] {
  const routes: RouteBinding[] = appPages.map((page) => {
    return {
      path: page.path,
      element: binding[page.path] || <NotFoundPage />
    };
  });

  const unboundPages = Object.entries(binding).reduce(
    (unboundPages, [path, element]) => {
      if (!appPages.find((page) => page.path === path)) {
        return [
          ...unboundPages,
          {
            path,
            element
          }
        ];
      }
      return unboundPages;
    },
    [] as RouteBinding[]
  );

  if (unboundPages.length) {
    console.error('Seems like there are more bindings than pages.');
  }

  if (allowUnbound) {
    routes.push(...unboundPages);
  }

  return routes;
}
