import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandardMatch } from '../models/match.models';
import { roundDecimal } from '../utils/number.utils';

@Component({
  selector: 'app-match-process',
  templateUrl: './match-process.component.html',
  styleUrl: './match-process.component.scss'
})
export class MatchProcessComponent implements OnInit {

  match!: StandardMatch;

  clickedX = 0;
  clickedY = 0;
  fg2 = false;
  fg3 = false;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ match }) => {
      this.match = match;
    });
  }

  courtClicked(event: MouseEvent) {
    console.log(event)
    const courtPanel = document.getElementById('fullCourt');
    const courtWidth = courtPanel!.getBoundingClientRect().width;
    const courtHeight = courtPanel!.getBoundingClientRect().height;
    const courtLeft = courtPanel!.getBoundingClientRect().left;
    const courtTop = courtPanel!.getBoundingClientRect().top;
    const targetId = (event.target as Element).id;
    const x = event.clientX - courtLeft;
    const y = event.clientY - courtTop;
    const xPercantage = Math.max(Math.min(roundDecimal(x / courtWidth * 100, 4), 100), 0);
    const yPercantage = Math.max(Math.min(roundDecimal(y / courtHeight * 100, 4), 100), 0);
    this.clickedX = xPercantage;
    this.clickedY = yPercantage;
    this.fg2 = targetId === 'leftSide' || targetId === 'rightSide';
    this.fg3 = targetId === 'fullCourt';
  }
}
