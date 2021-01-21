import { createConnection } from 'typeorm';

(async () => {
  try {
    const connection = await createConnection({
      name: 'postgres',
      type: 'postgres',
      url: 'postgres://nyma:nyma@localhost:5436/nyma-api',
    });
    // eslint-disable-next-line no-console
    console.log(`connection to DB success: ${connection.name}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  try {
    const connection = await createConnection({
      name: 'mongodb',
      type: 'mongodb',
      url: 'mongodb://localhost:27017/nyma-api',
      useUnifiedTopology: true,
    });

    // eslint-disable-next-line no-console
    console.log(`connection to DB success: ${connection.name}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
})();
