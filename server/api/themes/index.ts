import express, { Request, Response } from 'express';
import { db } from '../../db';
import { Theme } from '../../entity/Theme';

const router = express.Router();

router.get('/', async (request: Request, response: Response) => {
  try {
    const data = await db.postgres.manager.find(Theme);

    console.log(data);

    response.json([]);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

export default router;
