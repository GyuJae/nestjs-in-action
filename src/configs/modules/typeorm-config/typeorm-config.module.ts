import { Logger as DefaultLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';

import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        DefaultLogger.log('[TypeOrm] Start data source initialization');
        const dataSource = await new DataSource(options).initialize();
        DefaultLogger.log('[TypeOrm] Data source initialized');

        return getDataSourceByName('default') ?? addTransactionalDataSource(dataSource);
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
