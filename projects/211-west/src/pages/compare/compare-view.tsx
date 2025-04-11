import {
  alpha,
  Box,
  Grid,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { useContext, useMemo } from 'react';
import { CompareContext } from '~/contexts/compare';
import { useSyncedState } from '~/hooks/useSyncedState';
import { useUnits } from '~/hooks/useUnits';
import TopNavigation from '~/components/top-navigation';
import { env } from '~/helpers/env';
import { Maybe } from '~/api';
import Formatter from '~/helpers/formatter';
import clsx from 'clsx';
import Floorplans from './unit-floorplans';
import { palette } from '~/providers/theme';
import { useQueryString } from '~/hooks/useQueryString';
import { ExceptCompanion } from '~/components/conditionals';
import CloseIcon from '~/components/icons/close';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  floorplansContainer: {
    display: 'flex',
    height: '100%',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '1em',
    gap: '1em',
    textAlign: 'center',
    background: palette.floor,

    '& p': {
      fontSize: '1.25em'
    }
  },
  floorplan: {
    height: '100%',
    width: '100%',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain'
    }
  },
  infoContainer: {
    width: '100%',
    height: '24vh',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    borderTop: '1px solid black',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 1fr',
    gridTemplateRows: 'repeat(4, auto)',

    '& > .MuiBox-root:nth-child(1)': {
      '& .MuiTypography-root': {
        fontSize: '1.3rem',
        fontFamily: 'Hw Atlantic',
        fontWeight: 300,
        color: 'white'
      }
    },
    '& > .MuiBox-root:nth-child(2), & > .MuiBox-root:nth-child(3)': {
      '& .MuiTypography-root': {
        fontSize: '1.3rem',
        fontFamily: 'Hw Atlantic',
        fontWeight: 300,
        color: 'white'
      }
    },
    '& > .MuiBox-root:nth-child(13), & > .MuiBox-root:nth-child(14), & > .MuiBox-root:nth-child(15)':
      {
        border: 'none'
      }
  },
  item: {
    width: '100%',
    height: '100%',
    borderBottom: '1px solid white',
    display: 'flex',
    alignItems: 'center',
    color: 'white',

    '&:nth-child(3n - 2)': {
      '& .MuiTypography-root': {
        fontWeight: 300,
        fontFamily: 'Hw Atlantic'
      }
    },
    '&:nth-child(3n - 1), &:nth-child(3n)': {
      justifyContent: 'center',
      '& .MuiTypography-root': {
        fontWeight: 300,
        fontFamily: 'Hw Atlantic'
      }
    },

    '& .MuiTypography-root': {
      marginLeft: '2rem',
      fontSize: '1.3rem',
      display: 'inline',
      textAlign: 'center'
    }
  },
  backButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '2.4em 2.0em'
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
    zIndex: 5000,
    width: '3.5rem',
    height: '3.5rem',

    '& .MuiSvgIcon-root': {
      fontSize: '3.5em'
    }
  }
}));

const formatNumber = (number?: Maybe<number>) =>
  Formatter.toNumber(number ?? 0);

const infosToShow: {
  info: React.ReactNode;
  getValue: (unitModel: any) => string;
}[] = [
  {
    info: <Typography style={{ textAlign: 'left' }}>UNIT DETAILS</Typography>,
    getValue: (unitModel) => `UNIT ${unitModel.unitName}`
  },
  {
    info: <Typography style={{ textAlign: 'left' }}>BEDROOMS</Typography>,
    getValue: (unitModel) => formatNumber(unitModel.bedrooms)
  },
  {
    info: <Typography>BATHROOMS</Typography>,
    getValue: (unitModel) => formatNumber(unitModel.bathrooms)
  },
  {
    info: <Typography>INT. SIZE</Typography>,
    getValue: (unitModel) => `${formatNumber(unitModel.interiorArea)} SQ FT`
  },
  {
    info: <Typography>EXT. SIZE</Typography>,
    getValue: (unitModel) => `${formatNumber(unitModel.exteriorArea)} SQ FT`
  }
];

const CompareView = () => {
  const { state } = useContext(CompareContext);
  const { unitModels, units } = useUnits();
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedFloorplan, setSelectedFloorplan] = useSyncedState<
    string | null
  >('compare-view-selected-floorplan', null);
  const updateFullScreenUnit = (unitId: string) => {
    setSelectedFloorplan(unitId);
  };

  const comparedUnitModels = units
    .filter((u) => state.selected.includes(u.id))
    .map((unit) => ({
      ...unitModels[unit.modelId],
      ...unit
    }));

  useQueryString({ comparing: comparedUnitModels.map((t) => t.id).join(',') });

  return (
    <Box className={classes.root}>
      <ExceptCompanion>
        <Box
          className={classes.closeButton}
          onClick={() => {
            if (selectedFloorplan) {
              setSelectedFloorplan(null);
              return;
            }
            navigate('/compare');
          }}
        >
          <CloseIcon xcolor={palette.paper} />
        </Box>
      </ExceptCompanion>

      <Box className={classes.floorplansContainer}>
        {comparedUnitModels.map((unitModel) => (
          <Box
            key={unitModel.id || ''}
            className={classes.floorplan}
            onClick={() => updateFullScreenUnit(unitModel.id || '')}
          >
            <Floorplans
              id={unitModel.id!}
              floorplans={unitModel.floorPlans}
              isFullscreen={selectedFloorplan === unitModel.id}
              onCloseFullscreen={() => setSelectedFloorplan(null)}
            />
          </Box>
        ))}
      </Box>
      {selectedFloorplan === null && (
        <Box className={classes.infoContainer}>
          {infosToShow.map(({ info, getValue }, i) => {
            const [value1, value2] = comparedUnitModels.map(getValue);
            return (
              <>
                <Box className={clsx(classes.item)}>{info}</Box>
                <Box className={classes.item}>
                  <Typography>{value1}</Typography>
                </Box>
                <Box className={classes.item}>
                  <Typography>{value2}</Typography>
                </Box>
              </>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CompareView;
