import { Component, Input, OnInit } from '@angular/core';
import { DialOperations } from './operation-dial.models';

@Component({
  selector: 'app-operation-dial',
  templateUrl: './operation-dial.component.html',
  styleUrl: './operation-dial.component.scss'
})
export class OperationDialComponent implements OnInit {

  @Input({ required: true }) operations!: DialOperations[];

  buttonsX: number[] = [];
  buttonsY: number[] = [];

  ngOnInit(): void {
    this.createButtons(this.operations.length);
  }

  createButtons(numOfButtons: number) {
    const container = document.getElementById('operationsContainer');
    if (container) {

      const radius = 80;
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const angleStep = (2 * Math.PI) / numOfButtons;

      for (let i = 0; i < numOfButtons; i++) {
        const angle = (i * angleStep) - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle) - 20;
        const y = centerY + radius * Math.sin(angle) - 20;

        this.buttonsX[i] = x;
        this.buttonsY[i] = y;
      }
    }
  }

}
