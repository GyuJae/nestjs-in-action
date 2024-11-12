import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from 'src/shared/pubsub/pubsub.service';

import { CreateStockInput } from './dtos/create-stock/create-stock-input.dto';
import { CreateStockOutput } from './dtos/create-stock/create-stock-output.dto';
import { FindManyStockByParkCodeInput } from './dtos/find-many-stock-by-park-code/find-many-stock-by-park-code-input.dto';
import { FindManyStockByParkCodeOutput } from './dtos/find-many-stock-by-park-code/find-many-stock-by-park-code.dto';
import { StockSubscriptionEnum } from './stock-subscription.enum';
import { StockEntity } from './stock.entity';
import { StockService } from './stock.service';

@Resolver(() => StockEntity)
export class StockResolver {
  constructor(
    @Inject() private readonly stockService: StockService,
    @Inject() private readonly pubSubService: PubSubService,
  ) {}

  @Query(() => FindManyStockByParkCodeOutput)
  async findManyStockByParkCode(@Args('input') input: FindManyStockByParkCodeInput): Promise<FindManyStockByParkCodeOutput> {
    try {
      return FindManyStockByParkCodeOutput.successOf(await this.stockService.findOneStockByParkCode(input));
    } catch (error) {
      return FindManyStockByParkCodeOutput.failOf(error.message);
    }
  }

  @Mutation(() => CreateStockOutput)
  async createStock(
    @Args('input')
    input: CreateStockInput,
  ): Promise<CreateStockOutput> {
    try {
      const stock = await this.stockService.createStock(input);

      await this.pubSubService.publish(StockSubscriptionEnum.STOCK_CREATED, { [StockSubscriptionEnum.STOCK_CREATED]: stock });

      return CreateStockOutput.successOf(stock);
    } catch (error) {
      return CreateStockOutput.failOf(error.message);
    }
  }

  @Subscription(() => StockEntity, {
    name: StockSubscriptionEnum.STOCK_CREATED,
    filter: (payload: unknown, variables: { parkCode: string }) => {
      return payload?.[StockSubscriptionEnum.STOCK_CREATED]?.parkCode === variables.parkCode;
    },
  })
  stockCreated(
    @Args('parkCode')
    _parkCode: string,
  ): AsyncIterator<StockEntity> {
    return this.pubSubService.listenTo(StockSubscriptionEnum.STOCK_CREATED);
  }
}
