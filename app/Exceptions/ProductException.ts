import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpCodes } from '../Utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| throw new OutOfStockException('iPhone XR')
|
*/
export class OutOfStockException extends Exception {

    constructor(product: string) {
        super(product, HttpCodes.BadRequest)
    }

    public async handle(error: this, { response }: HttpContextContract) {
        return response.status(error.status).send(`The product (${error.message.toLowerCase()}) is out of stock.`)
    }

}