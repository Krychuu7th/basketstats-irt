import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShotSpec } from '../../models/match.models';
import { DialOperations } from '../../operation-dial/operation-dial.models';
import { roundDecimal } from '../../utils/number.utils';
import { CourtArea } from './court-panel.enums';

@Component({
  selector: 'app-court-panel',
  templateUrl: './court-panel.component.html',
  styleUrl: './court-panel.component.scss'
})
export class CourtPanelComponent {

  @Input({ required: true }) operations: DialOperations[] = [];
  @Input() actionMessage: string | undefined;

  @Output() shotMade = new EventEmitter<ShotSpec>();

  clickedX: number | null = null;
  clickedY: number | null = null;

  courtClicked(event: MouseEvent) {
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
      this.shotMade.emit({ ...shotSpec, value: 2 });
    } else if (targetId === CourtArea.FULL_COURT) {
      this.shotMade.emit({ ...shotSpec, value: 3 });
    }
  }

  resetCourtSelection(event: any): void {
    this.clickedX = null;
    this.clickedY = null;
  }
}
