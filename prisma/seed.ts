import Database from 'better-sqlite3';
import path from 'path';


const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const db = new Database(dbPath);

// Delete existing records
db.prepare('DELETE FROM Character').run();
db.prepare('DELETE FROM User').run();

// Create users
const hashedPassword = 'password';
const userId = 'user-1';
const userId2 = 'user-2';

// Insert users
db.prepare('INSERT INTO User (id, username, password, createdAt) VALUES (?, ?, ?, ?)').run(
	userId, 
	'test', 
	hashedPassword, 
	new Date().toISOString()
);

db.prepare('INSERT INTO User (id, username, password, createdAt) VALUES (?, ?, ?, ?)').run(
	userId2, 
	'other', 
	hashedPassword, 
	new Date().toISOString()
);

// Insert test characters
const insertChar = db.prepare('INSERT INTO Character (gamesPlayed, gamesWon, userId) VALUES (?, ?, ?)');

insertChar.run(10, 7, userId);
insertChar.run(5, 2, userId2);

console.log('Seeding complete!');

// Verify
const characters = db.prepare('SELECT * FROM Character').all();
console.log('Characters in database:', characters);

const user = db.prepare('SELECT id, username FROM User').get();
console.log('User created:', user);

db.close();
