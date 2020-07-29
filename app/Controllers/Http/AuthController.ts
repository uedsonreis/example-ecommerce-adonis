import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpCodes } from 'App/Utils'

export default class AuthController {

    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        const token = await auth.use('api').attempt(email, password, { expiresIn: '1 days' })
        return token.toJSON()
    }

    public async logged({ auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        return auth.use('api').user
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('api').logout()
        return response.status(HttpCodes.NoContent)
    }

}