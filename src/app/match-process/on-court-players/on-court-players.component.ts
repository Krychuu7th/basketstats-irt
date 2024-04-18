import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
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

  needPlayerSelection: boolean = false;
  selectedPlayerId: number | undefined;

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
      this.selectedPlayerId = player?.id!;
      this.matchProcessService.nextActionStep(player);
    }
  }
}
