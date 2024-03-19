import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TableName } from '../enums/database-enums';
import { db } from './database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // db: any;
  // teams$ = liveQuery(() => db.teams.toArray());
  // teamName = 'Drużynka testowa';
  // constructor() { }

  // async addNewList() {
  //   await db.teams.add({
  //     name: this.teamName,
  //   });
  // }

  // identifyList(index: number, list: Team) {
  //   return `${list.id}${list.name}`;
  // }

  async addRecord(tableName: TableName, value: any): Promise<any> {
    const t1 = await db.table(tableName)
      .add(value)
      .then((data: any) => console.log(data))
      .catch((err: any) => console.log(err.message));
    return of(t1);
  }
}
