import { Component } from '@angular/core';
import { AppRoutes } from '../providers/routes';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {

  constructor(
    public appRoutes: AppRoutes
  ) { }
}
