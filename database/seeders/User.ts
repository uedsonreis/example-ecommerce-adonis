import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from 'App/Models/Customer'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {

    public async run() {
        await User.create({
            email: 'admin',
            password: 'admin',
            admin: true
        })

        const user = await User.create({
            email: 'joao',
            password: '123',
            admin: false
        })

        await Customer.create({
            name: 'João das Neves',
            age: 40,
            address: 'Endereço 123',
            userId: user.id
        })
    }

}