import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpCodes } from 'App/Utils'

import { authService } from 'App/Services'

export default class AuthController {

    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        return await authService.login(auth, email, password)
    }

    public async logged({ auth }: HttpContextContract) {
        return await authService.logged(auth)
    }

    public async logout({ auth, response }: HttpContextContract) {
        authService.logout(auth)
        return response.status(HttpCodes.NoContent)
    }

}