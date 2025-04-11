import { Navigate, Route, RouteProps, Routes } from 'react-router';
import { env } from '~/helpers/env';
import { useCache } from '~/hooks/useCache';
import { CacheKeys } from '~/hooks/useCache/keys';
import Galleries from '~/pages/galleries';
import GalleriesView from '~/pages/galleries/view';
import Login from '~/pages/login';
import Neighborhood from '~/pages/neighborhood';
import SplashScreenPage from '~/pages/splash-screen';
import Home from '~/pages/home';
import Devices from '~/pages/devices';
import Residences from '~/pages/residences';
import { RoutesSync } from '~/components/routes-sync';
import { useContentLoadStore } from '~/store/content-load';
import UnitDetails from '~/pages/residences/unit-details';
import Compare from '~/pages/compare';
import CompareView from '~/pages/compare/compare-view';
import HotspotView from '~/pages/neighborhood/view';
import NeighborhoodgalleryPage from '~/pages/neighborhood/gallery';
import ViewAll from '~/pages/galleries/view-all';
import FilmsPage from '~/pages/films';
import ViewsPage from '~/pages/views';
import NaftaliGroupPage from '~/pages/naftali-group';

const AUTHENTICATED_ROUTES: RouteProps[] = [
  { path: '/home', index: true, element: <Home /> },
  { path: '/residences', element: <Residences /> },
  { path: '/residences/:unitId', element: <UnitDetails /> },
  { path: '/compare', element: <Compare /> },
  { path: '/compare/view', element: <CompareView /> },
  { path: '/devices', element: <Devices /> },
  { path: '/neighborhood', element: <Neighborhood /> },
  { path: '/neighborhood/poi', element: <HotspotView /> },
  { path: '/neighborhood/gallery', element: <NeighborhoodgalleryPage /> },
  { path: '/views', element: <ViewsPage /> },
  { path: '/films', element: <FilmsPage /> },
  { path: '/naftali-group', element: <NaftaliGroupPage /> },
  { path: '/gallery', element: <Galleries /> },
  { path: '/gallery/view-all', element: <ViewAll /> },
  { path: '/gallery/:gallery', element: <GalleriesView /> },
  { path: '*', element: <Navigate to="/home" /> }
];

const UNAUTHENTICATED_ROUTES: RouteProps[] = [
  { path: '/login', index: true, element: <Login /> },
  { path: '*', element: <Navigate to="/login" /> }
];

const AppRoutes: React.FC = () => {
  const { loading } = useContentLoadStore();
  const [accessToken] = useCache(CacheKeys.ACCESS_TOKEN);

  const isLoggedIn = env.IS_COMPANION || !!accessToken;

  if (!isLoggedIn) {
    return (
      <Routes>
        {UNAUTHENTICATED_ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    );
  }

  if (loading) {
    return (
      <Routes>
        <Route path="*" element={<SplashScreenPage />} />
      </Routes>
    );
  }

  return (
    <>
      <RoutesSync />
      <Routes>
        {AUTHENTICATED_ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
