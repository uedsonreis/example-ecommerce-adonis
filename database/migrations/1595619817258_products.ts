import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
    protected tableName = 'products'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name').notNullable()
            table.decimal('price').notNullable()
            table.integer('stock').notNullable()
            table.integer('manufacturer_id').notNullable().references('id').inTable('manufacturers')
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}