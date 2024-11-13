/* eslint-disable @typescript-eslint/no-require-imports */
import { createConnection } from './database-utils';

// process.env.APP_PORT = '7777';
process.env.NODE_ENV = 'test';
process.env.SQLITE_DATABASE = ':memory:';
process.env.SYNCHRONIZE = 'true';

async function createTestDatabase() {
  const db = await createConnection();
  await db.close();
}

const portfinder = require('portfinder');

module.exports = async () => {
  const port = await portfinder.getPortPromise();

  process.env.APP_PORT = port;
  await createTestDatabase();
};
