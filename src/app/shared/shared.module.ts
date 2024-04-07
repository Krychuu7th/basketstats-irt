import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { OperationDialComponent } from '../operation-dial/operation-dial.component';


@NgModule({
  declarations: [
    OperationDialComponent,
  ],
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [
    CommonModule,
    DividerModule,
    OperationDialComponent,
    ButtonModule,
    TooltipModule
  ]
})
export class SharedModule { }
