import { registerEnumType } from '@nestjs/graphql';

export enum HistoryEntityNameEnum {
  STOCK = 'STOCK',
}

registerEnumType(HistoryEntityNameEnum, {
  name: 'HistoryEntityNameEnum',
});
