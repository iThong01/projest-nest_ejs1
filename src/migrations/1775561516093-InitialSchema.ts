import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1775561516093 implements MigrationInterface {
    name = 'InitialSchema1775561516093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transection\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`transection\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`totalprice\` \`totalprice\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`totalitem\` \`totalitem\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`transection\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`created-at\` \`created-at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`order_id\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`order_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`product_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`total_price\` \`total_price\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`price_at_purchase\` \`price_at_purchase\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`price\` \`price\` double NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`count\` \`count\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`lname\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`lname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`user\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`user\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`role\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`date\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`date\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`name\` varchar(90) NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`role\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`password\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`user\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`user\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`email\` varchar(90) NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`lname\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`lname\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`login\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`login\` ADD \`name\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`count\` \`count\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` CHANGE \`price\` \`price\` double NULL`);
        await queryRunner.query(`ALTER TABLE \`shop\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`shop\` ADD \`name\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`price_at_purchase\` \`price_at_purchase\` double NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`total_price\` \`total_price\` double NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`quantity\` \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`product_id\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`order_id\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`order_id\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`created-at\` \`created-at\` timestamp(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`transection\` ADD \`status\` varchar(45) NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`totalitem\` \`totalitem\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` CHANGE \`totalprice\` \`totalprice\` double NULL`);
        await queryRunner.query(`ALTER TABLE \`transection\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`transection\` ADD \`userId\` varchar(90) NOT NULL`);
    }

}
