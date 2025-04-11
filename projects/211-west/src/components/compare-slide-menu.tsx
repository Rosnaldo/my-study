import {
  Box,
  Button,
  ButtonBase,
  lighten,
  makeStyles
} from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/PlayArrow';
import clsx from 'clsx';
import { useCallback, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { CompareContext } from '~/contexts/compare';
import { transition } from '~/helpers/style';
import { useFilteredUnits } from '~/hooks/useFilteredUnits';
import { SlidingMenu } from '~/components/sliding-menu';
import { useUnits } from '~/hooks/useUnits';
import { fullUnitSort } from '~/helpers/unitSorter';

const useStyles = makeStyles((theme) => {
  const toggleUnitListBottomOffset = '16.5vh';
  const toggleUnitListButtonWidth = '4rem';
  const toggleUnitListButtonHeight = '27vh';
  const toggleUnitListCompareOptionsHeight = '4rem';

  return {
    root: {
      height: '100%',
      width: '100vw',
      position: 'relative',
      pointerEvents: 'none',
      '&>*': {
        pointerEvents: 'all'
      }
    },
    arrowIcon: {
      color: theme.palette.background.paper
    },
    listContentContainer: ({ primaryColor, secondaryColor }: StyleProps) => ({
      height: toggleUnitListButtonHeight,
      width: '100%',
      minWidth: '30vw',
      position: 'absolute',
      left: 0,
      bottom: toggleUnitListBottomOffset,
      fontSize: theme.typography.fontSize,
      background: 'white',
      color: primaryColor ?? theme.palette.background.default,
      maxWidth: 'fit-content'
    }),
    unitListContainer: ({ primaryColor }: StyleProps) => ({
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      maxHeight: `calc(100% - ${toggleUnitListCompareOptionsHeight})`,
      padding: `0.5rem`,
      paddingLeft: `calc(${toggleUnitListButtonWidth} + 0.5rem)`,
      overflow: 'auto',
      maxWidth: 'fit-content',

      '& .MuiButton-outlined': {
        padding: '1rem 2rem',
        border: `solid 1px ${theme.palette.background.paper}`,
        color: theme.palette.background.paper
      },
      '& .MuiButton-contained': {
        padding: '1rem 2rem',
        background: theme.palette.background.paper,
        color: 'white'
      },

      '& .MuiButton-root': {
        boxShadow: 'none',
        margin: '0.5rem',
        height: '3rem'
      },

      '& .text-overflow > span': {
        inlineSize: '100%',
        whiteSpace: 'nowrap'
      }
    }),
    toggleListButton: ({ primaryColor, secondaryColor }: StyleProps) => ({
      position: 'fixed',
      left: 0,
      zIndex: theme.zIndex.drawer + 101,
      bottom: toggleUnitListBottomOffset,
      height: toggleUnitListButtonHeight,
      width: toggleUnitListButtonWidth,
      fontSize: theme.typography.fontSize,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRight: `2px solid ${theme.palette.background.paper}`,
      background: 'white',

      '& .MuiSvgIcon-root': {
        width: '2em',
        height: '2em',
        transition: transition('transform')
      },
      '&.open .MuiSvgIcon-root': {
        transform: 'rotate(180deg)'
      }
    }),
    compareOptionsContainer: ({ secondaryColor }: StyleProps) => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: `0 calc(${toggleUnitListButtonWidth} + 1rem)`,
      height: toggleUnitListCompareOptionsHeight,
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'row nowrap',
      gap: '1rem',

      '& .MuiButton-contained': {
        boxShadow: 'none',
        padding: '0.8rem 2rem',
        color: '#fff',
        backgroundColor: theme.palette.background.paper,
        border: 'none'
      }
    })
  };
});

type StyleProps = {
  /**
   * Arrow icon and buttons
   */
  primaryColor?: string;

  /**
   * Background
   */
  secondaryColor?: string;
};

type Props = {} & StyleProps;

const CompareSlideMenu: React.FC<Props> = ({
  primaryColor = '##001E60',
  secondaryColor = '#F2EEE8'
}) => {
  const { state, handlers } = useContext(CompareContext);
  const classes = useStyles({ primaryColor, secondaryColor });
  const navigate = useNavigate();
  const [open, setOpen] = useState(!!state.selected.length);
  const [{ visibleUnits }] = useFilteredUnits();
  const { unitModels } = useUnits();

  const unitsToRender = useMemo(() => {
    return fullUnitSort(visibleUnits).map((unit) => ({
      ...unitModels[unit.modelId],
      ...unit
    }));
  }, [visibleUnits, unitModels]);

  const handleCompare = useCallback(() => {
    if (state.selected.length >= 2) {
      navigate(`/compare/view`);
    }
  }, [state.selected]);
  return (
    <SlidingMenu
      open={open}
      toggleButton={
        <ButtonBase
          onClick={() => setOpen(!open)}
          className={clsx(classes.toggleListButton, 'SageControl', {
            open
          })}
        >
          <ArrowIcon className={classes.arrowIcon} />
        </ButtonBase>
      }
    >
      <Box className={classes.root}>
        <Box className={classes.listContentContainer}>
          <Box className={classes.unitListContainer}>
            {unitsToRender.map((unit) => (
              <Button
                variant={
                  state.selected.includes(unit.id || '')
                    ? 'contained'
                    : 'outlined'
                }
                color="inherit"
                className="text-overflow"
                onClick={() => handlers.toggleUnit(unit.id || '')}
                key={unit.id}
              >
                {unit?.unitName}
              </Button>
            ))}
          </Box>
          <Box className={classes.compareOptionsContainer}>
            <Button
              variant="contained"
              onClick={handleCompare}
              disabled={state.selected.length < 2}
            >
              Compare
            </Button>
            <Button variant="contained" onClick={handlers.reset}>
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </SlidingMenu>
  );
};

export default CompareSlideMenu;
