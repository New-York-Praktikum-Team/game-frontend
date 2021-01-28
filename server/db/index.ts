import { createConnection, getConnection } from 'typeorm';
import { Theme } from '../entity/Theme';

class DB {
  public get mongodb() {
    return getConnection('mongodb');
  }

  public get postgres() {
    return getConnection('postgres');
  }

  public connect = async (): Promise<void> => {
    try {
      const connection = await createConnection({
        name: 'postgres',
        type: 'postgres',
        url: 'postgres://nyma:nyma@localhost:5436/nyma-api',
        synchronize: true,
        entities: [Theme],
      });

      await connection.manager.find('Theme');

      // eslint-disable-next-line no-console
      console.log('connection to DB success: postgres');
      // const result = await connection.manager.find(Theme);
      // console.log(result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    try {
      await createConnection({
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
