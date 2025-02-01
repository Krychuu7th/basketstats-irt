import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MatchAction, NonShootingAction, StatType } from '../../enums/match.enums';
import { ActionState, Player } from '../../models/match.models';
import { MatchProcessService } from '../match-process.service';

@Component({
  selector: 'app-on-court-players',
  templateUrl: './on-court-players.component.html',
  styleUrl: './on-court-players.component.scss'
})
export class OnCourtPlayersComponent implements OnInit {

  @Input({ required: true }) players!: Player[];

  @ViewChildren(OverlayPanel) playerStatPanels!: QueryList<OverlayPanel>;

  NonShootingAction = NonShootingAction;

  needPlayerSelection: boolean = false;
  selectedPlayerId: number | undefined;
  playerStatTypes: NonShootingAction[] = [NonShootingAction.STL, NonShootingAction.DREB, NonShootingAction.OREB, NonShootingAction.TO, NonShootingAction.PF];
  nonselectablePlayerId: number | undefined;
  selectableTeamId: number | undefined;
  nonselectableTeamId: number | undefined;

  constructor(
    private matchProcessService: MatchProcessService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.matchProcessService.$actionState.subscribe((state: ActionState | null) => {
      this.needPlayerSelection = !!state?.needPlayerSelection;
      const stat = state?.statBuilder.build();
      this.calculateNonselectablePlayerIds(state?.statToBeDeterminedByPlayerSelection!, stat?.playerId!, stat?.teamId!);
      if (this.needPlayerSelection) {
        this.selectedPlayerId = undefined;
      }
    });
  }

  selectPlayer(event: any, player: Player): void {
    if (this.canSelectPlayer(player)) {
      this.selectedPlayerId = player?.id!;
      this.matchProcessService.nextActionStep(player);
    }
  }

  addPlayerStat(player: Player, statType: MatchAction): void {
    this.matchProcessService.initPlayerBasedAction(statType, player);
  }

  calculateNonselectablePlayerIds(statType: StatType, statPlayerId: number, statTeamId: number): void {
    switch (statType) {
      case StatType.AST: {
        this.nonselectablePlayerId = statPlayerId;
        this.selectableTeamId = statTeamId;
        this.nonselectableTeamId = undefined;
        break;
      }
      case StatType.PF:
      case StatType.BLK:
      case StatType.TO: {
        this.nonselectablePlayerId = statPlayerId;
        this.selectableTeamId = undefined;
        this.nonselectableTeamId = statTeamId;
        break;
      }
      default: {
        this.nonselectablePlayerId = undefined;
        this.selectableTeamId = undefined;
        this.nonselectableTeamId = undefined;
      }
    }

  }

  canSelectPlayer(player: Player): boolean {
    if (this.needPlayerSelection) {
      if (this.nonselectablePlayerId && this.selectableTeamId) {
        return player.id !== this.nonselectablePlayerId && player.teamId === this.selectableTeamId
      } else if (this.nonselectableTeamId) {
        return player.teamId !== this.nonselectableTeamId;
      }

      return true;
    }

    return false;
  }
}
