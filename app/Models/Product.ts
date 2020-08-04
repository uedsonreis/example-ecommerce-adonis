import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Manufacturer from './Manufacturer'

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public price: number

    @column()
    public stock: number

    @column({ serializeAs: 'manufacturerId' })
    public manufacturerId: number

    @belongsTo(() => Manufacturer)
    public manufacturer: BelongsTo<typeof Manufacturer>

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime
}
