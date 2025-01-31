import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
// import { NgActionDialComponent } from 'ng-action-dial';
import { SharedModule } from '../shared/shared.module';
import { TestComponent } from './test.component';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    // NgActionDialComponent,
    SharedModule,
  ]
})
export class TestModule { }
