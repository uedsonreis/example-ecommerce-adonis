import { Repository } from 'App/Repositories'
import Customer from 'App/Models/Customer'
import { UserService } from './UserService'
import User from 'App/Models/User'

export class CustomerService {

    constructor(private repository: Repository<Customer>, private userService: UserService) {}

    public async create(email: string, password: string, customer: Customer) {
        const user = await this.userService.createToCustomer({ email, password } as User)
        const customerDB = await this.repository.create({ ...customer, userId: user.id })
        return { customer: customerDB, user }
    }

}