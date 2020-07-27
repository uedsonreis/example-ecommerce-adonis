import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidate = {
    schema: schema.create({
        name: schema.string(),
        price: schema.number(),
        stock: schema.number(),
        manufacturerId: schema.number()
    }),
    messages: {
        'name.required': 'Name is required to save a new Product',
        'price.required': 'Price is required to save a new Product',
        'price.number': 'Price must be a number',
    }
}