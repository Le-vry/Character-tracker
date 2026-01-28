/*
  Warnings:

  - You are about to drop the column `name` on the `Character` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gamesPlayed" INTEGER NOT NULL,
    "gamesWon" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("gamesPlayed", "gamesWon", "id", "userId") SELECT "gamesPlayed", "gamesWon", "id", "userId" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
