import { Repository } from 'App/Repositories'
import Product from 'App/Models/Product'

export class ProductService {

    constructor(private repository: Repository<Product>) {}

    public async findMany(filter?: Product) {
        return await this.repository.findMany({ filter, preload: 'manufacturer' })
    }

    public async create(product: Product) {
        return await this.repository.create(product)
    }

    public async update(id: number, fieldsToUpdate: Product) {
        return await this.repository.update(id, fieldsToUpdate)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

}