import Product from 'App/Models/Product'

class ProductService {

    public async findMany() {
        return await Product.query().preload('manufacturer')
    }

    public async create(product: Product) {
        return await Product.create(product)
    }

    public async update(id: number, fieldsToUpdate: Product) {
        const product = await Product.find(id)
        if (product) {
            product.merge(fieldsToUpdate)
            return await product.save()
        }
        return null
    }

    public async delete(id: number) {
        const product = await Product.find(id)
        if (product) {
            await product.delete()
            return true
        }
        return false
    }

}

export default new ProductService()