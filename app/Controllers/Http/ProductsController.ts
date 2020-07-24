import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'

export default class ProductsController {

    public async index() {
        return await Product.query().preload('manufacturer')
    }

    public async store({ request }: HttpContextContract) {
        const body = request.post()
        return Product.create(body)
    }

    public async update({request, response, params}: HttpContextContract) {
        const product = await Product.find(params.id)
        if (product) {
            product.merge(request.only(['name', 'price', 'stock']))
            product.save()
            return product
        } else {
            return response.status(404)
        }
    }

    public async delete({ response, params }: HttpContextContract) {
        const product = await Product.find(params.id)
        if (product) {
            product.delete()
            return response.status(204)
        } else {
            return response.status(404)
        }
    }

}