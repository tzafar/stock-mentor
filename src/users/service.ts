import sqlite3 from 'sqlite3';
import { User } from './user';

const db = new sqlite3.Database('./chinook.db');

export function addUser(user: User): User {
  db.exec(`'insert into users (userId, username) values (1, 'toseef')`);
  return user;
}

export async function list() {
  return new Promise((resolve, reject) => {
    db.all('select * from users', [], (err, rows: User[]) => {
      if (err) {
        reject(`Error reading data : ${err}`);
      }

      let users: User[] = [];
      rows.forEach((row) => {
        users.push(row);
      });
      resolve(users);
    });
  });
}
