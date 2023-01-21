-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `githubUrl` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `visibility` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Project_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectCommit` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `createDate` DATETIME(3) NULL,
    `authorName` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ProjectCommit_projectId_idx`(`projectId`),
    UNIQUE INDEX `ProjectCommit_id_projectId_key`(`id`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectLanguage` (
    `projectId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `codeInBytes` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ProjectLanguage_projectId_name_key`(`projectId`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTag` (
    `projectId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ProjectTag_projectId_name_key`(`projectId`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
