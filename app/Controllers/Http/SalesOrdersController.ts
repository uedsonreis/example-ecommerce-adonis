import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from 'App/Validations/SalesOrder.Validation'
import { salesOrderService } from 'App/Services'
import { HttpCodes } from 'App/Utils'

import SalesOrder from 'App/Models/SalesOrder'
import Item from 'App/Models/Item'
import User from 'App/Models/User'

export default class SalesOrdersController {

    public async index({ request, response, auth }: HttpContextContract) {
        const salesOrders = await salesOrderService.findMany(auth.user as User, request.get() as SalesOrder)
        return response.status(HttpCodes.OK).json(salesOrders)
    }

    public async store({ request, response, auth }: HttpContextContract) {
        const body = await request.validate(saveValidate)

        const salesOrder = await salesOrderService.create(body.items as Item[], auth.user as User)
        return response.status(HttpCodes.Created).send(salesOrder)
    }

    public async delete({ params, auth, response }: HttpContextContract) {
        const wasDeleted = await salesOrderService.delete(auth.user as User, params.id)
        if (wasDeleted) {
            return response.status(HttpCodes.NoContent)
        } else {
            return response.status(HttpCodes.NotFound)
        }
    }

}