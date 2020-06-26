import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrders1593048351113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'orderId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userCpf',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'orderValue',
            type: 'numeric',
          },
          {
            name: 'cashbackPercentage',
            type: 'int',
          },
          {
            name: 'cashbackValue',
            type: 'numeric',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserOrder',
            columnNames: ['userCpf'],
            referencedColumnNames: ['cpf'],
            referencedTableName: 'users',
            onDelete: 'SET NULL', // RESTRICTED, SET NULL, CASCADE
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
