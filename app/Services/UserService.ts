import User from 'App/Models/User'

class UserService {

    public async create(user: User) {
        return await User.create(user)
    }

}

export default new UserService()