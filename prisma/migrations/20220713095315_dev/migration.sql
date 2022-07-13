-- CreateTable
CREATE TABLE "Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "url" TEXT,
    "logoUrl" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BannedAccounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountID" INTEGER NOT NULL,
    "expirationDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserLogins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_name_key" ON "Restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_email_key" ON "Restaurant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_url_key" ON "Restaurant"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BannedAccounts_accountID_key" ON "BannedAccounts"("accountID");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogins_refreshToken_key" ON "UserLogins"("refreshToken");
