-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_booksId_fkey";

-- CreateTable
CREATE TABLE "_BooksToCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BooksToCategories_AB_unique" ON "_BooksToCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_BooksToCategories_B_index" ON "_BooksToCategories"("B");

-- AddForeignKey
ALTER TABLE "_BooksToCategories" ADD CONSTRAINT "_BooksToCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BooksToCategories" ADD CONSTRAINT "_BooksToCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
