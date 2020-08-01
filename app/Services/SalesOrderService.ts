import Database from "@ioc:Adonis/Lucid/Database"

import Item from "App/Models/Item"
import User from "App/Models/User"
import SalesOrder from "App/Models/SalesOrder"
import Product from "App/Models/Product"

import { Repository } from "App/Repositories"
import { CustomerService } from "./CustomerService"
import { ProductService } from "./ProductService"

import { UserIsNotACustomerException } from "App/Exceptions/SalesOrderException"
import { OutOfStockException, ProductDoesNotExistException } from "App/Exceptions/ProductException"

export class SalesOrderService {

    constructor(
        private salesOrderRepository: Repository<SalesOrder>,
        private itemRepository: Repository<Item>,
        private customerService: CustomerService,
        private productService: ProductService
    ) {}

    public async create(items: Item[], user: User) {

        const trx = await Database.beginGlobalTransaction()

        let salesOrder: SalesOrder

        try {
            const total = items.reduce((total: number, item: Item) => (total + (item.price * item.amount)), 0)
            const customer = await this.customerService.get(user.email)
            if (!customer) {
                throw new UserIsNotACustomerException(user.email)
            }
    
            salesOrder = await this.salesOrderRepository.create({ total, customerId: customer.id } as SalesOrder)
    
            for (let item of items) {
                const product = await this.productService.get(item.productId)
    
                if (!product) throw new ProductDoesNotExistException(item.productId)
                if (product.stock < item.amount) throw new OutOfStockException(product.name)
    
                await this.productService.update(product.id, { stock: product.stock - item.amount } as Product)
                await this.itemRepository.create({ ...item, salesOrderId: salesOrder.id })
            }
            trx.commit()
            
        } catch (error) {
            trx.rollback()
            throw new Error(error)
        }

        return await this.salesOrderRepository.findMany({ filter: { id: salesOrder.id }, preload: 'items' })[0]
    }

    public async findMany(user: User, filter?: SalesOrder): Promise<SalesOrder[]> {
        const customer = await this.customerService.get(user.email)
        if (!customer) return []
        return await this.salesOrderRepository.findMany({ filter: { ...filter, customerId: customer.id }, preload: 'items' })
    }

    public async delete(user: User, id: number) {
        const salesOrder = await this.salesOrderRepository.findById(id)
        if (!salesOrder) return false
        
        const customer = await this.customerService.get(user.email)
        if (!customer) return false

        if (salesOrder.customerId !== customer.id) return false
        return await this.salesOrderRepository.delete(id)
    }

}