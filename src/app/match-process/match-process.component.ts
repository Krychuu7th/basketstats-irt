import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NonShootingAction, ShootingAction, StatType } from '../enums/match.enums';
import { ActionState, Player, StandardMatch } from '../models/match.models';
import { AppRoutes } from '../providers/routes';
import { MatchProcessService } from './match-process.service';

@Component({
  selector: 'app-match-process',
  templateUrl: './match-process.component.html',
  styleUrl: './match-process.component.scss'
})
export class MatchProcessComponent implements OnInit {

  match!: StandardMatch;
  players: Player[] = [];

  statMade!: ShootingAction | NonShootingAction | null;

  StatType = StatType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public matchProcessService: MatchProcessService,
    public messageService: MessageService,
    public appRoutes: AppRoutes
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ match }) => {
      if (!match) {
        this.router.navigate([this.appRoutes.MATCH, this.appRoutes.PREPARE]);
      }
      this.match = match;
      this.players = [...this.match.teamA.players ?? [], ...this.match.teamB.players ?? []];
    });

    this.matchProcessService.$actionState.subscribe((state: ActionState | null) => {
      console.log(state);
    });
  }

  // actionMade(action: MatchAction): void {
  //   this.statStrategy = this.matchProcessService.getStatStrategy(action, this.shotSpec.value);
  //   this.applyAction();
  // }

  applyAction(player?: Player): void {
    // const actionStepValue = this.statStrategy?.nextStep(player ? { playerId: player.id, teamId: player.teamId } : null);
    // console.log("ACTION STATE ", actionStepValue);
    // this.needPlayerSelection = !!actionStepValue?.needPlayerSelection;
    // this.actionMessage = actionStepValue?.actionMessage;
    // if (actionStepValue?.isStatReady) {
    //   this.matchProcessService.pushMatchStat(actionStepValue.statBuilder.build());
    //   this.resetAction();
    // }
  }
  resetAction(): void {
    // this.statStrategy = undefined;
    this.statMade = null;
  }

  getPlayerName(playerId?: number) {
    return playerId ? this.players.find(player => player.id === playerId)?.name : '-';
  }

  get teamAOnCourtPlayers(): Player[] {
    return this.match?.teamA.players!.slice(0, 5);
  }

  get teamBOnCourtPlayers(): Player[] {
    return this.match?.teamB.players!.slice(0, 5);
  }

  get teamABenchPlayers(): Player[] {
    return this.match?.teamA.players!.slice(5, 12);
  }

  get teamBBenchPlayers(): Player[] {
    return this.match?.teamB.players!.slice(5, 12);
  }
}
