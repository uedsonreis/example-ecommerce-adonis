import { schema } from '@ioc:Adonis/Core/Validator'

export const saveValidate = {
    schema: schema.create({
        email: schema.string(),
        password: schema.string()
    }),
    messages: {
        'email.required': 'Email is required to save a new User',
        'password.required': 'Password is required to save a new User'
    }
}