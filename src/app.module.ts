/* eslint-disable unicorn/prefer-spread */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, appConfigSchema } from './configs/app.config';
import { GraphqlConfigModule } from './configs/modules/graphql-config/graphql-config.module';
import { TypeOrmConfigModule } from './configs/modules/typeorm-config/typeorm-config.module';
import { sqliteConfig, sqliteConfigSchema } from './configs/sqlite.config';
import { StockModule } from './domains/stock/stock.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    GraphqlConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, sqliteConfig],
      validationSchema: appConfigSchema.concat(sqliteConfigSchema),
      validationOptions: {
        abortEarly: true,
      },
    }),
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
