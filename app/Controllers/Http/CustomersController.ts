import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from 'App/Validations/CustomerValidation'

import { authService, customerService } from 'App/Services'
import { HttpCodes } from 'App/Utils'

import Customer from 'App/Models/Customer'

export default class CustomersController {

    public async store({ request, response, auth }: HttpContextContract) {
        const body = await request.validate(saveValidate) as any

        const customer = await customerService.create(
            body.email, body.password,
            { name: body.name, age: body.age, address: body.address } as Customer
        )
        
        if (customer) {
            const token = await authService.login(auth, body.email, body.password)
            return response.status(HttpCodes.Created).json(token)
        } else {
            return response.status(HttpCodes.BadRequest)
        }
    }

}