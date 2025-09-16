/*
  Warnings:

  - Added the required column `descricao` to the `candidatos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_candidatos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL
);
INSERT INTO "new_candidatos" ("id", "imagemUrl", "nome", "numero", "partido") SELECT "id", "imagemUrl", "nome", "numero", "partido" FROM "candidatos";
DROP TABLE "candidatos";
ALTER TABLE "new_candidatos" RENAME TO "candidatos";
CREATE UNIQUE INDEX "candidatos_numero_key" ON "candidatos"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
