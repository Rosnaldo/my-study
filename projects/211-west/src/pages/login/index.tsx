import { Box, Button, makeStyles } from '@material-ui/core';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useListAgentsQuery } from '~/api';
import logoWhite from '~/assets/211-west/logo-white.svg';
import { env } from '~/helpers/env';
import { useLogged } from '~/hooks/useLogged';

const useStyles = makeStyles((theme) => ({
  login: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '40%',
    height: 'auto'
  },
  button: {
    marginTop: '10em',
    width: '20%',
    '@media (max-width: 1600px)': {
      width: '40%'
    },
    fontSize: '1em',
    padding: '1.2rem',
    backgroundColor: 'white',
    color: '#001E60',
    border: '1px solid white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
      border: '1px solid white'
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loginAgent, isLoading } = useLogged();
  const { data } = useListAgentsQuery({
    variables: { applicationId: env.APPLICATION_ID },
    fetchPolicy: 'network-only'
  });
  const agents = useMemo(() => data?.listAgents || [], [data]);
  const agent = agents[0];

  return (
    <Box className={classes.login}>
      <img src={logoWhite} className={classes.logo} />
      <Button
        onClick={() => {
          loginAgent({ pin: '1234', userId: agent?.id || '' });
        }}
        className={classes.button}
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
