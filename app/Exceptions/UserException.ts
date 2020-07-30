import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'
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
| new UserException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/

export default class UserAlreadyExistsException extends Exception {

    constructor(email: string) {
        super(email, HttpCodes.BadRequest)
    }

    public async handle(error: this, { response }: HttpContextContract) {
        return response.status(error.status).send(`This email (${error.message.toLowerCase()}) is already registered to another user.`)
    }

}
