-- CreateTable
CREATE TABLE "candidatos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "candidatos_numero_key" ON "candidatos"("numero");
