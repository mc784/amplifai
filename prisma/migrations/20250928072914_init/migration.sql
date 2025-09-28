-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "originalFilename" TEXT,
    "fileType" TEXT,
    "lessonJson" TEXT NOT NULL,
    "subject" TEXT,
    "gradeLevel" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "lessons_contentHash_key" ON "lessons"("contentHash");
