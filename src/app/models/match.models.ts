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
}