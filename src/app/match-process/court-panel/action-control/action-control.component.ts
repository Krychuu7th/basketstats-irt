import { Component, OnInit } from '@angular/core';
import { ActionState } from '../../../models/match.models';
import { MatchProcessService } from '../../match-process.service';

@Component({
  selector: 'app-action-control',
  templateUrl: './action-control.component.html',
  styleUrl: './action-control.component.scss'
})
export class ActionControlComponent implements OnInit {

  showControl = false;
  actionMessage: string | undefined;
  needToSelectFreeThrow = false;
  freeThrowsNeeded = 0;
  freeThrowsMade: boolean[] = [];

  constructor(private matchProcessService: MatchProcessService) { }

  ngOnInit(): void {
    this.matchProcessService.$actionState.subscribe((state: ActionState | null) => {
      if (state) {
        this.showControl = !state.isStatReady;
        if (state.actionMessage) {
          this.actionMessage = state.actionMessage;
        }
        const needToSelectFreeThrow = state.needFreeThrowsSelection > 0 && state.needFreeThrowsSelection > this.freeThrowsMade.length;
        this.needToSelectFreeThrow = needToSelectFreeThrow;
        if (needToSelectFreeThrow) {
          this.freeThrowsNeeded = state.needFreeThrowsSelection;
        } else {
          this.freeThrowsNeeded = 0;
          this.freeThrowsMade = [];
        }

      } else {
        this.showControl = false;
      }
    });
  }


  madeFreeThrow(): void {
    this.freeThrowsMade.push(true);
    this.matchProcessService.nextActionStep(true);
  }

  missedFreeThrow(): void {
    this.freeThrowsMade.push(false);
    this.matchProcessService.nextActionStep(false);
  }

  cancelAction(): void {
    this.matchProcessService.cancelAction();
  }
}
