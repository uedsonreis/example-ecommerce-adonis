import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import Product from './Product'
import SalesOrder from './SalesOrder'

export default class Item extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public price: number

    @column()
    public amount: number


    @column({ serializeAs: 'productId' })
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>


    @column({ serializeAs: 'salesOrderId' })
    public salesOrderId: number

    @belongsTo(() => SalesOrder)
    public salesOrder: BelongsTo<typeof SalesOrder>


    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

}