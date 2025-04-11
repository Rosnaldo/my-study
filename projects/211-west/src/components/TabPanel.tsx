import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

interface TabPanelProps {
  children?: React.ReactNode;
  className?: string;
  index: number;
  value: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60%',
    width: '80%',
    border: `3px solid ${theme.palette.background.default}`
  }
}));

export default function TabPanel({
  children,
  value,
  index,
  className = ''
}: TabPanelProps) {
  const classes = useStyles();

  return (
    <div
      className={clsx('Sage-Tab-Panel-root', classes.root, className)}
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
