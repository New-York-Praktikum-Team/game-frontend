import express from 'express';
import geolocationRouter from './geolocation';
import themes from './themes';

const router = express.Router();

router.use('/geolocation', geolocationRouter);
router.use('/theme', themes);

export default router;
