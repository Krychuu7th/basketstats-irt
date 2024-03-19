import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { db } from '../database/database';
import { Player, StandardMatch, Team } from '../models/match.models';

@Injectable({
  providedIn: 'root'
})
export class MatchPreparationService {

  constructor(
  ) { }

  saveMatchConfiguration(matchConfiguration: StandardMatch): void {
    this.saveTeam(matchConfiguration.teamA);
    this.saveTeam(matchConfiguration.teamB);
  }

  async saveTeam(team: Team): Promise<void> {
    const teamId = await db.teams.add({
      name: team.name,
    });

    if (team.players) {
      await db.players.bulkAdd(team.players?.map((player: Player) => ({ ...player, teamId })));
    }
  }

  newTeamFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      players: new FormArray([
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
        }),
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
        }),
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
        }),
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
        }),
        new FormGroup({
          name: new FormControl(null, [Validators.required]),
        }),
      ]),
    });
  }

}
