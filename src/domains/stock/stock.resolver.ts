import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { CreateStockerOutput } from './dtos/create-stock/create-stock-output.dto';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';

@Resolver(() => StockEntity)
export class StockResolver {
  constructor(@Inject() private stockService: StockService) {}

  @Query(() => [StockEntity])
  async stocks(): Promise<StockEntity[]> {
    return [];
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
