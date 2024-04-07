import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatchAction, ShootingAction } from '../enums/match.enums';
import { Stat } from '../models/match.models';
import { BlockedShotStrategy, FouledMadeShotStrategy, FouledMissedShotStrategy, MadeShotStrategy, MissedShotStrategy, StatStrategy } from '../utils/stat.strategy';

@Injectable({
  providedIn: 'root'
})
export class MatchProcessService {

  $matchStats = new BehaviorSubject<Stat[]>([]);

  constructor() { }

  public pushMatchStat(stat: Stat) {
    this.$matchStats.next([...this.$matchStats.value, stat]);
  }

  public getStatStrategy(matchAction: MatchAction, shotValue: number): StatStrategy | undefined {
    switch (matchAction) {
      case ShootingAction.MADE:
        return new MadeShotStrategy(shotValue);
      case ShootingAction.MISSED:
        return new MissedShotStrategy(shotValue);
      case ShootingAction.MADE_WITH_FOUL:
        return new FouledMadeShotStrategy(shotValue);
      case ShootingAction.MISSED_WITH_FOUL:
        return new FouledMissedShotStrategy(shotValue);
      case ShootingAction.BLOCKED:
        return new BlockedShotStrategy(shotValue);
    }

    return undefined;
  }
}
