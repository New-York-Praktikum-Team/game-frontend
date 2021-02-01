import express, { Request, Response } from 'express';
import { db } from '../../db';
import { Theme } from '../../entity/Theme';

const router = express.Router();

router.get('/', async (request: Request, response: Response) => {
  try {
    const data = await db.postgres.manager.find(Theme);
    response.json(data);
  } catch (err) {
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const theme = new Theme();

    theme.name = request.body.name;
    theme.json = JSON.parse(request.body.json);

    await db.postgres.manager.save(theme);

    response.json(theme);
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

router.get('/user', async (request: Request, response: Response) => {
  try {
    response.json([]);
  } catch (err) {
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

export default router;
