import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidate = {
    schema: schema.create({
        items: schema.array().members(schema.object().members({
            productId: schema.number(),
            amount: schema.number(),
            price: schema.number()
        }))
    })
}