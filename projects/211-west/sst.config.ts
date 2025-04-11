import { SSTConfig } from 'sst';
import Stack from './stacks/stack';

export default {
  config(_input) {
    return {
      name: '211-west-react',
      region: 'us-east-1',
      stage: 'dev'
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x'
    });

    app.stack(Stack, { id: '211-west-stack' });
  }
} as SSTConfig;
