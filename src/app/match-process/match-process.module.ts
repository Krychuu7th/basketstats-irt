import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatchProcessComponent } from './match-process.component';
import { OnCourtPlayersComponent } from './on-court-players/on-court-players.component';
import { CourtPanelComponent } from './court-panel/court-panel.component';
import { ActionControlComponent } from './court-panel/action-control/action-control.component';



@NgModule({
  declarations: [
    MatchProcessComponent,
    OnCourtPlayersComponent,
    CourtPanelComponent,
    ActionControlComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MatchProcessModule { }
