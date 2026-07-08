-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('INR', 'USD', 'EUR', 'GBP');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."levels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."compensation_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" DOUBLE PRECISION NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "bonus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCompensation" DOUBLE PRECISION NOT NULL,
    "currency" "public"."Currency" NOT NULL DEFAULT 'INR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compensation_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_normalizedName_key" ON "public"."companies"("normalizedName");

-- CreateIndex
CREATE INDEX "companies_normalizedName_idx" ON "public"."companies"("normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "roles_title_key" ON "public"."roles"("title");

-- CreateIndex
CREATE UNIQUE INDEX "levels_name_key" ON "public"."levels"("name");

-- CreateIndex
CREATE INDEX "levels_rank_idx" ON "public"."levels"("rank");

-- CreateIndex
CREATE INDEX "compensation_records_companyId_idx" ON "public"."compensation_records"("companyId");

-- CreateIndex
CREATE INDEX "compensation_records_roleId_idx" ON "public"."compensation_records"("roleId");

-- CreateIndex
CREATE INDEX "compensation_records_levelId_idx" ON "public"."compensation_records"("levelId");

-- CreateIndex
CREATE INDEX "compensation_records_location_idx" ON "public"."compensation_records"("location");

-- CreateIndex
CREATE INDEX "compensation_records_yearsOfExperience_idx" ON "public"."compensation_records"("yearsOfExperience");

-- CreateIndex
CREATE INDEX "compensation_records_totalCompensation_idx" ON "public"."compensation_records"("totalCompensation");

-- CreateIndex
CREATE UNIQUE INDEX "compensation_records_userId_companyId_roleId_levelId_locati_key" ON "public"."compensation_records"("userId", "companyId", "roleId", "levelId", "location", "yearsOfExperience");

-- AddForeignKey
ALTER TABLE "public"."compensation_records" ADD CONSTRAINT "compensation_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compensation_records" ADD CONSTRAINT "compensation_records_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compensation_records" ADD CONSTRAINT "compensation_records_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."compensation_records" ADD CONSTRAINT "compensation_records_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "public"."levels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
