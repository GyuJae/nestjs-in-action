import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/common-output.dto';
import { OutputStatus } from 'src/common/enums/output-statue.enum';

import { StockEntity } from '../../stock.entity';

@ObjectType()
export class FindManyStockByParkCodeOutput extends CommonOutput {
  @Field(() => [StockEntity], { nullable: true })
  stocks: StockEntity[] | null;

  static successOf(stocks: StockEntity[]): FindManyStockByParkCodeOutput {
    const output = new FindManyStockByParkCodeOutput();
    output.stocks = stocks;
    output.status = OutputStatus.SUCCESS;
    return output;
  }

  static failOf(message: string): FindManyStockByParkCodeOutput {
    const output = new FindManyStockByParkCodeOutput();
    output.error = message;
    output.status = OutputStatus.FAIL;
    return output;
  }
}
