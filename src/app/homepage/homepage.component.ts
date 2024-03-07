import { Component } from '@angular/core';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  toogleFlipers = true;

  timer$ = interval(3000).pipe(
    tap(() => this.toogleFlipers = !this.toogleFlipers)
  ).subscribe();
}
