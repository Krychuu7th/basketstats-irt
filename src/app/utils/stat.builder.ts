import { StatType } from "../enums/match.enums";
import { Stat } from "../models/match.models";

export class StatBuilder {
  type!: StatType;
  playerId?: number;
  teamId?: number;
  relatedStats: Stat[] = [];


  setType(value: StatType): StatBuilder {
    this.type = value;
    return this;
  }

  setPlayerId(value: number): StatBuilder {
    this.playerId = value;
    return this;
  }

  setTeamId(value: number): StatBuilder {
    this.teamId = value;
    return this;
  }


  addRelatedStats(value: Stat[] | Stat): StatBuilder {
    this.relatedStats = this.relatedStats.concat(Array.isArray(value) ? [...value] : value);
    return this;
  }

  build(): Stat {
    return new Stat(this);
  }
}