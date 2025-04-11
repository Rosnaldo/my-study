import { Box, Divider, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { PropsWithChildren, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Logo from '~/assets/211-west/logo-blue.svg';
import { env } from '~/helpers/env';
import {
  getApplicationAssetsGallery,
  useGalleries
} from '~/hooks/useGalleries';
import MainMenu from './main-menu';
import Splash from './splash';
import Menu from './menu';
import { ExceptCompanion } from './conditionals';
import ArrowLeftIcon from '~/components/icons/arrow-left';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.common.white
  },
  divider: {
    width: '100%',
    height: '0.1em',
    background: '#E5E4E2'
  },
  headerBack: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '1rem',
    cursor: 'pointer',

    '& .MuiSvgIcon-root': {
      color: theme.palette.background.paper,
      fontSize: '2rem'
    },

    '& .MuiTypography-root': {
      marginTop: '0.2rem',
      fontWeight: 400,
      letterSpacing: '0.15em',
      fontSize: '1.8rem',
      color: theme.palette.background.paper
    }
  },
  headerNext: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  headerContainer: {
    width: '100%',
    height: 'fit-content',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    padding: '1rem'
  },
  footerContainer: {
    width: '100%',
    height: 'fit-content'
  },
  logo: {
    '& > img': {
      height: '5vh',
      transform: 'translateY(10%)'
    },
    cursor: 'pointer'
  },
  onlyBackground: {
    backgroundImage: ({ homeImage }: { homeImage?: string }) =>
      `url(${homeImage!})`,
    backgroundSize: '100%',
    backgroundPosition: 'center 70%',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.down(1200)]: {
      backgroundSize: 'cover'
    },

    [theme.breakpoints.down(720)]: {
      backgroundPosition: '40% 100%'
    }
  },
  childrenContent: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  homeMenu: {
    left: '0',
    zIndex: theme.zIndex.drawer + 1
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > img': {
      opacity: 1,
      scale: 0.8
    }
  }
}));

export type Props = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  nextPage?: React.ReactNode;
  exceptCompanion?: boolean;
  onClickTitle?: () => void;
  onClickNext?: () => void;
  showMenus?: boolean;
  classNameChildrenContent?: string;
};

const Page: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
  nextPage,
  exceptCompanion = false,
  onClickTitle,
  onClickNext,
  showMenus = true,
  classNameChildrenContent
}) => {
  const onlyBackground = useMemo(() => env.IS_COMPANION && exceptCompanion, []);
  const galleries = onlyBackground ? useGalleries() : null;
  const classes = useStyles({
    homeImage: onlyBackground
      ? getApplicationAssetsGallery(galleries, 'home')?.url || ''
      : ''
  });
  if (onlyBackground)
    return (
      <>
        <Box
          className={clsx(classes.onlyBackground, classes.backgroundOverlay)}
        >
          <Splash variant="white" />
        </Box>
      </>
    );

  const navigate = useNavigate();

  const logo = useMemo(() => <img src={Logo} />, []);

  const handleClickLogo = () => {
    navigate('/home');
  };

  return (
    <Box className={clsx(classes.root)}>
      <ExceptCompanion>
        <Box className={classes.headerContainer}>
          <Box onClick={onClickTitle} className={classes.headerBack}>
            <ArrowLeftIcon />
            <Box>
              <Typography>{title}</Typography>
            </Box>
          </Box>
          <Box className={classes.logo} onClick={handleClickLogo}>
            {logo}
          </Box>
          <Box className={classes.headerNext} onClick={onClickNext}>
            {nextPage}
          </Box>
        </Box>
        <Divider className={classes.divider} />
      </ExceptCompanion>
      <Box className={clsx(classes.childrenContent, classNameChildrenContent)}>
        {children}
      </Box>
      <ExceptCompanion>
        <Box className={classes.footerContainer}>
          <Menu />
        </Box>
      </ExceptCompanion>
    </Box>
  );
};

export default Page;
