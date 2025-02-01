import { NonShootingAction, ShootingAction, StatType } from "../enums/match.enums";
import { MatchProcessService } from "../match-process/match-process.service";
import { ActionState, Player } from "../models/match.models";
import { StatBuilder } from "./stat.builder";

export abstract class StatStrategy {
    state: ActionState = {
        actionStep: 0,
        statBuilder: new StatBuilder(),
        needPlayerSelection: false,
        shotValue: 0,
        isStatReady: false,
        needFreeThrowsSelection: 0,
        freeThrowsSet: 0,
        canBeSkipped: false,
    };

    matchProcessService: MatchProcessService;

    constructor(matchProcessService: MatchProcessService) {
        this.matchProcessService = matchProcessService;
    }

    protected finishStat(): void {
        this.state.actionMessage = undefined;
        this.state.needPlayerSelection = false;
        this.state.isStatReady = true;
        this.matchProcessService.actionMade(this.state);
        this.matchProcessService.pushMatchStat(this.state.statBuilder.build());
    }

    abstract nextStep(value?: any): void;
    protected abstract get actionMessages(): string[];
}

export abstract class ShotStrategy extends StatStrategy {
    protected twoPointStatType!: StatType;
    protected threePointStatType!: StatType;

    protected setStatType(): void {
        if (this.state.shotValue === 2) {
            this.state.statBuilder.setType(this.twoPointStatType);
        } else {
            this.state.statBuilder.setType(this.threePointStatType);
        }
    }

    protected abstract setShooter(player: any): void;

    protected setRelatedActionMessage(): void {
        this.state.actionMessage = this.actionMessages[this.state.actionStep - 1];
    };

    protected get actionMessages(): string[] {
        return ['Wybierz rzucającego'];
    }
}

export class InviolatedShotStrategy extends ShotStrategy {

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService);
        this.state.shotValue = shotValue;
        this.state.actionStep = 1;
        this.state.needPlayerSelection = true;
        this.state.needFreeThrowsSelection = 0;
        this.setRelatedActionMessage();
    }

    nextStep(value?: any): void {
        switch (this.state.actionStep) {
            case 1: {
                this.setShooter(value);
                break;
            }
            default:
                this.matchProcessService.actionMade(this.state);
                break;
        }
    }

    protected setShooter(player: any): void {
        if (player) {
            this.state.statBuilder.setPlayerId(player.id).setTeamId(player.teamId);
            this.finishStat();
        } else {
            this.matchProcessService.actionMade(this.state);
        }
    }
}

export class MadeShotStrategy extends InviolatedShotStrategy {
    override twoPointStatType = StatType["2PMADE"];
    override threePointStatType = StatType["3PMADE"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MADE;
        this.setStatType();
    }

    override nextStep(value?: any): void {
        switch (this.state.actionStep) {
            case 1: {
                this.setShooter(value);
                break;
            }
            case 2: {
                this.setAssist(value);
                break;
            }
            default:
                this.matchProcessService.actionMade(this.state);
                break;
        }
    }

    override get actionMessages(): string[] {
        return ['Wybierz rzucającego', 'Wybierz asystującego'];
    }

    override setShooter(player: any): void {
        if (player) {
            this.state.statBuilder.setPlayerId(player.id).setTeamId(player.teamId);
            this.state.actionStep = 2;
            this.state.canBeSkipped = true;
            this.state.statToBeDeterminedByPlayerSelection = StatType.AST;
            this.setRelatedActionMessage();
        }
        this.matchProcessService.actionMade(this.state);
    }

    protected setAssist(player: any): void {
        if (player) {
            const relatedBlockBuilder = new StatBuilder();
            relatedBlockBuilder.setType(StatType.AST).setPlayerId(player.id).setTeamId(player.teamId);
            this.state.statBuilder.addRelatedStats(relatedBlockBuilder.build());
        }
        this.finishStat();
    }
}

export class MissedShotStrategy extends InviolatedShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MISSED;
        this.setStatType();
    }
}

export abstract class ViolatedShotStrategy extends ShotStrategy {

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService);
        this.state.shotValue = shotValue;
        this.state.actionStep = 1;
        this.state.needPlayerSelection = true;
        this.setRelatedActionMessage();
    }

    abstract setRelatedStat(value: any): void;

    nextStep(value?: any): void {
        switch (this.state.actionStep) {
            case 1: {
                this.setShooter(value);
                break;
            }
            case 2: {
                this.setViolation(value);
                break;
            }
            default: {
                this.matchProcessService.actionMade(this.state);
                break;
            }
        }
    }

    protected setShooter(player: any): void {
        if (player) {
            this.state.statBuilder.setPlayerId(player.id).setTeamId(player.teamId);
            this.state.actionStep = 2;
            this.setStatToBeDeterminedByPlayerSelection();
            this.setRelatedActionMessage();
        }
        this.matchProcessService.actionMade(this.state);
    }

    protected setViolation(value: any): void {
        if (value) {
            this.setRelatedStat(value);
            this.setRelatedActionMessage();
            this.state.isStatReady = true;
            this.finishStat();
        }

        this.matchProcessService.actionMade(this.state);
    }

    protected setStatToBeDeterminedByPlayerSelection(): void {
        // NOT IMPLEMENTED
    }
}

export class BlockedShotStrategy extends ViolatedShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.BLOCKED;
        this.setStatType();
    }

    setRelatedStat(player: any): void {
        const relatedBlockBuilder = new StatBuilder();
        relatedBlockBuilder.setType(StatType.BLK).setPlayerId(player.id).setTeamId(player.teamId);
        this.state.statBuilder.addRelatedStats(relatedBlockBuilder.build());
    }

    override get actionMessages(): string[] {
        return ['Wybierz rzucającego', 'Wybierz blokującego'];
    }

    override setStatToBeDeterminedByPlayerSelection(): void {
        this.state.statToBeDeterminedByPlayerSelection = StatType.BLK;
    }
}

export class FouledShotStrategy extends ViolatedShotStrategy {

    override nextStep(value?: any): void {
        switch (this.state.actionStep) {
            case 1: {
                this.setShooter(value);
                break;
            }
            case 2: {
                this.setViolation(value);
                break;
            }
            case 3: {
                this.setFreeThrows(value);
                break;
            }
            default:
                this.matchProcessService.actionMade(this.state);
                break;
        }

    }

    override setViolation(value: any): void {
        if (value) {
            this.setRelatedStat(value);
            this.state.needPlayerSelection = false;
            this.state.needFreeThrowsSelection = this.getFreeThrowsQuantity();
            this.state.actionStep = 3;
            this.setRelatedActionMessage();
        }

        this.matchProcessService.actionMade(this.state);
    }

    setRelatedStat(player: any): void {
        const relatedBlockBuilder = new StatBuilder();
        relatedBlockBuilder.setType(StatType.PF).setPlayerId(player.id).setTeamId(player.teamId);
        this.state.statBuilder.addRelatedStats(relatedBlockBuilder.build());
    }

    setFreeThrows(value: any): void {
        const relatedFreeThrowBuilder = new StatBuilder();
        relatedFreeThrowBuilder.setType(value ? StatType.FTMADE : StatType.FTMISSED).setPlayerId(this.state.statBuilder.playerId!).setTeamId(this.state.statBuilder.teamId!);
        this.state.statBuilder.addRelatedStats(relatedFreeThrowBuilder.build());
        this.state.freeThrowsSet++;
        if (this.state.freeThrowsSet === this.state.needFreeThrowsSelection) {
            this.finishStat();
        }
    }

    getFreeThrowsQuantity(): number {
        if (this.state.action === ShootingAction.MISSED_WITH_FOUL) {
            return this.state.shotValue === 2 ? 2 : 3;
        }

        return 1;
    }

    override get actionMessages(): string[] {
        return ['Wybierz rzucającego', 'Wybierz faulującego', 'Rzuty wolne'];
    }

    override setStatToBeDeterminedByPlayerSelection(): void {
        this.state.statToBeDeterminedByPlayerSelection = StatType.PF;
    }
}

export class FouledMadeShotStrategy extends FouledShotStrategy {
    override twoPointStatType = StatType["2PMADE"];
    override threePointStatType = StatType["3PMADE"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MADE_WITH_FOUL;
        this.setStatType();
    }

    override nextStep(value?: any): void {
        switch (this.state.actionStep) {
            case 1: {
                this.setShooter(value);
                break;
            }
            case 2: {
                this.setAssist(value);
                break;
            }
            case 3: {
                this.setViolation(value);
                break;
            }
            case 4: {
                this.setFreeThrows(value);
                break;
            }
            default:
                this.matchProcessService.actionMade(this.state);
                break;
        }
    }

    override setShooter(player: any): void {
        if (player) {
            this.state.statBuilder.setPlayerId(player.id).setTeamId(player.teamId);
            this.state.actionStep = 2;
            this.state.canBeSkipped = true;
            this.state.statToBeDeterminedByPlayerSelection = StatType.AST;
            this.setRelatedActionMessage();
        }
        this.matchProcessService.actionMade(this.state);
    }

    protected setAssist(player: any): void {
        if (player) {
            const relatedBlockBuilder = new StatBuilder();
            relatedBlockBuilder.setType(StatType.AST).setPlayerId(player.id).setTeamId(player.teamId);
            this.state.statBuilder.addRelatedStats(relatedBlockBuilder.build());
        }

        this.state.actionStep = 3;
        this.state.needPlayerSelection = true;
        this.state.canBeSkipped = false;
        this.state.statToBeDeterminedByPlayerSelection = StatType.PF;
        this.setRelatedActionMessage();

        this.matchProcessService.actionMade(this.state);
    }

    override setViolation(value: any): void {
        if (value) {
            this.setRelatedStat(value);
            this.state.needPlayerSelection = false;
            this.state.needFreeThrowsSelection = this.getFreeThrowsQuantity();
            this.state.actionStep = 4;
            this.setRelatedActionMessage();
        }

        this.matchProcessService.actionMade(this.state);
    }

    override get actionMessages(): string[] {
        return ['Wybierz rzucającego', 'Wybierz asystującego', 'Wybierz faulującego', 'Rzuty wolne'];
    }
}

export class FouledMissedShotStrategy extends FouledShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MISSED_WITH_FOUL;
        this.setStatType();
    }
}

export abstract class PlayerBasedStatStrategy extends StatStrategy {
    protected player!: Player;

    constructor(matchProcessService: MatchProcessService, player: Player) {
        super(matchProcessService);
        this.player = player;
    }

    override get actionMessages(): string[] {
        throw [];
    }

    protected setPlayerBasedStat(statType: StatType) {
        this.state.statBuilder.setType(statType).setPlayerId(this.player.id!).setTeamId(this.player.teamId!);
    }
}

export class DefensiveReboundStrategy extends PlayerBasedStatStrategy {
    override nextStep(value?: any): void {
        this.state.action = NonShootingAction.DREB;
        this.setPlayerBasedStat(StatType.DREB);
        this.finishStat();
    }
}

export class OffensiveReboundStrategy extends PlayerBasedStatStrategy {
    override nextStep(value?: any): void {
        this.state.action = NonShootingAction.OREB;
        this.setPlayerBasedStat(StatType.OREB);
        this.finishStat();
    }

}

export class TurnoverStrategy extends PlayerBasedStatStrategy {
    override nextStep(value?: any): void {
        this.state.action = NonShootingAction.TO;
        this.setPlayerBasedStat(StatType.TO);
        this.finishStat();
    }

}

export class PersonalFoulStrategy extends PlayerBasedStatStrategy {
    override nextStep(value?: any): void {
        this.state.action = NonShootingAction.PF;
        this.setPlayerBasedStat(StatType.PF);
        this.finishStat();
    }

}

export class StealStrategy extends PlayerBasedStatStrategy {

    constructor(matchProcessService: MatchProcessService, player: Player) {
        super(matchProcessService, player);
    }

    override nextStep(value?: any): void {
        console.log(this.state.actionStep)
        switch (this.state.actionStep) {
            case 0: {
                this.setSteal();
                break;
            }
            case 1: {
                this.setTurnover(value);
                break;
            }
            default:
                this.matchProcessService.actionMade(this.state);
                break;
        }

    }

    override get actionMessages(): string[] {
        return ['Przypisz stratę'];
    }

    setSteal(): void {
        this.state.statBuilder.setType(StatType.STL).setPlayerId(this.player.id!).setTeamId(this.player.teamId!);
        this.state.actionStep = 1;
        this.state.needPlayerSelection = true;
        this.state.statToBeDeterminedByPlayerSelection = StatType.TO;
        this.setRelatedActionMessage();
        this.matchProcessService.actionMade(this.state);
    }

    setTurnover(player: Player): void {
        const relatedBlockBuilder = new StatBuilder();
        relatedBlockBuilder.setType(StatType.TO).setPlayerId(player.id!).setTeamId(player.teamId!);
        this.state.statBuilder.addRelatedStats(relatedBlockBuilder.build());
        this.finishStat();
    }

    setRelatedActionMessage(): void {
        this.state.actionMessage = this.actionMessages[this.state.actionStep - 1];
    };
}