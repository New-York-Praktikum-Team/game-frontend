import express, { Request, Response } from 'express';
import "reflect-metadata";
import { Feedback } from '../../entity/Feedback';
import { db } from '../../db';

const router = express.Router();

// Get feedback array
router.get('/', async (request: Request, response: Response) => {
  try {
    const notes = await db.mongodb.manager.find(Feedback);
    response.json(notes);
  } catch (err) {
    response.status(500).json({ error: true, message: `Internal Error: ${err}` });
  }
});

// Add feedback
router.post('/', async (request: Request, response: Response) => {
  const { text } = request.body;

  try {
    const note = new Feedback();
    const { user } = response.locals;

    if (user) {
      note.user = user.display_name;
    }
    note.text = text;

    await db.mongodb.manager.save(note);
    response.json(note);
  } catch (err) {
    response.status(500).json({ error: true, message: `Internal Error: ${err}` });
  }
});

// Clear feedback table
router.delete('/', async (request: Request, response: Response) => {
  try {
    const notes = await db.mongodb.manager.find(Feedback);
    await db.mongodb.manager.remove(notes);
    response.json({ error: false });
  } catch (err) {
    response.status(500).json({ error: true, message: `Internal Error: ${err}` });
  }
});

export default router;
