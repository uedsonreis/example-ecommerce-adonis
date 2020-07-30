import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from 'App/Validations/ProductValidation'
import Product from 'App/Models/Product'

import { productService } from 'App/Services'
import { HttpCodes } from 'App/Utils'

export default class ProductsController {

    public async index({ request, response }: HttpContextContract) {
        const products = await productService.findMany(request.get() as Product)
        return response.status(HttpCodes.OK).json(products)
    }

    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(saveValidate) as Product
        const product = await productService.create(body)
        return response.status(HttpCodes.Created).json(product)
    }

    public async update({request, response, params}: HttpContextContract) {
        const body = request.post() as Product
        const product = await productService.update(params.id, body)

        if (product) {
            return response.status(HttpCodes.OK).json(product)
        } else {
            return response.status(HttpCodes.NotFound)
        }
    }

    public async delete({ response, params }: HttpContextContract) {
        const wasDeleted = await productService.delete(params.id)
        if (wasDeleted) {
            return response.status(HttpCodes.NoContent)
        } else {
            return response.status(HttpCodes.NotFound)
        }
    }

}