import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DividerModule,
  ],
  exports: [
    CommonModule,
    DividerModule,
  ]
})
export class SharedModule { }
