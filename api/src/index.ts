import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db';
import routes from './routes';
import { authorization } from './middlewares/authorization';

const port = process.env.PORT || 5001;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(authorization);

(async () => {
  await db.connect();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Application is started on localhost HTTP:', port);
  });
})();
