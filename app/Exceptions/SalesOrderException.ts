import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpCodes } from 'App/Utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new SalesOrderException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export class UserIsNotACustomerException extends Exception {

    constructor(username: string) {
        super(username, HttpCodes.BadRequest)
    }

    public async handle(error: this, { response }: HttpContextContract) {
        return response.status(error.status).send(`This username (${error.message}) does not belong to a Customer.`)
    }
}
