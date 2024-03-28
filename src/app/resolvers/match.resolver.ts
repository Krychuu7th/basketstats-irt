import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { db } from '../database/database';
import { LoaderService } from '../loader/loader.service';
import { StandardMatch } from '../models/match.models';

export const matchResolver: ResolveFn<StandardMatch | null> = (route, state) => {
    const loaderService = inject(LoaderService);
    loaderService.startLoading();
    return db.transaction('r', [db.teams, db.players], async () => {
        const teams = await db.teams.toArray();
        if (!!teams.length) {
            const teamA = teams[0];
            const teamB = teams[1];
            const teamAPlayers = await db.players.where({ teamId: teamA.id }).toArray();
            const teamBPlayers = await db.players.where({ teamId: teamB.id }).toArray();
            teamA.players = teamAPlayers;
            teamB.players = teamBPlayers;
            return { teamA, teamB };
        }
        return null;
    }).then((value: StandardMatch | null) => {
        loaderService.stopLoading();
        return value;
    });
};
