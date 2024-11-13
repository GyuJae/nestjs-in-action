/* eslint-disable @typescript-eslint/no-require-imports */

import { TEST_DATABASE_FILENAME } from './database-utils';

const fs = require('fs');

async function dropTestDatabase() {
  if (fs.existsSync(TEST_DATABASE_FILENAME)) {
    fs.unlinkSync(TEST_DATABASE_FILENAME);
  }
}

module.exports = async () => {
  await dropTestDatabase();
};
