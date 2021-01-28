import { Connection, createConnection } from 'typeorm';
import { Theme } from '../entity/Theme';

class DB {
  public mongodb!: Connection;

  public postgres!: Connection;

  public connect = async () => {
    try {
      this.postgres = await createConnection({
        name: 'postgres',
        type: 'postgres',
        url: 'postgres://nyma:nyma@localhost:5436/nyma-api',
        synchronize: true,
        entities: [Theme],
      });
      // eslint-disable-next-line no-console
      console.log(`connection to DB success: ${this.postgres.name}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    try {
      this.mongodb = await createConnection({
        name: 'mongodb',
        type: 'mongodb',
        url: 'mongodb://localhost:27017/nyma-api',
        useUnifiedTopology: true,
        synchronize: true,
      });

      // eslint-disable-next-line no-console
      console.log(`connection to DB success: ${this.mongodb.name}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
}

export const db = new DB();
