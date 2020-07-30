import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidate = {
    schema: schema.create({
        email: schema.string(),
        password: schema.string(),
        name: schema.string(),
        age: schema.number(),
        address: schema.string()
    }),
    messages: {
        'email.required': 'Email is required to save a new Customer',
        'password.required': 'Password is required to save a new Customer',
        'name.required': 'Name is required to save a new Customer',
        'age.required': 'Age is required to save a new Customer',
        'address.required': 'Address is required to save a new Customer'
    }
}