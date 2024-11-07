import { Field, InputType, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

import { StockEntity } from '../../stock.entity';

@InputType()
export class CreateStockInput {
  @Field(() => Int)
  @Expose()
  quantity: number;

  @Field(() => String)
  @Expose()
  productCode: string;

  @Field(() => String)
  @Expose()
  parkCode: string;

  toEntity(): StockEntity {
    return StockEntity.of(this.quantity, this.productCode, this.parkCode);
  }
}
