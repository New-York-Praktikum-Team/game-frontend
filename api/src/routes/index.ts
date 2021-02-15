import express from 'express';
import geolocationRouter from './geolocation';
import themes from './themes';
import feedback from './feeedback';

const router = express.Router();

router.use('/geolocation', geolocationRouter);
router.use('/theme', themes);
router.use('/feedback', feedback);

export default router;
