import { Box, makeStyles } from '@material-ui/core';
import { Table } from './table';
import { ResidencePageTemplate } from '~/components/residences/page-template';
import { ResidenceFilters } from '~/components/residences/filters';
import { ExceptCompanion } from '~/components/conditionals';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    height: '100%'
  }
}));

const Residences = () => {
  const classes = useStyles();

  return (
    <ResidencePageTemplate>
      <Table className={classes.table} />
      <ExceptCompanion>
        <Box style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <ResidenceFilters />
        </Box>
      </ExceptCompanion>
    </ResidencePageTemplate>
  );
};

export default Residences;
