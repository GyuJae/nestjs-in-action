import { Field, ObjectType } from '@nestjs/graphql';

import { OutputStatusEnum } from '../enums/output-status.enum';

@ObjectType({ isAbstract: true })
export abstract class CommonOutput {
  @Field(() => OutputStatusEnum)
  status: OutputStatusEnum;

  @Field(() => String, { nullable: true })
  error?: string;
}
