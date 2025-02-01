import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MatchAction, NonShootingAction } from '../../enums/match.enums';
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

  constructor(
    private matchProcessService: MatchProcessService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.matchProcessService.$actionState.subscribe((state: ActionState | null) => {
      console.log(state?.needPlayerSelection);
      this.needPlayerSelection = !!state?.needPlayerSelection;
      if (this.needPlayerSelection) {
        this.selectedPlayerId = undefined;
      }
    });
  }

  selectPlayer(event: any, player: Player): void {
    if (this.needPlayerSelection) {
      console.log('selectPlayer')
      this.selectedPlayerId = player?.id!;
      this.matchProcessService.nextActionStep(player);
    }
  }

  addPlayerStat(player: Player, statType: MatchAction): void {
    this.matchProcessService.initPlayerBasedAction(statType, player);
  }
}
