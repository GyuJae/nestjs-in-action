import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { PUB_SUB_PROVIDER } from './pubsub.constants';
import { PubSubService } from './pubsub.service';

@Module({
  providers: [
    {
      provide: PUB_SUB_PROVIDER,
      useValue: new PubSub(),
    },
    PubSubService,
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
