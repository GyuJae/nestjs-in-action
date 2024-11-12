import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/common-output.dto';
import { OutputStatusEnum } from 'src/common/enums/output-status.enum';

import { StockEntity } from '../../stock.entity';

@ObjectType()
export class FindManyStockByParkCodeOutput extends CommonOutput {
  @Field(() => [StockEntity], { nullable: true })
  stocks: StockEntity[] | null;

  static successOf(stocks: StockEntity[]): FindManyStockByParkCodeOutput {
    const output = new FindManyStockByParkCodeOutput();
    output.stocks = stocks;
    output.status = OutputStatusEnum.SUCCESS;
    return output;
  }

  static failOf(message: string): FindManyStockByParkCodeOutput {
    const output = new FindManyStockByParkCodeOutput();
    output.error = message;
    output.status = OutputStatusEnum.FAIL;
    return output;
  }
}
