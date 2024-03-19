import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-team-definition',
  templateUrl: './team-definition.component.html',
  styleUrl: './team-definition.component.scss'
})
export class TeamDefinitionComponent {

  @Input({ required: true }) form!: FormGroup;

  teamId: string = uuidv4();

  editName = true;

  playerIndex!: number;

  items = [
    {
      icon: 'pi pi-check',
      command: () => {
        this.teamPlayersArray.removeAt(this.playerIndex);
      }
    },
    {
      icon: 'pi pi-times',
      command: () => {

      }
    },
  ];

  confirmTeamName(): void {
    this.teamNameControl.markAsDirty();
    if (this.teamNameControl.invalid) {
      this.teamNameControl.updateValueAndValidity();
      return;
    }
    this.editName = false;
  }

  addPlayer(): void {
    if (this.teamPlayersArray.length >= 12) {
      return;
    }
    this.teamPlayersArray?.push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
    }));
  }

  removePlayer(index: number) {
    if (this.teamPlayersArray.length <= 3) {
      return;
    }
    this.teamPlayersArray.removeAt(index);
  }

  get teamPlayersArray(): FormArray {
    return this.form.controls["players"] as FormArray;
  }

  get teamPlayersControls(): FormGroup[] {
    return this.teamPlayersArray.controls as FormGroup[];
  }

  get teamNameControl(): AbstractControl {
    return this.form.controls["name"];
  }
}
