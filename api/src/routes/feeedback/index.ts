import express, { Request, Response } from 'express';
import { Connection, createConnection } from 'typeorm';
import "reflect-metadata";
import { Note } from '../../../src/entity/note';

const router = express.Router();

router.get('/', async (request: Request, response: Response) => {
  let connection: Connection;
  try {
    connection = await createConnection({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "nyma-api",
      useNewUrlParser: true,
      entities: [Note]
    });

    // const note = new Note();
    // note.text = "test note";
    // await connection.manager.save(note);

    //const notes = await connection.manager.find(Note); 
    //response.status(200).json({ get: "OK", notes: notes });

    response.status(200).json({ get: "OK" });

  } catch (err) {
    response.status(500).json({ error: true, message: `${err}` });
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    response.status(200).json({ request: request.body });
  } catch (err) {
    response.status(500).json({ error: true, message: 'Internal Error' });
  }
});

export default router;
