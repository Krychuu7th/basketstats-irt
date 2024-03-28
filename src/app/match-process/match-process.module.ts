import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatchProcessComponent } from './match-process.component';
import { OnCourtPlayersComponent } from './on-court-players/on-court-players.component';



@NgModule({
  declarations: [
    MatchProcessComponent,
    OnCourtPlayersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MatchProcessModule { }
