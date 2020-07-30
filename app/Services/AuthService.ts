import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export class AuthService {

    public async login(auth: AuthContract, email: string, password: string) {
        const token = await auth.use('api').attempt(email, password, { expiresIn: '1 days' })
        return token.toJSON()
    }

    public async logged(auth: AuthContract) {
        await auth.use('api').authenticate()
        return auth.use('api').user
    }

    public async logout(auth: AuthContract) {
        await auth.use('api').logout()
    }

}