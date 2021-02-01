import express, { Request, Response } from 'express';
import { db } from '../../db';
import { Theme } from '../../entity/Theme';
import { isAuth } from '../../middlewares/isAuth';
import { UserTheme } from '../../entity/UserTheme';

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

router.get('/user', isAuth, async (request: Request, response: Response) => {
  const { manager } = db.postgres;
  const { user } = response.locals;

  try {
    const savedUserTheme = await manager.findOne(UserTheme, { where: { userId: user.id } });

    if (savedUserTheme) {
      response.json(savedUserTheme);
    } else {
      const defaultTheme = await manager.findOne(Theme);
      response.json(defaultTheme);
    }
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

export default router;
