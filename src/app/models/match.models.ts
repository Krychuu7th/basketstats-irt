import { MatchAction, StatType } from "../enums/match.enums";
import { StatBuilder } from "../utils/stat.builder";

export type Team = {
    id?: number,
    name: string,
    players?: Player[],
}

export type Player = {
    id?: number,
    name: string,
    teamId?: number,
}

export type StandardMatch = {
    teamA: Team,
    teamB: Team
};

export type ActionState = {
    actionStep: number,
    statBuilder: StatBuilder,
    needPlayerSelection: boolean,
    shotValue: number
    isStatReady: boolean,
    action?: MatchAction,
    actionMessage?: string | undefined,
    needFreeThrowsSelection: number,
    freeThrowsSet: number,
    canBeSkipped: boolean,
    statToBeDeterminedByPlayerSelection?: StatType,
};

export type ShotSpec = {
    value: number,
    x: number,
    y: number
};

export class Stat {
    type!: StatType;
    playerId?: number;
    teamId?: number;
    relatedStats: Stat[] = [];

    constructor(builder: StatBuilder) {
        this.type = builder.type;
        this.playerId = builder.playerId;
        this.teamId = builder.teamId;
        this.relatedStats = builder.relatedStats;
    }
};