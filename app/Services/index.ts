import { Repository } from '../Repositories'

import { AuthService } from './AuthService'
import { UserService } from './UserService'
import { ProductService } from './ProductService'
import { CustomerService } from './CustomerService'

import User from 'App/Models/User'
import Product from 'App/Models/Product'
import Customer from 'App/Models/Customer'

export const authService = new AuthService()
export const userService = new UserService(new Repository<User>(User))
export const productService = new ProductService(new Repository<Product>(Product))
export const customerService = new CustomerService(new Repository<Customer>(Customer), userService)