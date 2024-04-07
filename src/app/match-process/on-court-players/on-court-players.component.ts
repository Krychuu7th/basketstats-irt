import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Player } from '../../models/match.models';

@Component({
  selector: 'app-on-court-players',
  templateUrl: './on-court-players.component.html',
  styleUrl: './on-court-players.component.scss'
})
export class OnCourtPlayersComponent implements OnInit {

  @Input({ required: true }) players!: Player[];

  @Input() needPlayerSelection: boolean = false;

  @Output() selectedPlayer = new EventEmitter<Player>();

  @ViewChildren(OverlayPanel) playerStatPanels!: QueryList<OverlayPanel>;

  selectedPlayerId!: number;

  constructor(
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {

  }

  selectPlayer(event: any, player: Player): void {
    if (this.needPlayerSelection) {
      this.selectedPlayerId = player?.id!;
      this.selectedPlayer.emit(player);
    }

    // if (this.needPlayerSelection) {
    //   this.selectedPlayer.emit(this.statSelectorPlayerId);
    // } else {
    //   const panel = this.playerStatPanels.find(panel => panel.el.nativeElement.id === 'statSelect' + playerId);
    //   panel?.show(null, event.target);
    // }
  }
}
