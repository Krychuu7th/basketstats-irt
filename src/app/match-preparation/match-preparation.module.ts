import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';
import { SharedModule } from '../shared/shared.module';
import { MatchPreparationComponent } from './match-preparation.component';
import { TeamDefinitionComponent } from './team-definition/team-definition.component';
import { TeamReorderComponent } from './team-reorder/team-reorder.component';



@NgModule({
  declarations: [
    MatchPreparationComponent,
    TeamDefinitionComponent,
    TeamReorderComponent,
  ],
  imports: [
    SharedModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    StepsModule,
    SpeedDialModule,
    DragDropModule,
  ]
})
export class MatchPreparationModule { }
