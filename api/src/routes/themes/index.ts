import express, { Request, Response } from 'express';
import { db } from '../../db';
import { Theme } from '../../entity/Theme';
import { isAuth } from '../../middlewares/isAuth';
import { UserTheme } from '../../entity/UserTheme';

const router = express.Router();

// Get themes array
router.get('/', isAuth, async (request: Request, response: Response) => {
  try {
    const themes = await db.postgres.manager.find(Theme);
    response.json(themes);
  } catch (err) {
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

// Create new theme
router.post('/', isAuth, async (request: Request, response: Response) => {
  const { name, json } = request.body;

  try {
    const theme = new Theme();

    theme.name = name;
    theme.json = json;

    await db.postgres.manager.save(theme);

    response.json(theme);
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

// Get or create user theme
router.get('/user', isAuth, async (request: Request, response: Response) => {
  const { manager } = db.postgres;
  const { user } = response.locals;

  try {
    const savedUserTheme = await manager.findOne(UserTheme, {
      where: {
        userId: user.id,
      },
      relations: ['theme'],
    });

    if (savedUserTheme) {
      response.json(savedUserTheme.theme);
    } else {
      const defaultTheme = await manager.findOne(Theme);

      const userTheme = new UserTheme();
      userTheme.userId = user.id;
      userTheme.theme = defaultTheme;
      await manager.save(userTheme);

      response.json(defaultTheme);
    }
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

// change user theme
router.put('/user', isAuth, async (request: Request, response: Response) => {
  const { manager } = db.postgres;
  const { user } = response.locals;
  const { themeId } = request.body;

  try {
    let userTheme = await manager.findOne(UserTheme, {
      where: {
        userId: user.id,
      },
    });

    if (!userTheme) {
      userTheme = new UserTheme();
      userTheme.userId = user.id;
    }

    userTheme.theme = themeId;
    await manager.save(userTheme);

    const theme = await manager.findOne(Theme, { where: { id: themeId } });

    response.json(theme);
  } catch (err) {
    response.status(500).json({ error: true, message: err });
  }
});

export default router;
