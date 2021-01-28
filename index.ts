import https from 'https';
import fs from 'fs';
// @ts-ignore
import { app } from './dist/server.js';
import { db } from './server/db';

const port = process.env.PORT || 5000;
const certificateIsExist = fs.existsSync('server/certificate/server.key') && fs.existsSync('server/certificate/server.cert');

(async () => {
  await db.connect();

  if (process.env.NODE_ENV === 'development' && certificateIsExist) {
    https.createServer({
      key: fs.readFileSync('server/certificate/server.key'),
      cert: fs.readFileSync('server/certificate/server.cert'),
    }, app)
      .listen(port, () => {
        // eslint-disable-next-line no-console
        console.log('Application is started on localhost HTTPS:', port);
      });
  } else {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Application is started on localhost HTTP:', port);
    });
  }
})();
