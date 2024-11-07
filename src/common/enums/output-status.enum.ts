import { Enum, EnumType } from 'ts-jenum';

export enum OutputStatusEnum {
  SUCCESS = 'success',
  FAIL = 'fail',
}

@Enum('status')
export class OutputStatus extends EnumType<OutputStatusEnum>() {
  static readonly SUCCESS = new OutputStatus('success', '성공');
  static readonly FAIL = new OutputStatus('fail', '실패');

  constructor(
    public readonly status: string,
    private readonly description: string,
  ) {
    super();
  }
}
