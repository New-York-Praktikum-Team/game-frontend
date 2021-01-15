import express from 'express';
import geolocationRouter from './geolocation';

const router = express.Router();

router.use('/geolocation', geolocationRouter);

export default router;
