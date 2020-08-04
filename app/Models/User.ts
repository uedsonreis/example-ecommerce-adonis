import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public email: string

    @column()
    public password: string

    @column()
    public admin: boolean

    @column({ serializeAs: 'rememberMeToken' })
    public rememberMeToken?: string

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

}