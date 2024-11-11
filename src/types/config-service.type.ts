import type { ConfigType } from '@nestjs/config';
import type { appConfig } from 'src/configs/app.config';
import type { sqliteConfig } from 'src/configs/sqlite.config';

export interface ConfigServiceType {
  app: ConfigType<typeof appConfig>;
  sqlite: ConfigType<typeof sqliteConfig>;
}
