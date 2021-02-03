import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (request: Request, response: Response) => {
  try {
    const geolocation = await axios.get('http://api.geonames.org/countryCodeJSON', {
      params: {
        username: 'elfexor',
        lat: request.query.lat,
        lng: request.query.lng,
      },
    });

    response.json(geolocation.data);
  } catch (err) {
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

export default router;
