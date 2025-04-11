import { Box, makeStyles } from '@material-ui/core';
import { Stars, parseTags } from '.';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',

    '&.hasBackgroundColor': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: '0.2em solid white',
      padding: '0.5em'
    }
  },
  image: {
    width: '75%',
    height: '100%',
    objectFit: 'contain'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '25%',
    height: '100%',
    overflow: 'auto',
    padding: '1.8em',
    borderLeft: '0.2em solid white',

    '& span, h1': { color: 'white' },

    '& > h1': {
      lineHeight: '1em',
      marginBottom: 0
    },

    '& > *:nth-child(2)': {
      marginBottom: '1em'
    },

    '& > *:nth-child(3)': {
      fontSize: '1.3em',
      marginBottom: '0.5em'
    },

    '& > *:nth-child(4)': {
      fontSize: '0.9em',
      margin: 0
    },

    '& > *:nth-child(5)': {
      fontSize: '0.9em',
      marginBottom: '1.5em'
    },

    '& > *:last-child': {
      fontSize: '1.1em',
      minHeight: '10em'
    }
  }
}));

const HotspotModalView: React.FC<
  {
    mediaSrc: string;
    areaName: string;
    description?: string;
    withBackgroundImage?: boolean;
  } & ReturnType<typeof parseTags>
> = ({
  mediaSrc,
  areaName,
  type,
  distance,
  stars,
  time,
  description,
  withBackgroundImage = false
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.container, {
        hasBackgroundColor: !withBackgroundImage
      })}
    >
      <img src={mediaSrc} alt={areaName} className={classes.image} />

      <Box className={classes.infoContainer}>
        <h1>{areaName}</h1>
        <span>{type}</span>

        <span>{distance}</span>
        <span>{time}</span>
        <span>{description}</span>
      </Box>
    </Box>
  );
};

export default HotspotModalView;
