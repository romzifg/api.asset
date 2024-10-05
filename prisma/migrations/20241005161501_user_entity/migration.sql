/*
  Warnings:

  - You are about to drop the column `serial_number` on the `asset` table. All the data in the column will be lost.
  - Added the required column `code` to the `asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset_history` DROP FOREIGN KEY `asset_history_customer_id_fkey`;

-- AlterTable
ALTER TABLE `asset` DROP COLUMN `serial_number`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `asset_history` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `customer_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `asset_history` ADD CONSTRAINT `asset_history_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
