import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { PUB_SUB_PROVIDER } from './pubsub.constants';

@Injectable()
export class PubSubService {
  constructor(@Inject(PUB_SUB_PROVIDER) private readonly pubSub: PubSub) {}

  async publish<T>(trigger: string, payload: T): Promise<void> {
    return this.pubSub.publish(trigger, payload);
  }

  listenTo<T>(trigger: string): AsyncIterator<T> {
    return this.pubSub.asyncIterator<T>(trigger);
  }
}
