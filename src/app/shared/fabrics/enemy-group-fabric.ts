import { Cell, EnemyGroupSettings } from '@models';
import { Random } from '@services';
import { MonstersSettings } from '@shared/db';

export class EnemyGroupFabric {


  static createMostersCasual(cell: Cell): EnemyGroupSettings {
    let deep = cell.deep;
    console.log('createMostersCasual', cell);
    //Число монстров 1 и 2лвл от глубины (min / max):
    let s = MonstersSettings.find(p => p.deep === deep);
    if (!s) {
      s = {
        deep: deep,
        mosterLevel1Min: deep / 3,
        mosterLevel1Max: deep / 3 + 1,
        mosterLevel2Min: deep / 3,
        mosterLevel2Max: deep / 3 + 1,
        percentBoss: 33
      };
    }

    let mosterLevel2Count = Random.getInt(s.mosterLevel2Min, s.mosterLevel2Max);
    let diff = mosterLevel2Count - s.mosterLevel2Min;
    let mosterLevel1Count = Random.getInt(s.mosterLevel1Min - diff * 2, s.mosterLevel1Max - diff * 2);
    let existsBoss = mosterLevel2Count > 0 && s.percentBoss > Random.getInt(1, 100);
    mosterLevel2Count -= existsBoss ? 1 : 0;

    return { mosterLevel1Count, mosterLevel2Count, existsBoss } as EnemyGroupSettings;
  }
  static createMostersTrueHard(cell: Cell) {
    let s = {
      mosterMinCount: 1,
      mosterMaxCount: cell.deep,
      mosterLevel2Min: 0,
      mosterLevel2Max: cell.deep,
      percentBoss: 10
    };
    if (s.mosterMaxCount <= 3) {
      s.mosterMaxCount += 1;
    }
    else if (s.mosterMaxCount < 7) {
      s.mosterMinCount = 3;
      s.mosterLevel2Min = 1;
      s.percentBoss = 18;
    }
    else {
      s.mosterMinCount = 3;
      s.mosterMaxCount -= 2;
      s.mosterLevel2Min = 3;
      s.percentBoss = 33;
    }
    let mosterCount = Random.getInt(s.mosterMinCount, s.mosterMaxCount);
    let mosterLevel2Count = Random.getInt(s.mosterLevel2Min, s.mosterLevel2Max);
    let mosterLevel1Count = mosterCount - mosterLevel2Count < 0 ? 0 : mosterCount - mosterLevel2Count;
    let existsBoss = mosterLevel2Count > 0 && s.percentBoss > Random.getInt(1, 100);
    mosterLevel2Count -= existsBoss ? 1 : 0;

    return { mosterLevel1Count, mosterLevel2Count, existsBoss } as EnemyGroupSettings;
  }
}
