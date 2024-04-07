export enum StatType {
    '2PMISSED' = '2PMISSED',
    '2PMADE' = '2PMADE',
    '3PMISSED' = '3PMISSED',
    '3PMADE' = '3PMADE',
    FTMISSED = 'FTMISSED',
    FTMADE = 'FTMADE',
    AST = 'AST',
    OREB = 'OREB',
    DREB = 'DREB',
    BLK = 'BLK',
    STL = 'STL',
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
    // 'MADE' = 'MADE',
    // 'MISSED' = 'MISSED',
    // 'MADE_WITH_FOUL' = 'MADE_WITH_FOUL',
    // 'MISSED_WITH_FOUL' = 'MISSED_WITH_FOUL',
    // 'BLOCKED' = 'BLOCKED',
}

export type MatchAction = ShootingAction | NonShootingAction;