/* eslint-disable @typescript-eslint/no-require-imports */
import { open } from 'sqlite';

import type { Database } from 'sqlite';

const sqlite3 = require('sqlite3');

export const TEST_DATABASE_FILENAME = process.env.SQLITE_DATABASE ?? ':memory:';

export async function createConnection(): Promise<Database> {
  return await open({
    filename: TEST_DATABASE_FILENAME,
    driver: sqlite3.Database,
  });
}
