import KeyPlanSVG from '@evolutionv/vysta-ui/.build/v2/components/KeyPlanSvg';
import { Box, Button, Typography, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { env } from '~/helpers/env';
import { useSyncedState } from '~/hooks/useSyncedState';
import Formatter from '~/helpers/formatter';
import {
  UnitModelDetails,
  UnitDetails as UnitDetailsType,
  useUnits
} from '~/hooks/useUnits';
import CloseButton from '~/components/close-button';
import Floorplans from '../compare/unit-floorplans';
import { ExceptCompanion } from '~/components/conditionals';
import { palette } from '~/providers/theme';
import { useFloors } from '~/hooks/useFloors';
import { ImageFloorplan } from '~/components/imag-floorplan';
import keyplanPlaceholder from '~/assets/keyplan-placeholder.png';
import Page from '~/components/page';

type StyleProps = {
  sessionClient?: boolean;
};

const useStyles = makeStyles((theme) => ({
  page: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: palette.floor
  },
  floorplanContainer: {
    height: env.IS_COMPANION ? '100%' : 'calc(100% - 10em)',
    backgroundColor: palette.floor,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3em',
    width: '100%',
    position: 'relative',

    '&.fullscreen': {
      height: '100% !important'
    }
  },
  controlContainer: {
    margin: 'auto',
    width: '100%',
    height: '10em',
    background: palette.floor,
    color: '#001E60',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '0 2rem',
    gap: '1.5em',
    zIndex: 2,
    boxSizing: 'border-box'
    // borderTop: `1px solid ${colors.main}`
  },
  controlInfo: {
    padding: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& .MuiBox-root': {
      '& div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& p': {
          margin: 0,
          fontSize: '1rem',
          fontWeight: 300,
          color: '#001E60'
        },
        '& p:last-of-type': {
          fontSize: '1.1rem',
          marginLeft: '1rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          color: '#001E60'
        }
      }
    }
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  controlButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '1rem',
    height: '100%',

    '& .MuiButton-root': {
      padding: '.5em 1.5rem',
      width: '100%'
    }
  },
  childrenContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  buttons: ({ sessionClient }: StyleProps) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(2, 1fr)`,
    gridTemplateRows: `repeat(${sessionClient ? '2' : '1'}, 1fr)`,
    gridGap: '1rem',
    '& > button': {
      border: `1px solid ${theme.palette.background.paper}`,
      color: theme.palette.background.paper,
      background: palette.floor
    },
    '& > button:active, & > button:focus, & > button:hover': {
      background: palette.floor,
      color: theme.palette.background.paper
    }
  }),
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 0,
    zIndex: theme.zIndex.drawer + 200,
    cursor: 'pointer'
  },
  attribute: {
    color: '#001E60',
    display: 'grid',
    gap: '0.5rem 4rem',
    gridTemplateColumns: 'auto 1fr',

    '& .MuiBox-root': {
      '& .MuiTypography-root': {
        whiteSpace: 'nowrap'
      }
    }
  },
  attributeValue: {
    fontWeight: 700
  },
  viewFullScreen: {
    background: theme.palette.common.white,
    color: theme.palette.background.paper,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '.5rem 1rem',
    '& .MuiButton-label': {
      fontSize: '1.3rem'
    },

    '&:active, &:focus, &:hover': {
      background: 'transparent'
    }
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      transform: 'translateY(-10%)'
    },
    '& .MuiTypography-root': {
      marginLeft: '0.5em'
    }
  },
  button: {
    '&:focus': {
      color: 'white',
      fill: 'white'
    },

    '& .MuiTypography-root': {
      fontWeight: 700
    }
  },
  controlImage: {
    color: theme.palette.primary.dark,
    width: '100%',
    position: 'relative',
    height: '100%',

    '& .Sage-Keyplan-floor-controls': {
      display: 'none'
    }
  },
  modal: {
    '& .Sage-share-unit-modal-container': {
      '& .Sage-share-unit-modal-title ': {
        color: theme.palette.background.paper
      },
      background: 'white',
      '& label': {
        color: theme.palette.text.primary
      }
    },

    '& .Sage-share-unit-modal-title': {
      color: theme.palette.text.primary
    },

    '& .Sage-share-preview-client-label': {
      color: theme.palette.text.primary
    },

    '& .Sage-Tab-Panel-root': {
      borderColor: theme.palette.common.black
    },

    '& .Sage-share-unit-modal-tabs': {
      width: '90%',

      '& p': {
        paddingLeft: '0em'
      },

      '& .MuiButtonBase-root': {
        borderColor: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,

        '&.Mui-selected': {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white
        }
      }
    },

    '& .Sage-Form-text-field-root, .Sage-form-select-field-root': {
      backgroundColor: '#EEEEEE',

      '& .MuiInputBase-root': {
        backgroundColor: 'transparent'
      }
    },

    '& .Sage-Client-Form-root': {
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      }
    },

    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.common.black
    },

    '& .SageUnitDetailsTable-container': {
      border: `0.5px solid ${theme.palette.common.black}`,

      '& .SageUnitDetailsTable-header .SageUnitDetailsTable-cell': {
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 700
      },

      '& .SageUnitDetailsTable-body .SageUnitDetailsTable-row': {
        borderColor: theme.palette.background.paper,
        borderWidth: '0.5px',
        color: theme.palette.background.paper,
        backgroundColor: 'white',

        // UNIT CELL
        '& :nth-child(2)': {
          fontWeight: 700
        },

        '& .SageUnitDetailsTable-cell': {
          color: theme.palette.common.black,
          height: '3.5em'
        }
      }
    },

    '& .Sage-Client-units-viewed-footer-root': {
      backgroundColor: theme.palette.common.white
    },

    '& .MuiSvgIcon-root': {
      fill: theme.palette.common.black
    },

    '& .Sage-share-unit-button-container .MuiButtonBase-root': {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    }
  },
  dialog: {
    '& .MuiButton-outlined': {
      color: theme.palette.background.paper,
      borderColor: theme.palette.background.paper
    },

    '& .MuiButton-contained': {
      background: theme.palette.background.paper
    }
  },
  price: {
    display: 'flex',
    gap: '1rem'
  },
  visibleContainer: {
    gap: '1rem',
    padding: '0.5rem',
    marginLeft: '1rem',

    '& .MuiTypography-root': {
      fontFamily: 'GT Ultra',
      fontWeight: 700
    }
  },
  residence: {
    padding: '2rem 2rem',
    width: '25em',

    '& h4': {
      color: '#001E60'
    },
    '& h2': {
      color: '#001E60'
    }
  }
}));

const UnitDetails = () => {
  const classes = useStyles({});
  const { unitId } = useParams();
  const { unitModels, units } = useUnits();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useSyncedState<boolean>(
    'is-unit-details-fullscreen',
    false
  );

  const unitModelId = units.find((unit) => unit.id === unitId)?.modelId;

  const handleBack = useCallback(() => {
    return navigate(-1);
  }, []);

  const { unitModel, floorPlanSrc, unit } = useMemo(() => {
    const unit = units.find((unit) => unit.modelId === unitModelId);
    const unitModel = unitModels[unitModelId || ''];
    return {
      unitModel: { ...unit, ...unitModel },
      floorPlanSrc: unitModel?.floorPlans || [],
      unit
    };
  }, [unitModelId]);

  if (!unitModel) {
    return <Page showMenus={false} />;
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  const [currentIndex, setCurrentIndex] = useSyncedState(
    `${unitModel.id || ''}-index`,
    0
  );

  if (env.IS_COMPANION || isFullscreen) {
    return (
      <Box className={classes.page}>
        <ExceptCompanion>
          <CloseButton
            xcolor={'#000'}
            onClick={() => setIsFullscreen(false)}
            className={classes.closeButton}
          />
        </ExceptCompanion>

        <Box
          className={clsx(classes.floorplanContainer, {
            fullscreen: !env.IS_COMPANION
          })}
        >
          <ImageFloorplan
            fit="contain"
            src={floorPlanSrc[currentIndex] || ''}
            alt="Floorplan"
            thumbnail={floorPlanSrc[currentIndex] || ''}
          />
          {!isFullscreen && (
            <UnitFooter unitModel={unitModel} units={units} unit={unit} />
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Page
      title="BACK"
      onClickTitle={handleBack}
      nextPage={
        <Button className={classes.viewFullScreen}>VIEW FULL SCREEN</Button>
      }
      onClickNext={toggleFullscreen}
      classNameChildrenContent={classes.childrenContent}
      showMenus={false}
    >
      <Box
        className={classes.floorplanContainer}
        onClick={(e) => {
          e.preventDefault();
          toggleFullscreen();
        }}
      >
        <Floorplans
          floorplans={unitModel.floorPlans}
          id={unitModel.id!}
          isFullscreen={isFullscreen}
          setExternalCurrentIndex={setCurrentIndex}
          externalCurrentIndex={currentIndex}
          hideButtons
          isResidence={true}
        />
      </Box>
      <UnitFooter unitModel={unitModel} units={units} unit={unit} />
    </Page>
  );
};

const UnitFooter = ({ unitModel, units, unit }) => {
  const classes = useStyles({});
  const navigate = useNavigate();
  const { floors } = useFloors();

  const keyPlanSvgProps = useMemo(() => {
    if (!unitModel?.keyplanMinimap?.groups?.length) return {};
    const groups = unitModel.keyplanMinimap.groups;

    const selectedGroupId = groups.find(({ externalIds }) =>
      externalIds.includes(unitModel.id!)
    )?.groupId;

    return {
      selectedGroupId,
      groups,
      allIds:
        unitModel.unitName === 'SP' ? groups.map(({ groupId }) => groupId) : []
    };
  }, [unitModel]);

  const handleClickKeyPlanUnit = (groupId?: string) => {
    if (!groupId) return;

    const ids = unitModel.keyplanMinimap?.groups?.find(
      (group) => group.groupId === groupId
    )?.externalIds;

    if (!ids?.length) return;

    const targetUnit = units?.find((currentUnit) => {
      const sameFloor = currentUnit.floor === unitModel.floor;
      const validUnitModel = ids.includes(currentUnit.modelId);
      return sameFloor && validUnitModel;
    });

    if (!targetUnit) return;
    navigate(`/residences/${targetUnit.id}`);
  };

  const floorsWithKeyplans = useMemo(
    () =>
      floors.filter((floor) =>
        units.some(
          (unit) =>
            unit.floorName === floor.label && unit.keyplanMinimap?.svgUrl
        )
      ),
    [floors, units]
  );

  const handleUpdateFloor = useCallback(
    (floorIndex: number) => {
      const targetFloor = floorsWithKeyplans[floorIndex];
      if (!targetFloor) return;

      const ids = unitModel.keyplanMinimap?.groups?.find(
        (group) => group.groupId === keyPlanSvgProps.selectedGroupId
      )?.externalIds;

      const unitsOnFloor = units.filter(
        ({ floorName }) => floorName === targetFloor.label
      );

      const unitWithModel = unitsOnFloor.find(({ modelId }) =>
        ids?.includes(modelId)
      );

      if (unitWithModel) {
        navigate(`/availability/${unitWithModel.id}`);
        return;
      }

      const targetUnit = unitsOnFloor[0];
      if (!targetUnit) return;

      navigate(`/availability/${targetUnit.id}`);
    },
    [units, floorsWithKeyplans, keyPlanSvgProps.selectedGroupId]
  );

  const validUnitModelIds = useMemo(
    () =>
      units
        .filter(({ floor }) => floor === unitModel.floor)
        .map(({ modelId }) => modelId),
    [units, unitModel.floor]
  );

  return (
    <Box className={classes.controlContainer}>
      <Box className={classes.residence}>
        <Typography
          style={{
            textAlign: 'left',
            fontSize: '1rem'
          }}
          variant="h4"
          color="primary"
        >
          RESIDENCE
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            fontWeight: 500,
            fontSize: '4rem',
            width: 'max-content'
          }}
          variant="h2"
          color="primary"
        >
          {unitModel.unitName}
        </Typography>
      </Box>
      <Box className={classes.controlInfo}>
        <Box className={classes.attribute}>
          <Box>
            <Typography>BEDROOMS</Typography>
            <Typography className={classes.attributeValue}>
              {unitModel.bedrooms}
            </Typography>
          </Box>
          <Box>
            <Typography>EXTERIOR SIZE</Typography>
            <Typography className={classes.attributeValue}>
              {`${Formatter.toNumber(unitModel.exteriorSqFt)} SQ. FT.`}
            </Typography>
          </Box>
          <Box>
            <Typography>BATHROOMS</Typography>
            <Typography className={classes.attributeValue}>
              {unit.bathrooms}
            </Typography>
          </Box>
          <Box>
            <Typography>INTERIOR SIZE</Typography>
            <Typography className={classes.attributeValue}>
              {`${Formatter.toNumber(unitModel.interiorSqFt)} SQ. FT.`}
            </Typography>
          </Box>
          <Box></Box>
          <Box>
            <Typography>TOTAL AREA</Typography>
            <Typography className={classes.attributeValue}>
              {`${Formatter.toNumber(
                unitModel.interiorSqFt + unitModel.exteriorSqFt
              )} SQ. FT.`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        style={{
          display: 'flex',
          height: '100%',
          width: '25em',
          padding: '0.5rem 0'
        }}
      >
        <img
          src={unit?.keyplan || ''}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {/* {unitModel.keyplanMinimap?.svgUrl && (
          <Box className={classes.controlImage}>
            <Box
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            >
              <KeyPlanSVG
                colors={{
                  assigned: palette.paper,
                  assignedStroke: palette.paper,
                  hover: palette.paper,
                  selected: palette.paper
                }}
                svgUrl={unitModel.keyplanMinimap?.svgUrl}
                dimensions={{ height: '100%' }}
                groups={keyPlanSvgProps.groups}
                selectedGroupId={
                  unitModel.unitName !== 'SP'
                    ? keyPlanSvgProps.selectedGroupId
                    : keyPlanSvgProps.allIds
                }
                validExternalIds={validUnitModelIds}
                handleClickSvgGroup={handleClickKeyPlanUnit}
                interaction="assigned"
                showFloorControls={!env.IS_COMPANION}
                currentFloor={unitModel?.floor}
                currentFloorIndex={floorsWithKeyplans.findIndex(
                  (floor) => floor.label === unitModel?.floorName
                )}
                floorsCount={floorsWithKeyplans.length}
                onUpdateFloor={handleUpdateFloor}
              />
            </Box>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default UnitDetails;
