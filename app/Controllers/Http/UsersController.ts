// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User"
import userService from "App/Services/UserService"

export default class UsersController {

    public async store(user: User) {
        user.admin = true
        return await userService.create(user)
    }

}