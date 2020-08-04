import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Customer from './Customer'
import Item from './Item'

export default class SalesOrder extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public total: number

    @column({ serializeAs: 'customerId' })
    public customerId: number

    @belongsTo(() => Customer)
    public customer: BelongsTo<typeof Customer>

    @hasMany(() => Item)
    public items: HasMany<typeof Item>

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

}
