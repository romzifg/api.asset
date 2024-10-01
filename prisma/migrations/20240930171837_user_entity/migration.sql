/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `entryYear` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `instagramAccount` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `waNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `landingpage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mastercompanyindustry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usereducation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userworkingexperience` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entry_year` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram_account` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wa_number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usereducation` DROP FOREIGN KEY `UserEducation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userworkingexperience` DROP FOREIGN KEY `UserWorkingExperience_industryId_fkey`;

-- DropForeignKey
ALTER TABLE `userworkingexperience` DROP FOREIGN KEY `UserWorkingExperience_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `approvedAt`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `entryYear`,
    DROP COLUMN `instagramAccount`,
    DROP COLUMN `profilePicture`,
    DROP COLUMN `updateddAt`,
    DROP COLUMN `waNumber`,
    ADD COLUMN `approved_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `entry_year` INTEGER NOT NULL,
    ADD COLUMN `instagram_account` VARCHAR(191) NOT NULL,
    ADD COLUMN `profile_picture` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `wa_number` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `landingpage`;

-- DropTable
DROP TABLE `mastercompanyindustry`;

-- DropTable
DROP TABLE `usereducation`;

-- DropTable
DROP TABLE `userworkingexperience`;

-- CreateTable
CREATE TABLE `user_education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `start_year` INTEGER NOT NULL,
    `end_year` INTEGER NOT NULL,
    `graduation` INTEGER NOT NULL,
    `major` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_working_experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `start_year` INTEGER NOT NULL,
    `end_year` INTEGER NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `industry_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `landing_page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `sub_title` VARCHAR(191) NULL,
    `header_description` VARCHAR(191) NOT NULL,
    `content_description` VARCHAR(191) NOT NULL,
    `image_content_1` VARCHAR(191) NOT NULL,
    `image_content_2` VARCHAR(191) NOT NULL,
    `image_content_3` VARCHAR(191) NOT NULL,
    `image_content_4` VARCHAR(191) NOT NULL,
    `image_content_5` VARCHAR(191) NOT NULL,
    `footer_description` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `master_company_industry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_education` ADD CONSTRAINT `user_education_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_working_experience` ADD CONSTRAINT `user_working_experience_industry_id_fkey` FOREIGN KEY (`industry_id`) REFERENCES `master_company_industry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_working_experience` ADD CONSTRAINT `user_working_experience_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
