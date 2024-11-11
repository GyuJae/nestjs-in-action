import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigServiceType } from 'src/types/config-service.type';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<ConfigServiceType>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const SQLITE_CONFIG = this.configService.get('sqlite', { infer: true });
    return {
      type: 'sqlite',
      database: SQLITE_CONFIG?.database,
      entities: [__dirname + '../../../../**/*.entity{.ts,.js}'],
      synchronize: SQLITE_CONFIG?.synchronize,
      logging: ['warn', 'error'],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
