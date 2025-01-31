import { Component, EventEmitter, Output } from '@angular/core';
import { ShootingAction } from '../../enums/match.enums';
import { ShotSpec } from '../../models/match.models';
import { DialActions } from '../../operation-dial/operation-dial.component';
import { roundDecimal } from '../../utils/number.utils';
import { MatchProcessService } from '../match-process.service';
import { CourtArea } from './court-panel.enums';

@Component({
  selector: 'app-court-panel',
  templateUrl: './court-panel.component.html',
  styleUrl: './court-panel.component.scss'
})
export class CourtPanelComponent {

  @Output() shotMade = new EventEmitter<ShotSpec>();

  clickedX: number | null = null;
  clickedY: number | null = null;
  shotSpec: ShotSpec = { value: -1, x: -1, y: -1 };

  dialActions: DialActions[] = [
    {
      icon: 'pi-check',
      action: () => {
        this.matchProcessService.initAction(ShootingAction.MADE, this.shotSpec.value);
        this.resetCourtSelection(null);
      },
      // tooltipMessage: 'Trafiony'
    },
    {
      icon: 'pi-check-circle',
      action: () => {
        this.matchProcessService.initAction(ShootingAction.MADE_WITH_FOUL, this.shotSpec.value);
        this.resetCourtSelection(null);
      },
      // tooltipMessage: 'Trafiony z faulem'
    },
    {
      icon: 'pi-times',
      action: () => {
        this.matchProcessService.initAction(ShootingAction.MISSED, this.shotSpec.value);
        this.resetCourtSelection(null);
      },
      // tooltipMessage: 'Nietrafiony'
    },

    {
      icon: 'pi-times-circle',
      action: () => {
        this.matchProcessService.initAction(ShootingAction.MISSED_WITH_FOUL, this.shotSpec.value);
        this.resetCourtSelection(null);
      },
      // tooltipMessage: 'Nietrafiony z faulem'
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.matchProcessService.initAction(ShootingAction.BLOCKED, this.shotSpec.value);
        this.resetCourtSelection(null);
      },
      // tooltipMessage: 'Zablokowany'
    }
  ];

  constructor(
    private matchProcessService: MatchProcessService,
  ) { }

  courtClicked(event: MouseEvent) {
    //TODO: move to dial service
    const courtPanel = document.getElementById(CourtArea.FULL_COURT);
    const courtWidth = courtPanel!.getBoundingClientRect().width;
    const courtHeight = courtPanel!.getBoundingClientRect().height;
    const courtLeft = courtPanel!.getBoundingClientRect().left;
    const courtTop = courtPanel!.getBoundingClientRect().top;
    const targetId = (event.target as Element).id;
    const x = event.clientX - courtLeft;
    const y = event.clientY - courtTop;
    const xPercantage = Math.max(Math.min(roundDecimal(x / courtWidth * 100, 4), 100), 0);
    const yPercantage = Math.max(Math.min(roundDecimal(y / courtHeight * 100, 4), 100), 0);
    this.clickedX = xPercantage;
    this.clickedY = yPercantage;
    const shotSpec = { value: 0, x: this.clickedX, y: this.clickedY };
    if (targetId === CourtArea.LEFT_SIDE || targetId === CourtArea.RIGHT_SIDE) {
      this.shotSpec = { ...shotSpec, value: 2 };
    } else if (targetId === CourtArea.FULL_COURT) {
      this.shotSpec = { ...shotSpec, value: 3 };
    }
  }

  resetCourtSelection(event: any): void {
    this.clickedX = null;
    this.clickedY = null;
  }
}
