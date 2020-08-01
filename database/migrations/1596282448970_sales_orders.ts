import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SalesOrders extends BaseSchema {
    protected tableName = 'sales_orders'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.float('total')
            table.integer('customer_id').notNullable().references('id').inTable('customers')
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }

}