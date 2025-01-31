import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialActions } from '../operation-dial/operation-dial.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  dialX: number | null = null;
  dialY: number | null = null;

  dialActions: DialActions[] = [
    {
      icon: 'pi-check',
      action: () => {
        this.messageService.add({ severity: 'info', summary: 'Dial action 1' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-check-circle',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 2' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-times',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 3' });
        this.showDial = false;
      },
    },

    {
      icon: 'pi-times-circle',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 4' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 5' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 6' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 7' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 8' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 9' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 10' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 11' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 12' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 13' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 14' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 15' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 16' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 17' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 18' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 19' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 20' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 21' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 22' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 23' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 24' });
        this.showDial = false;
      },
    },
    {
      icon: 'pi-circle-fill',
      action: () => {
        this.messageService.add({ severity: 'success', summary: 'Dial action 25' });
        this.showDial = false;
      }
    },
  ];

  showDial = false;

  constructor(private messageService: MessageService) { }

  // @HostListener('window:mousedown', ['$event'])
  onClick(event: MouseEvent) {
    // event.preventDefault();
    this.dialX = event.offsetX;
    this.dialY = event.offsetY;
    this.showDial = true;
  }
}
