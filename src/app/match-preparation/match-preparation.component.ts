import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Team } from '../models/match.models';
import { MatchPreparationService } from './match-preparation.service';

@Component({
  selector: 'app-match-preparation',
  templateUrl: './match-preparation.component.html',
  styleUrl: './match-preparation.component.scss'
})
export class MatchPreparationComponent implements OnInit {

  teamAForm = this.matchPreparationService.newTeamFormGroup();
  teamBForm = this.matchPreparationService.newTeamFormGroup();

  items: MenuItem[] | undefined;
  activeIndex: number = 0;

  constructor(
    private matchPreparationService: MatchPreparationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ match }) => {
      console.log(match)
      if (match?.teamA && match?.teamB) {
        this.teamAForm.patchValue(match.teamA);
        this.teamBForm.patchValue(match.teamB);
      }
    });

    this.items = [
      {
        label: 'Składy',
        command: (event: any) => this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label }),
        style: { width: '33%' }
      },
      {
        label: 'Ustawienie',
        command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label }),
        style: { width: '33%' }
      },
      {
        label: 'Podsumowanie',
        command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label }),
        style: { width: '33%' }
      },
    ];
  }

  onActiveIndexChange(event: number): void {
    this.activeIndex = event;
  }

  nextStep(): void {
    if (this.activeIndex === 0) {
      this.teamAForm.controls['name'].markAsDirty();
      this.teamBForm.controls['name'].markAsDirty();
      (this.teamAForm.controls['players'] as FormArray).controls.forEach(control => (control as FormGroup).controls['name'].markAsDirty());
      (this.teamBForm.controls['players'] as FormArray).controls.forEach(control => (control as FormGroup).controls['name'].markAsDirty());
      if (this.teamAForm.invalid || this.teamBForm.invalid) {
        return;
      }
    }

    if (this.activeIndex < 2) {
      this.activeIndex++;
    }

  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  saveMatchConfiguration(): void {
    this.matchPreparationService.saveMatchConfiguration({ teamA: this.teamA, teamB: this.teamB });
  }

  get teamA(): Team {
    return this.teamAForm.value;
  }

  get teamB(): Team {
    return this.teamBForm.value;
  }

}
