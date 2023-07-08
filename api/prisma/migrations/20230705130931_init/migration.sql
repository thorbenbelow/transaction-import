-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "purpose" TEXT,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#00A5E3',

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Labeled" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,

    CONSTRAINT "Labeled_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Labeled_transaction_id_label_id_key" ON "Labeled"("transaction_id", "label_id");

-- AddForeignKey
ALTER TABLE "Labeled" ADD CONSTRAINT "Labeled_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labeled" ADD CONSTRAINT "Labeled_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
