const https = require('https');
const fs = require('fs');
const { app } = require('./dist/server.js');

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
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
