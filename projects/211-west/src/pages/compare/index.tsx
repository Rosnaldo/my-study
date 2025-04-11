import { Box, makeStyles, Theme } from '@material-ui/core';
import { env } from '~/helpers/env';
import CompareSlideMenu from '~/components/compare-slide-menu';
import { Spacer } from '~/components/Spacer';
import { useUnits } from '~/hooks/useUnits';
import { useContext, useMemo } from 'react';
import { CompareContext } from '~/contexts/compare';
import clsx from 'clsx';
import Floorplans from './unit-floorplans';
import { palette } from '~/providers/theme';
import Menu from '~/components/menu';
import { ExceptCompanion } from '~/components/conditionals';
import { ResidenceFilters } from '~/components/residences/filters';
import { Sidebar } from '~/components/residences/sidebar';
import backgroundImage from '~/assets/logo-background.svg';

const useStyles = makeStyles<Theme>((theme) => ({
  unitFloorplanContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '5em',
    gap: '1em',

    '& .MuiDivider-root': {
      ...(env.IS_COMPANION
        ? {
            width: '0.3em'
          }
        : {
            width: '0.2em'
          })
    }
  },
  unitFloorplan: {
    maxWidth: '50%',
    flex: '1 1 30%',

    '& .MuiTypography-root': {
      width: '100%',
      textAlign: 'center',
      fontSize: '2.5em',
      fontWeight: 600
    },

    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'top'
    },
    '&:first-child': {
      flexBasis: '40%'
    },
    '&:nth-child(2)': {
      flexBasis: '40%'
    }
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: 500,
    height: 'auto',
    opacity: 0.35
  },
  compareView: {
    height: '74vh',
    width: '76vw',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '76vw 65vh',
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat'
  },
  compareViewCompanion: {
    backgroundColor: palette.floor,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '76vw 65vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw'
  },
  pageTemplate: {
    width: '100%',
    height: '100%',
    backgroundColor: palette.floor
  },
  compareViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  compareFooter: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  residenceFilters: {
    width: '100%'
  },
  sidebar: {
    margin: '3rem'
  }
}));

const Compare = () => {
  const classes = useStyles();

  const { units, unitModels } = useUnits();
  const { state } = useContext(CompareContext);

  const unitsToRender = units
    .filter((u) => state.selected.includes(u.id))
    .map((unit) => ({
      ...unitModels[unit.modelId],
      ...unit
    }));

  if (env.IS_COMPANION)
    return (
      <CompareView
        unitsToRender={unitsToRender}
        className={classes.compareViewCompanion}
      />
    );

  return (
    <ExceptCompanion>
      <Box
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: palette.floor
        }}
      >
        <CompareSlideMenu primaryColor="#14142A" secondaryColor="#EAEAEB" />
        <Box className={classes.compareViewContainer}>
          <Box className={classes.sidebar}>
            <Sidebar />
          </Box>
          <CompareView
            unitsToRender={unitsToRender}
            className={classes.compareView}
          />
        </Box>
        <Box className={classes.compareFooter}>
          <Menu />
        </Box>
      </Box>
    </ExceptCompanion>
  );
};

export default Compare;

const useCompareViewStyles = makeStyles(() => ({
  unitFloorplan: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: palette.floor,
    width: '100%',
    height: '100%'
  },

  unitFloorplanContainer: {
    background: palette.floor,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1em',
    padding: '1em',
    alignItems: 'center',
    zIndex: 2
  }
}));

const CompareView = ({
  unitsToRender,
  className
}: {
  unitsToRender: any[];
  className?: string;
}) => {
  const classes = useCompareViewStyles();

  const content = useMemo(() => {
    if (!unitsToRender?.length) return <Spacer height="1em" width="1em" />;

    if (unitsToRender.length === 1)
      return (
        <Box className={classes.unitFloorplan}>
          <Floorplans
            key={unitsToRender[0].id}
            floorplans={unitsToRender[0].floorPlans}
            id={unitsToRender[0].id!}
          />
        </Box>
      );

    return (
      <Box className={classes.unitFloorplanContainer}>
        {unitsToRender.map((unit) => (
          <Floorplans
            key={unit.id}
            floorplans={unit.floorPlans}
            id={unit.id!}
          />
        ))}
      </Box>
    );
  }, [unitsToRender]);

  return <Box className={clsx(className)}>{content}</Box>;
};
