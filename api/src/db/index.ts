import { createConnection, getConnection } from 'typeorm';
import { Feedback } from '../entity/Feedback';
import { Theme } from '../entity/Theme';
import { UserTheme } from '../entity/UserTheme';

class DB {
  public get mongodb() {
    return getConnection('mongodb');
  }

  public get postgres() {
    return getConnection('postgres');
  }

  public connect = async (): Promise<void> => {
    try {
      const { DB_LOGIN, DB_PASSWORD } = process.env;

      await createConnection({
        name: 'postgres',
        type: 'postgres',
        url: `postgres://${DB_LOGIN}:${DB_PASSWORD}@localhost:5436/nyma-api`,
        synchronize: true,
        migrations: [`${__dirname}/../migrations/postgres/*.ts`],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        entities: [Theme, UserTheme],
      });

      // eslint-disable-next-line no-console
      console.log('connection to DB success: postgres');
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
        entities: [Feedback],
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
