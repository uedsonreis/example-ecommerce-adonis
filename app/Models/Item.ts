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


    @column()
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>


    @column()
    public salesOrderId: number

    @belongsTo(() => SalesOrder)
    public salesOrder: BelongsTo<typeof SalesOrder>


    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

}