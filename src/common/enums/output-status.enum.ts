import { registerEnumType } from '@nestjs/graphql';

export enum OutputStatusEnum {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

registerEnumType(OutputStatusEnum, {
  name: 'OutputStatusEnum',
});
