import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MatchPreparationComponent } from './match-preparation/match-preparation.component';
import { matchResolver } from './match-preparation/match.resolver';
import { MatchProcessComponent } from './match-process/match-process.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutes } from './providers/routes';
import { TestComponent } from './test/test.component';

export const buildRoutes = (appRoutes: AppRoutes): Routes => [
  {
    path: appRoutes.EMPTY,
    component: HomepageComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: appRoutes.MATCH,
    children: [
      {
        path: appRoutes.PREPARE,
        loadChildren: () => import('./match-preparation/match-preparation.module').then(m => m.MatchPreparationModule),
        component: MatchPreparationComponent,
        resolve: { match: matchResolver }
      },
      {
        path: appRoutes.PROCESS,
        loadChildren: () => import('./match-process/match-process.module').then(m => m.MatchProcessModule),
        component: MatchProcessComponent,
        resolve: { match: matchResolver },
        data: { containerClass: 'container-fluid' }
      },
    ]
  },
  {
    path: appRoutes.NOT_FOUND,
    component: NotFoundComponent
  },
  { path: appRoutes.EMPTY, redirectTo: appRoutes.EMPTY, pathMatch: 'full' },
  { path: appRoutes.WILDCARD, redirectTo: appRoutes.NOT_FOUND },
];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
