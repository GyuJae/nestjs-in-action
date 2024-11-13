import { HistoryEntity } from '../history.entity';

import type { HistoryActionEnum } from '../enums/history-action.enum';
import type { HistoryEntityNameEnum } from '../enums/history-entity-name.enum';

export class CreateHistoryDto {
  entityName: HistoryEntityNameEnum;
  entityId: number;
  action: HistoryActionEnum;
  entity: object;

  toEntity(): HistoryEntity {
    return HistoryEntity.from(this);
  }
}
