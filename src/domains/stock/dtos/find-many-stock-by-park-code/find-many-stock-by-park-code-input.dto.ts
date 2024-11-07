import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@InputType()
export class FindManyStockByParkCodeInput {
  @Field(() => String)
  @Expose()
  parkCode: string;
}
