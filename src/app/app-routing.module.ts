import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MatchPreparationComponent } from './match-preparation/match-preparation.component';
import { matchResolver } from './match-preparation/match.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'match',
    children: [
      {
        path: 'prepare',
        component: MatchPreparationComponent,
        resolve: { match: matchResolver },
      },
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
