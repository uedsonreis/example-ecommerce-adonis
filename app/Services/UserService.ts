import User from 'App/Models/User'
import { Repository } from 'App/Repositories'
import UserAlreadyExistsException from 'App/Exceptions/UserException'

export class UserService {

    constructor(private repository: Repository<User>) {}

    public async findOne(email: string) {
        return await this.repository.findOne("email", email)
    }

    public async findMany(filter?: User) {
        return await this.repository.findMany({ filter })
    }

    public async createAdmin(user: User) {
        const admin = { ...user, admin: true } as User
        return await this.create(admin)
    }

    public async createToCustomer(user: User) {
        const customerUser = { ...user, admin: false } as User
        return await this.create(customerUser)
    }

    private async create(user: User) {
        const alreadyExists = await this.repository.findOne('email', user.email)
        if (alreadyExists) throw new UserAlreadyExistsException(user.email)
        return await this.repository.create(user)
    }

}