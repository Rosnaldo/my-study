import { Layout } from '~/components/Layout';
import { useSyncedHotspot } from '~/hooks/useHotspots';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  PoweredBy,
  Theme,
  Typography,
  makeStyles
} from '@evolutionv/vysta-ui';
import { env } from '~/helpers/env';
import { Add, Remove, KeyboardArrowDown } from '@material-ui/icons';
import { ExceptCompanion } from '~/components/conditionals';
import { useSearchParams } from 'react-router-dom';
import { PoiModal } from '~/components/poi/PoiModal';
import { HotspotMap } from '~/api';
import { MediaWithIpadRes } from '~/hooks/useGalleries';
import { toAlphabet } from '~/components/v2-poi/helpers/toAlphabet';
import MainPoiMap from '~/components/v2-poi/components/main';
import HotSpot from '~/components/v2-poi/components/hotspot';
import Tooltip from '~/components/v2-poi/components/tooltip';

const useStyles = makeStyles<
  Theme,
  {
    isMobile: boolean;
  }
>((theme) => ({
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    fontFamily: 'Hw Atlantic',
    fontWeight: 200,
    margin: '.5rem 0',
    color: 'white'
  },
  titleCategory: {
    fontSize: '1rem',
    fontFamily: 'GT Ultra',
    fontWeight: 200,
    color: 'white'
  },
  titleHotspot: {
    fontSize: '1.2rem',
    fontFamily: 'Garamond',
    lineHeight: '80%',
    marginTop: '0.5rem',
    color: 'white',
    transform: 'translateY(10%)'
  },

  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    maxWidth: 'max-content',
    scroll: 'auto',
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    zIndex: 3,

    '& .MuiAccordionSummary-root': {
      paddingLeft: '1rem'
    }
  },

  drawerContent: {
    maxHeight: '90vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
    scrollbarGutter: 'stable',

    '& .MuiAccordionSummary-root': {
      fontWeight: 600,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.background.paper,
      minHeight: 'unset',
      paddingLeft: '1rem'
    },

    '& .MuiAccordionDetails-root': {
      color: theme.palette.common.white,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: theme.palette.background.paper,
      margin: '1rem 0'
    },

    '& .MuiAccordion-root.Mui-expanded:before': {
      opacity: 1
    },

    '& .MuiAccordion-root:before': {
      backgroundColor: theme.palette.common.white,
      height: '0.5px'
    },

    '& .MuiAccordion-root': {
      margin: '0 !important',
      boxShadow: 'none'
    }
  },
  hotspot: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    paddingLeft: '2rem',
    '&:not(:first-child)': {
      paddingTop: '1rem'
    },

    '& .MuiTypography-root': {
      margin: 0
    }
  },

  menuAccordion: {
    '& .MuiAccordionDetails-root': {
      maxHeight: '35rem',
      padding: 0,
      border: 'none'
    },
    '& .MuiAccordionSummary-root': {
      minHeight: 0,

      '& .MuiAccordionSummary-content': {
        margin: '.5rem'
      },

      '& .MuiIconButton-root': {
        padding: '.7rem'
      }
    }
  },
  poweredBy: {
    right: 0,
    left: 'unset'
  },
  available: {
    position: 'relative',
    width: '1.4rem',
    height: '1.4rem',
    padding: '.3rem',
    borderRadius: '100%',
    border: '1px solid white',
    color: 'white',
    '& .MuiTypography-root': {
      position: 'absolute',
      top: '50%',
      right: '50%',
      transform: 'translate(50%,-45%)',
      color: 'white'
    }
  }
}));

type Props = { media: MediaWithIpadRes[] };

const Neighborhood: React.FC<Props> = ({ media }) => {
  const {
    pois,
    isAccordionExpanded,
    toogleTooltip,
    openTooltips,
    toggleDrawer,
    map,
    closeTooltips,
    modal,
    setModal,
    setTooltip
  } = useSyncedHotspot({
    name: 'Neighborhood'
  });

  const poisEntry = Object.entries(pois || {});
  const isMobile =
    window.innerWidth / window.innerHeight < 1 && window.innerWidth < 768;

  const [openMenu, setOpenMenu] = useState(!isMobile);

  const classes = useStyles({
    isMobile
  });

  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (openTooltips?.length) {
      const selectedTooltip = openTooltips[0];
      const tooltipName = selectedTooltip.split('-')[1];
      const urlString = encodeURI(tooltipName);
      setSearchParams({ ref: urlString });
    }
  }, [openTooltips]);

  return (
    <Layout>
      <PoiModal
        open={modal.open}
        area={modal.area}
        onClose={() =>
          setModal({ open: false, area: {} as HotspotMap, mediaSrc: '' })
        }
        mediaSrc={modal.mediaSrc}
      />
      <MainPoiMap
        Tooltip={Tooltip}
        HotSpot={HotSpot}
        map={map}
        url={media[0].url}
        openTooltips={openTooltips}
        onImageClick={() => closeTooltips()}
        onHotspotClick={(area) => toogleTooltip(area.id)}
        onHotspotClose={(area) => setTooltip(area.id, false)}
      />

      <ExceptCompanion>
        <Box className={classes.drawer}>
          <Accordion
            elevation={0}
            expanded={openMenu}
            onChange={() => setOpenMenu(!openMenu)}
            className={classes.menuAccordion}
          >
            <AccordionSummary
              style={{
                ...(openMenu ? { borderBottom: '1px solid white' } : {})
              }}
              expandIcon={
                openMenu ? (
                  <KeyboardArrowDown
                    color="inherit"
                    style={{ color: 'white', fontSize: '2.5rem' }}
                  />
                ) : (
                  <KeyboardArrowDown
                    color="inherit"
                    style={{ color: 'white', fontSize: '2.5rem' }}
                  />
                )
              }
            >
              <p className={classes.title}>POINTS OF INTEREST</p>
            </AccordionSummary>
            <AccordionDetails className="details">
              <Box className={classes.drawerContent}>
                {pois &&
                  poisEntry.map(([category, hotspots]) => (
                    <Accordion
                      key={category}
                      title={category}
                      onChange={() => toggleDrawer(category)}
                      style={{ width: '100%' }}
                      expanded={isAccordionExpanded[category]}
                    >
                      <AccordionSummary
                        expandIcon={
                          isAccordionExpanded[category] ? (
                            <Remove
                              color="inherit"
                              style={{ color: 'white' }}
                            />
                          ) : (
                            <Add color="inherit" style={{ color: 'white' }} />
                          )
                        }
                      >
                        <Typography className={classes.titleCategory}>
                          {category.toUpperCase()}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box>
                          {hotspots.map((hotspot, hIndex) => (
                            <Box
                              className={classes.hotspot}
                              key={hotspot.name}
                              onClick={() =>
                                toogleTooltip(
                                  `${hotspot.category}-${hotspot.name}`
                                )
                              }
                            >
                              <Box className={classes.available}>
                                <Typography>
                                  {toAlphabet(hIndex % 26)}
                                </Typography>
                              </Box>
                              <Typography className={classes.titleHotspot}>
                                {hotspot.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </ExceptCompanion>
      {env.IS_IFRAME && (
        <PoweredBy className={classes.poweredBy} useAppFont={true} />
      )}
    </Layout>
  );
};

export default Neighborhood;
