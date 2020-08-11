import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Items extends BaseSchema {
    protected tableName = 'items'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.float('price')
            table.integer('amount')
            table.integer('product_id').notNullable().references('id').inTable('products')
            table.integer('sales_order_id').notNullable().references('id').inTable('sales_orders').onDelete('CASCADE')
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }

}