import { ShootingAction, StatType } from "../enums/match.enums";
import { MatchProcessService } from "../match-process/match-process.service";
import { ActionState } from "../models/match.models";
import { StatBuilder } from "./stat.builder";

export abstract class StatStrategy {
    state: ActionState = {
        actionStep: 0,
        statBuilder: new StatBuilder(),
        needPlayerSelection: false,
        shotValue: 0,
        isStatReady: false,
        needFreeThrowsSelection: 0,
        freeThrowsSet: 0
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
}

export class FouledMadeShotStrategy extends FouledShotStrategy {
    override twoPointStatType = StatType["2PMADE"];
    override threePointStatType = StatType["3PMADE"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MADE_WITH_FOUL;
        this.setStatType();
    }
}

export class FouledMissedShotStrategy extends FouledMadeShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(matchProcessService: MatchProcessService, shotValue: number) {
        super(matchProcessService, shotValue);
        this.state.action = ShootingAction.MISSED_WITH_FOUL;
        this.setStatType();
    }
}