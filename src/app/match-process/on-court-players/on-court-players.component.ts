import { Component, Input } from '@angular/core';
import { Player } from '../../models/match.models';

@Component({
  selector: 'app-on-court-players',
  templateUrl: './on-court-players.component.html',
  styleUrl: './on-court-players.component.scss'
})
export class OnCourtPlayersComponent {

  @Input({ required: true }) players!: Player[];
}
