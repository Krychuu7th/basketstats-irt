import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-operation-dial',
  templateUrl: './operation-dial.component.html',
  styleUrl: './operation-dial.component.scss'
})
export class OperationDialComponent implements OnInit, OnChanges {

  /**
   * Show dial boolean flag
   */
  @Input({ required: true }) show!: boolean;

  /**
   * Array of dial actions
   */
  @Input({ required: true }) dialActions!: DialActions[];

  /**
   * Coordinate of the x-axis in pixels 
   * (or percantage of parent container if 'percentage' is passed as positionedBy input)
   */
  @Input({ required: true }) set xPosition(value: number) {
    this.renderer.setStyle(this.el.nativeElement, 'left', value + this.UNITS[this.positionedBy]);
  }

  /**
   * Coordinate of the y-axis in pixels 
   * (or percantage of parent container if 'percentage' is passed as positionedBy input)
   */
  @Input({ required: true }) set yPosition(value: number) {
    this.renderer.setStyle(this.el.nativeElement, 'top', value + this.UNITS[this.positionedBy]);
  }

  /**
   * Unit of dial position, can be 'pixels' or 'percentage' (default is 'pixels')
   */
  @Input() positionedBy: 'pixels' | 'percentage' = 'pixels';

  protected buttonsX: number[] = [];
  protected buttonsY: number[] = [];

  protected exceededNumberOfButtons = false;

  protected readonly FIRST_LAYER_MAX_NUMBER_OF_BUTTONS = 9;
  private readonly MAX_NUMBER_OF_BUTTONS = 25;
  private readonly FIRST_LAYER_RADIUS = 80;
  private readonly SECOND_LAYER_RADIUS = 140;

  private readonly UNITS = {
    pixels: 'px',
    percentage: '%'
  };

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');
    this.createButtons(this.dialActions.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  private createButtons(numOfButtons: number): void {
    if (numOfButtons > this.MAX_NUMBER_OF_BUTTONS) {
      this.exceededNumberOfButtons = true;
      throw "Max number of actions in dial has been exceeded. Max number of actions possible for dial to work correctly is 25.";
    }
    const container = document.getElementById('actionsContainer');
    if (container) {
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const firstLayerButtonsQuantity = Math.min(numOfButtons > this.FIRST_LAYER_MAX_NUMBER_OF_BUTTONS ? Math.floor(numOfButtons / 2) : numOfButtons, this.FIRST_LAYER_MAX_NUMBER_OF_BUTTONS);
      let radius = this.FIRST_LAYER_RADIUS;
      let angleStep = this.calculateAngleStep(Math.min(firstLayerButtonsQuantity, numOfButtons));

      for (let i = 0; i < numOfButtons; i++) {
        if (i === firstLayerButtonsQuantity) {
          angleStep = this.calculateAngleStep(numOfButtons - firstLayerButtonsQuantity);
          radius = this.SECOND_LAYER_RADIUS;
        }
        const angle = ((i >= firstLayerButtonsQuantity ? i - firstLayerButtonsQuantity : i) * angleStep) - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle) - 20;
        const y = centerY + radius * Math.sin(angle) - 20;

        this.buttonsX[i] = x;
        this.buttonsY[i] = y;
      }
    }
  }

  private calculateAngleStep(numOfButtons: number): number {
    return (2 * Math.PI) / numOfButtons;
  }
}

export type DialActions = {
  icon: string;
  action(...params: any[]): any;
  customClass?: string;
}