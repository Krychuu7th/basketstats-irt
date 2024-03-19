import Dexie, { Table } from 'dexie';
import { Player, Team } from '../models/match.models';

export class AppDB extends Dexie {
    teams!: Table<Team, number>;
    players!: Table<Player, number>;

    constructor() {
        super('basketstats-irt');
        this.version(1).stores({
            teams: '++id, name',
            players: '++id, name, teamId',
        });

        this.open()
            .then(data => console.log("DB Opened"))
            .catch(err => console.log(err.message));

        // this.on('populate', () => this.populate());
    }

    async populate() {
        const teamAId = await db.teams.add({
            name: 'Drużyna A',
        });
        const teamBId = await db.teams.add({
            name: 'Drużyna B',
        });
        await db.players.bulkAdd([
            {
                name: 'Włodzimierz Zasada',
                teamId: teamAId
            },
            {
                name: 'Kuba Wójcicki',
                teamId: teamAId
            },
            {
                name: 'Piotr Hajdas',
                teamId: teamAId
            },
            {
                name: 'Seweryn Tlałka',
                teamId: teamAId
            },
            {
                name: 'Hubert Zamora',
                teamId: teamAId
            },

            {
                name: 'Mariusz Kiełkowski',
                teamId: teamBId
            },
            {
                name: 'Artur Majchrzak',
                teamId: teamBId
            },
            {
                name: 'Krzysztof Świadek',
                teamId: teamBId
            },
            {
                name: 'Marcin Olek',
                teamId: teamBId
            },
            {
                name: 'Wojciech Pławski',
                teamId: teamBId
            },
        ]);
    }
}

export const db = new AppDB();