import { Box, Typography, makeStyles } from '@material-ui/core';
import Page, { Props as PageProps } from '~/components/page';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { env } from '~/helpers/env';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: env.IS_COMPANION ? 'center' : 'flex-start',
    alignItems: 'center',
    position: 'relative'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2rem',
    gap: '2rem',
    cursor: 'pointer',

    '& .MuiTypography-root': {
      color: theme.palette.background.paper,
      fontWeight: 600
    },
    '& .MuiTypography-root:first-child': {
      textUnderlineOffset: '0.7rem',
      textDecoration: 'underline',
      textDecorationThickness: '0.25rem'
    }
  }
}));

type Props = {
  children: React.ReactNode;
  className?: string;
  pagePropsOverride?: Partial<PageProps>;
};

export const ResidencePageTemplate = ({
  children,
  className = '',
  pagePropsOverride = {}
}: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    return navigate(-1);
  }, []);

  return (
    <Page
      title="BACK"
      onClickTitle={handleBack}
      classNameChildrenContent={className}
      nextPage={
        <Box className={classes.buttons}>
          <Typography>UNIT LIST</Typography>
          <Typography onClick={() => navigate('/compare')}>COMPARE</Typography>
          <Typography>LIGHTING</Typography>
        </Box>
      }
      {...pagePropsOverride}
    >
      <Box className={classes.root}>{children}</Box>
    </Page>
  );
};
