import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { CreateStockerOutput } from './dtos/create-stock/create-stock-output.dto';
import { FindManyStockByParkCodeInput } from './dtos/find-many-stock-by-park-code/find-many-stock-by-park-code-input.dto';
import { FindManyStockByParkCodeOutput } from './dtos/find-many-stock-by-park-code/find-many-stock-by-park-code.dto';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';

@Resolver(() => StockEntity)
export class StockResolver {
  constructor(@Inject() private stockService: StockService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello';
  }

  @Query(() => FindManyStockByParkCodeOutput)
  async findManyStockByParkCode(@Args('input') input: FindManyStockByParkCodeInput): Promise<FindManyStockByParkCodeOutput> {
    try {
      return FindManyStockByParkCodeOutput.successOf(await this.stockService.findOneStockByParkCode(input));
    } catch (error) {
      return FindManyStockByParkCodeOutput.failOf(error.message);
    }
  }

  @Mutation(() => CreateStockerOutput)
  async createStock(
    @Args('input')
    input: CreateStockInput,
  ): Promise<CreateStockerOutput> {
    try {
      const stock = await this.stockService.createStock(input);
      return CreateStockerOutput.successOf(stock);
    } catch (error) {
      return CreateStockerOutput.failOf(error.message);
    }
  }
}
