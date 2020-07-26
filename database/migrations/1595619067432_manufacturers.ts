import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Manufacturers extends BaseSchema {
    protected tableName = 'manufacturers'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name').notNullable()
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}