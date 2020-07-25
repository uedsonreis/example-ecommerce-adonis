import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {

    public async run() {
        await Product.createMany([
            { name: 'iPhone 8 Plus', price: 4999.0, stock: 5, manufacturerId: 1 },
            { name: 'iPhone XR', price: 5999.0, stock: 10, manufacturerId: 1 },
            { name: 'Galaxy S9', price: 3999.0, stock: 8, manufacturerId: 2 },
            { name: 'Galaxy S10', price: 4999.0, stock: 11, manufacturerId: 2 },
        ])
    }

}