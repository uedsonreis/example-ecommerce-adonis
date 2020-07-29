import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { saveValidate } from '../../Validations/UserValidation'

import User from "App/Models/User"
import userService from "App/Services/UserService"
import { HttpCodes } from '../../Utils'

export default class UsersController {

    public async index() {
        return await User.all()
    }

    public async store({ request, response }: HttpContextContract) {
        const body = await request.validate(saveValidate)
        const user = { ...body, admin: true } as User
        const saved = await userService.create(user)
        return response.status(HttpCodes.Created).json(saved)
    }

}