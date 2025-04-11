import * as fs from 'fs';
import * as path from 'path';
import { logger } from 'timberwolf';

const CONFIG = require('./templates/config.json');

const run = () => {
  const bundleVersion = new Date().getTime().toString();

  const config = fs.readFileSync(
    path.resolve(__dirname, `./config.xml`),
    'utf-8'
  );

  const xml = config
    .replace(
      'ios-CFBundleVersion="###"',
      `ios-CFBundleVersion="${bundleVersion}"`
    )
    // matches custom config values
    .replace(/\$SAGE_VAR=([a-z0-9]+)\$/gi, (_match, group) => {
      // if a specific value needs to be in a specific format for cordova, transform it here
      switch (group) {
        case 'backgroundColor':
          return (CONFIG[group] || '').replace('#', '0xff');
      }
      return CONFIG[group] || '';
    });

  fs.writeFileSync(path.resolve(__dirname, '../config.xml'), xml);

  if (!fs.existsSync(path.resolve(__dirname, '../www'))) {
    logger.warning({ message: 'no /www directory found, creating it now.' });
    fs.mkdirSync(path.resolve(__dirname, '../www'));
    fs.writeFileSync(path.resolve(__dirname, '../www/keep'), '');
    logger.info({ message: '/www directory successfully created.' });
  }
};

run();
