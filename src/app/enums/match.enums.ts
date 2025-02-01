export enum StatType {
    '2PMISSED' = '2PMISSED',
    '2PMADE' = '2PMADE',
    '3PMISSED' = '3PMISSED',
    '3PMADE' = '3PMADE',
    FTMISSED = 'FTMISSED',
    FTMADE = 'FTMADE',
    AST = 'AST',
    BLK = 'BLK',
    STL = 'STL',
    DREB = 'DREB',
    OREB = 'OREB',
    TO = 'TO',
    PF = 'PF',
}

export enum ShootingAction {
    MADE = 'MADE',
    MISSED = 'MISSED',
    MADE_WITH_FOUL = 'MADE_WITH_FOUL',
    MISSED_WITH_FOUL = 'MISSED_WITH_FOUL',
    BLOCKED = 'BLOCKED',
}

export enum NonShootingAction {
    STL = 'STL',
    DREB = 'DREB',
    OREB = 'OREB',
    TO = 'TO',
    PF = 'PF'
}

export type MatchAction = ShootingAction | NonShootingAction;