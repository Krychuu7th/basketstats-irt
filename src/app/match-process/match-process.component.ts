import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatchAction, NonShootingAction, ShootingAction, StatType } from '../enums/match.enums';
import { Player, ShotSpec, StandardMatch } from '../models/match.models';
import { DialOperations } from '../operation-dial/operation-dial.models';
import { AppRoutes } from '../providers/routes';
import { StatStrategy } from '../utils/stat.strategy';
import { MatchProcessService } from './match-process.service';

@Component({
  selector: 'app-match-process',
  templateUrl: './match-process.component.html',
  styleUrl: './match-process.component.scss'
})
export class MatchProcessComponent implements OnInit {

  match!: StandardMatch;
  players: Player[] = [];

  needPlayerSelection: boolean = false;
  statMade!: ShootingAction | NonShootingAction | null;
  actionMessage!: string | undefined;
  statStrategy: StatStrategy | undefined;
  shotSpec: ShotSpec = { value: 0, x: 0, y: 0 };

  operations: DialOperations[] = [
    {
      icon: 'pi-check',
      operation: () => {
        this.actionMade(ShootingAction.MADE);
      },
      tooltipMessage: 'Trafiony'
    },
    {
      icon: 'pi-check-circle',
      operation: () => {
        this.actionMade(ShootingAction.MADE_WITH_FOUL);
      },
      tooltipMessage: 'Trafiony z faulem'
    },
    {
      icon: 'pi-times',
      operation: () => {
        this.actionMade(ShootingAction.MISSED);
      },
      tooltipMessage: 'Nietrafiony'
    },

    {
      icon: 'pi-times-circle',
      operation: () => {
        this.actionMade(ShootingAction.MISSED_WITH_FOUL);
      },
      tooltipMessage: 'Nietrafiony z faulem'
    },
    {
      icon: 'pi-circle-fill',
      operation: () => {
        this.actionMade(ShootingAction.BLOCKED);
      },
      tooltipMessage: 'Zablokowany'
    },
  ];

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
  }

  actionMade(action: MatchAction): void {
    this.statStrategy = this.matchProcessService.getStatStrategy(action, this.shotSpec.value);
    this.applyAction();
  }

  applyAction(player?: Player): void {
    const actionStepValue = this.statStrategy?.nextStep(player ? { playerId: player.id, teamId: player.teamId } : null);
    console.log("ACTION STATE ", actionStepValue);
    this.needPlayerSelection = !!actionStepValue?.needPlayerSelection;
    this.actionMessage = actionStepValue?.actionMessage;
    if (actionStepValue?.isStatReady) {
      this.matchProcessService.pushMatchStat(actionStepValue.statBuilder.build());
      this.resetAction();
    }
  }

  setShotSpec(shotSpec: ShotSpec): void {
    this.shotSpec = shotSpec;
  }

  resetAction(): void {
    this.statStrategy = undefined;
    this.needPlayerSelection = false;
    this.statMade = null;
    this.actionMessage = undefined;
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
