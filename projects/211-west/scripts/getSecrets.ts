import * as AWS from 'aws-sdk';
import * as fs from 'fs';

import { getSecrets } from '../../../../scripts/getSecrets';

getSecrets({
  AWS,
  fs
});
