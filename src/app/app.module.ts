import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatchPreparationComponent } from './match-preparation/match-preparation.component';
import { TeamDefinitionComponent } from './match-preparation/team-definition/team-definition.component';
import { TeamReorderComponent } from './match-preparation/team-reorder/team-reorder.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { TestModule } from './test/test.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MatchPreparationComponent,
    NotFoundComponent,
    NavHeaderComponent,
    TeamDefinitionComponent,
    TeamReorderComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    TestModule,
    NgOptimizedImage,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    ButtonModule,
    StepsModule,
    ToastModule,
    DividerModule,
    SpeedDialModule,
    DragDropModule,
    TooltipModule,
    ProgressSpinnerModule,

  ],
  providers: [
    provideAnimationsAsync(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
