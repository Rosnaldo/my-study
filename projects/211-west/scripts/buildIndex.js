const fs = require('fs');
const path = require('path');

const getScript = (htmlPart, platform) => {
  try {
    return fs.readFileSync(
      path.resolve(
        __dirname,
        `./templates/${htmlPart}/scripts-${platform}.html`
      ),
      'utf8'
    );
  } catch {
    return '';
  }
};

const COMPANION_PLATFORM = 'companion';

const buildIndex = () => {
  const PLATFORM = process.env.PLATFORM;
  const indexTemplate = fs.readFileSync(
    path.resolve(__dirname, './templates/index.html'),
    'utf8'
  );

  const indexHtml = indexTemplate
    .replace('<!-- PLACEHOLDER:HEAD -->', getScript('head', PLATFORM))
    .replace('<!-- PLACEHOLDER:BODY -->', getScript('body', PLATFORM));

  const htmlFilePath =
    PLATFORM === COMPANION_PLATFORM ? 'app/app.html' : 'public/index.html';

  fs.writeFileSync(
    path.resolve(__dirname, '..', htmlFilePath),
    indexHtml,
    'utf8'
  );
};

buildIndex();
