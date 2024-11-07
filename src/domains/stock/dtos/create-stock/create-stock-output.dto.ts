import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/common-output.dto';
import { OutputStatus } from 'src/common/enums/output-statue.enum';

import { StockEntity } from '../../stock.entity';

@ObjectType()
export class CreateStockerOutput extends CommonOutput {
  @Field(() => StockEntity, { nullable: true })
  stock: StockEntity | null;

  static successOf(stock: StockEntity): CreateStockerOutput {
    const output = new CreateStockerOutput();
    output.status = OutputStatus.SUCCESS;
    output.stock = stock;
    return output;
  }

  static failOf(error: string): CreateStockerOutput {
    const output = new CreateStockerOutput();
    output.status = OutputStatus.FAIL;
    output.error = error;
    return output;
  }
}
