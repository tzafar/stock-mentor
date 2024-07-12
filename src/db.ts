import sqlite3 from 'sqlite3';
import { User } from './users/user';
console.log('Setting up db...');
const db = new sqlite3.Database('./chinook.db');

console.log('Setting up table...');
db.serialize(() => {
  db.run('DROP TABLE users');
  db.run('CREATE TABLE users(userId number, username text)');
  db.run("INSERT INTO users (userId,username) VALUES  (1, 'Toseef'), (2, 'Zafar'), (3, 'Mirza')");
});

db.each('select * from users', (err: any, row: User) => {
  console.log(`create user with id ${row.userId}`);
});
