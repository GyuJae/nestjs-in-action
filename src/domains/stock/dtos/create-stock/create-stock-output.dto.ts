import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/common-output.dto';
import { OutputStatusEnum } from 'src/common/enums/output-status.enum';

import { StockEntity } from '../../stock.entity';

@ObjectType()
export class CreateStockOutput extends CommonOutput {
  @Field(() => StockEntity, { nullable: true })
  stock: StockEntity | null;

  static successOf(stock: StockEntity): CreateStockOutput {
    const output = new CreateStockOutput();
    output.status = OutputStatusEnum.SUCCESS;
    output.stock = stock;
    return output;
  }

  static failOf(error: string): CreateStockOutput {
    const output = new CreateStockOutput();
    output.status = OutputStatusEnum.FAIL;
    output.error = error;
    return output;
  }
}
