const { config } = require('dotenv');
const path = require('path');
const { version } = require('../package.json');
config({ path: path.resolve(process.cwd(), '.env.local') });

module.exports = {
  DEBUG: process.env.DEBUG === undefined ? 'false' : process.env.DEBUG,
  SAGE_API_URL: undefined,
  MEDIA_DOMAIN: undefined,
  MEDIA_GRAPHQL_API: undefined,
  MEDIA_GRAPHQL_API_KEY: undefined,
  ANALYTICS_API_URL: undefined,
  COMPANION_TOKEN: process.env.AUTHORIZED_COMPANION_TOKEN || null,
  CUSTOMER_TOKEN: process.env.AUTHORIZED_CUSTOMER_TOKEN || null,
  COUNTRIES_LIST_URL: process.env.COUNTRIES_LIST_URL || null,
  APPLICATION_ID: '134c8bad-e2fd-4b77-bd99-8bf70c1a47d2',
  PROPERTY_ID: 'c722645f-fe60-4f41-88c0-be0155d2fc7f',
  APP_VERSION: version || null
};
