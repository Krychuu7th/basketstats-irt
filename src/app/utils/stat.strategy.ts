import { ShootingAction, StatType } from "../enums/match.enums";
import { ActionState } from "../models/match.models";
import { StatBuilder } from "./stat.builder";

export abstract class StatStrategy {
    state: ActionState = {
        actionStep: 0,
        statBuilder: new StatBuilder(),
        needPlayerSelection: false,
        shotValue: 0,
        isStatReady: false
    };

    abstract nextStep(value?: any): ActionState;
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
}

export class InviolatedShotStrategy extends ShotStrategy {

    constructor(shotValue: number) {
        super();
        this.state.shotValue = shotValue;
        this.state.actionStep = 1;
        this.state.actionMessage = 'Wybierz rzucającego';
        this.state.needPlayerSelection = true;
    }

    nextStep(value?: any): ActionState {
        switch (this.state.actionStep) {
            case 1: {
                return value ? this.finishStat(value) : this.state;
            }
            default:
                return this.state;
        }
    }

    private finishStat(value: any): ActionState {
        this.state.statBuilder.setPlayerId(value.playerId).setTeamId(value.teamId);
        this.state.isStatReady = true;
        return this.state;
    }
}

export class MadeShotStrategy extends InviolatedShotStrategy {
    override twoPointStatType = StatType["2PMADE"];
    override threePointStatType = StatType["3PMADE"];

    constructor(shotValue: number) {
        super(shotValue);
        this.state.action = ShootingAction.MADE;
        this.setStatType();
    }
}

export class MissedShotStrategy extends InviolatedShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(shotValue: number) {
        super(shotValue);
        this.state.action = ShootingAction.MISSED;
        this.setStatType();
    }
}

export abstract class ViolatedShotStrategy extends ShotStrategy {

    constructor(shotValue: number) {
        super();
        this.state.shotValue = shotValue;
        this.state.actionStep = 1;
        this.state.actionMessage = 'Wybierz rzucającego';
        this.state.needPlayerSelection = true;
    }

    abstract setRelatedStat(value: any): ActionState;
    abstract setRelatedActionMessage(): void;

    nextStep(value?: any): ActionState {
        switch (this.state.actionStep) {
            case 1: {
                return value ? this.setShooter(value) : this.state;
            }
            case 2: {
                return value ? this.finishStat(value) : this.state;
            }
            default:
                return this.state;
        }
    }

    private setShooter(value: any): ActionState {
        this.state.statBuilder.setPlayerId(value.playerId).setTeamId(value.teamId);
        this.state.actionStep = 2;
        this.setRelatedActionMessage();
        return this.state;
    }

    private finishStat(value: any): ActionState {
        this.setRelatedStat(value);
        this.state.isStatReady = true;
        return this.state;
    }
}

export class BlockedShotStrategy extends ViolatedShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(shotValue: number) {
        super(shotValue);
        this.state.action = ShootingAction.MISSED;
        this.setStatType();
    }

    setRelatedActionMessage(): void {
        this.state.actionMessage = 'Wybierz blokującego';
    }

    setRelatedStat(value: any): ActionState {
        const relatedBlockBuilder = new StatBuilder();
        relatedBlockBuilder.setType(StatType.BLK).setPlayerId(value.playerId).setTeamId(value.teamId);
        this.state.statBuilder.setRelatedStat(relatedBlockBuilder.build());
        return this.state;
    }
}

export class FouledShotStrategy extends ViolatedShotStrategy {

    // TODO: override nextStep function and add free throws step

    setRelatedActionMessage(): void {
        this.state.actionMessage = 'Wybierz faulującego';
    }

    setRelatedStat(value: any): ActionState {
        const relatedBlockBuilder = new StatBuilder();
        relatedBlockBuilder.setType(StatType.PF).setPlayerId(value.playerId).setTeamId(value.teamId);
        this.state.statBuilder.setRelatedStat(relatedBlockBuilder.build());
        return this.state;
    }
}

export class FouledMadeShotStrategy extends FouledShotStrategy {
    override twoPointStatType = StatType["2PMADE"];
    override threePointStatType = StatType["3PMADE"];

    constructor(shotValue: number) {
        super(shotValue);
        this.state.action = ShootingAction.MADE;
        this.setStatType();
    }
}

export class FouledMissedShotStrategy extends FouledMadeShotStrategy {
    override twoPointStatType = StatType["2PMISSED"];
    override threePointStatType = StatType["3PMISSED"];

    constructor(shotValue: number) {
        super(shotValue);
        this.state.action = ShootingAction.MISSED;
        this.setStatType();
    }
}