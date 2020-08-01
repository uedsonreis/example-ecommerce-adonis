import { Repository } from '../Repositories'

import { AuthService } from './AuthService'
import { UserService } from './UserService'
import { ProductService } from './ProductService'
import { CustomerService } from './CustomerService'
import { SalesOrderService } from './SalesOrderService'

import User from 'App/Models/User'
import Product from 'App/Models/Product'
import Customer from 'App/Models/Customer'
import SalesOrder from 'App/Models/SalesOrder'
import Item from 'App/Models/Item'

export const authService = new AuthService()
export const userService = new UserService(new Repository<User>(User))
export const productService = new ProductService(new Repository<Product>(Product))
export const customerService = new CustomerService(new Repository<Customer>(Customer), userService)

export const salesOrderService = new SalesOrderService(
    new Repository<SalesOrder>(SalesOrder), new Repository<Item>(Item),
    customerService, productService
)
