import { StockEntity } from 'src/domains/stock/stock.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const testTypeOrmOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [StockEntity],
  synchronize: true,
  dropSchema: true,
  namingStrategy: new SnakeNamingStrategy(),
};
