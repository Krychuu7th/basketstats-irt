import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatchAction, ShootingAction } from '../enums/match.enums';
import { ActionState, Stat } from '../models/match.models';
import { BlockedShotStrategy, FouledMadeShotStrategy, FouledMissedShotStrategy, MadeShotStrategy, MissedShotStrategy, StatStrategy } from '../utils/stat.strategy';

@Injectable({
  providedIn: 'root'
})
export class MatchProcessService {

  $matchStats = new BehaviorSubject<Stat[]>([]);

  $actionState = new BehaviorSubject<ActionState | null>(null);

  statStrategy: StatStrategy | undefined;

  constructor() { }

  public pushMatchStat(stat: Stat) {
    this.$matchStats.next([...this.$matchStats.value, stat]);
  }

  public actionMade(state: ActionState) {
    this.$actionState.next(state);
  }

  public initAction(matchAction: MatchAction, shotValue: number): void {
    switch (matchAction) {
      case ShootingAction.MADE:
        this.statStrategy = new MadeShotStrategy(this, shotValue);
        break;
      case ShootingAction.MISSED:
        this.statStrategy = new MissedShotStrategy(this, shotValue);
        break;
      case ShootingAction.MADE_WITH_FOUL:
        this.statStrategy = new FouledMadeShotStrategy(this, shotValue);
        break;
      case ShootingAction.MISSED_WITH_FOUL:
        this.statStrategy = new FouledMissedShotStrategy(this, shotValue);
        break;
      case ShootingAction.BLOCKED:
        this.statStrategy = new BlockedShotStrategy(this, shotValue);
        break;
    }

    this.statStrategy?.nextStep();
  }

  public nextActionStep(value?: any): void {
    this.statStrategy?.nextStep(value);
  }

  public cancelAction(): void {
    this.statStrategy = undefined;
    this.$actionState.next(null);
  }
}
