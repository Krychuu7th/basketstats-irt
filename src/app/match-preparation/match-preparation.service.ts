import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { db } from '../database/database';
import { StandardMatch, Team } from '../models/match.models';

@Injectable({
  providedIn: 'root'
})
export class MatchPreparationService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  async saveMatchConfiguration(matchConfiguration: StandardMatch): Promise<void> {
    await this.saveTeam(matchConfiguration.teamA);
    await this.saveTeam(matchConfiguration.teamB);
  }

  async saveTeam(team: Team): Promise<void> {
    let teamId: number;
    if (team.id) {
      teamId = team.id;
      this.updateTeam(teamId, team);
    } else {
      teamId = await this.addTeam(team);
    }

    // team.players?.forEach(player => player.teamId = teamId);
    team.players = team.players?.map(player => player.id ? ({ ...player, teamId }) : ({ name: player.name, teamId }));
    if (team.players) {
      await db.players.bulkPut(team.players);
    }
  }

  async addTeam(team: Team) {
    return await db.teams.add({
      name: team.name,
    });
  }

  async updateTeam(teamId: number, team: Team) {
    return await db.teams.update(teamId, {
      name: team.name,
    });
  }

  newTeamFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      players: new FormArray(
        Array.from({ length: 5 }, () => this.newPlayerFormGroup())
      ),
    });
  }

  addBenchPlayerForms(teamForm: FormGroup, playersCount: number): void {
    const benchPlayersCount = playersCount - 5;
    for (let i = 0; i < benchPlayersCount; i++) {
      (teamForm.controls['players'] as FormArray).push(
        this.newPlayerFormGroup()
      );
    }
  }

  newPlayerFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(),
      teamId: new FormControl(),
      name: new FormControl(null, [Validators.required]),
    });
  }
}
