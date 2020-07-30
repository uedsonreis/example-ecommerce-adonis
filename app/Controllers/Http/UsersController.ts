import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from '../../Validations/UserValidation'

import User from "App/Models/User"
import { userService } from "App/Services"
import { HttpCodes } from 'App/Utils'

export default class UsersController {

    public async index({ request }: HttpContextContract) {
        return await userService.findMany(request.get() as User)
    }

    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(saveValidate)
        const saved = await userService.createAdmin(body as User)
        return response.status(HttpCodes.Created).json(saved)
    }

}