import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
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
  // {
  //   path: 'not-found',
  //   component: NotFoundPageComponent
  // },
  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: 'not-found' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
