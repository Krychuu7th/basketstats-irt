import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { NgOptimizedImage } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ROUTES } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule, buildRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoaderComponent } from './loader/loader.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { ThemeSwitchComponent } from './nav-header/theme-switch/theme-switch.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutes } from './providers/routes';
import { SharedModule } from './shared/shared.module';
import { TestModule } from './test/test.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotFoundComponent,
    NavHeaderComponent,
    LoaderComponent,
    ThemeSwitchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    TestModule,
    NgOptimizedImage,
    // InputTextModule,
    // FloatLabelModule,
    // ReactiveFormsModule,

    // StepsModule,
    ToastModule,

    // SpeedDialModule,
    // DragDropModule,
    TooltipModule,
    ProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    MessageService,
    {
      provide: AppRoutes,
      useClass: AppRoutes
    },
    {
      provide: ROUTES,
      useFactory: (appRoutes: AppRoutes) => {
        return buildRoutes(appRoutes);
      },
      multi: true,
      deps: [AppRoutes]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
