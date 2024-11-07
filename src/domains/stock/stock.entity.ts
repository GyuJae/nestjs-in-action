import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { CommonEntity } from 'src/common/entities/common.entity';
import { ParkEnum } from 'src/common/enums/park.enum';
import { Column, Entity } from 'typeorm';

@Entity('stocks')
@ObjectType()
export class StockEntity extends CommonEntity {
  @Column({ type: 'int' })
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'text' })
  @Field(() => String)
  productCode: string;

  @Column({ type: 'text' })
  @Field(() => String)
  @Transform(({ value }) => ParkEnum.valueOf(value), { toClassOnly: true })
  parkCode: string;

  static of(quantity: number, productCode: string, parkCode: string): StockEntity {
    const stock = new StockEntity();
    stock.quantity = quantity;
    stock.productCode = productCode;
    stock.parkCode = parkCode;
    return stock;
  }
}
