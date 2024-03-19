import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Player, Team } from '../../models/match.models';

@Component({
  selector: 'app-team-reorder',
  templateUrl: './team-reorder.component.html',
  styleUrl: './team-reorder.component.scss'
})
export class TeamReorderComponent {

  @Input({ required: true }) team!: Team;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

  get players(): Player[] {
    return this.team.players!;
  }
}
