import { Enum, EnumType } from 'ts-jenum';

@Enum('uid')
export class ParkEnum extends EnumType<ParkEnum>() {
  static readonly DAEJEON = new ParkEnum('RWQ277472', '대전');
  static readonly HANAM = new ParkEnum('RKZ625564', '하남');
  static readonly GOYANG = new ParkEnum('RAR635265', '고양');
  static readonly ANSEONG = new ParkEnum('RFS464324', '안성');
  static readonly SUWON = new ParkEnum('RQY276279', '수원');
  static readonly SHOOTING = new ParkEnum('RHQ676796', '슈팅');

  constructor(
    public readonly uid: string,
    public readonly name: string,
  ) {
    super();
  }
}
