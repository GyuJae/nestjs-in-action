import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

import { OutputStatusEnum, OutputStatus } from '../enums/output-status.enum';

@ObjectType({ isAbstract: true })
export abstract class CommonOutput {
  @Field(() => OutputStatusEnum)
  @Transform(({ value }) => OutputStatus.valueOf(value), { toClassOnly: true })
  @Transform(({ value }) => value.status, { toPlainOnly: true })
  status: OutputStatus;

  @Field(() => String, { nullable: true })
  error?: string;
}

registerEnumType(OutputStatusEnum, {
  name: 'EnumOutputStatus',
});
