import express from 'express';
import geolocationRouter from './geolocation';
<<<<<<< HEAD:api/src/routes/index.ts
import themes from './themes';
=======
import feedbackRouter from './feeedback';
>>>>>>> 9cb2764... feedback 1st commit:server/api/index.ts

const router = express.Router();

router.use('/geolocation', geolocationRouter);
<<<<<<< HEAD:api/src/routes/index.ts
router.use('/theme', themes);
=======
router.use('/feedback', feedbackRouter);
>>>>>>> 9cb2764... feedback 1st commit:server/api/index.ts

export default router;
