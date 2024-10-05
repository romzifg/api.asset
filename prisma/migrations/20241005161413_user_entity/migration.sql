-- AlterTable
ALTER TABLE `customer` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `profile_picture` VARCHAR(191) NULL;
