import test from 'japa'
import supertest from 'supertest'

import { HttpCodes } from 'App/Utils'
import Product from 'App/Models/Product'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Products Controller', () => {

    test('Products list', async (assert) => {
        console.log('List all products')
        let response = await supertest(BASE_URL).get('/products').expect(HttpCodes.OK)
        assert.isArray(response.body)
        
        console.log('List filtered products')
        response = await supertest(BASE_URL).get('/products').query({ manufacturerId: 1 }).expect(HttpCodes.OK)
        assert.isArray(response.body)
    })

    test('Create new product', async (assert) => {
        console.log('Create a product without login')
        let newProduct = { name: 'Produto 1', stock: 100, price: 1000, manufacturerId: 1 } as Product
        await supertest(BASE_URL).post('/products').send(newProduct).expect(HttpCodes.Unauthorized)
        
        console.log('Login with admin')
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`
        
        console.log('Create a new product')
        const response = await supertest(BASE_URL).post('/products').set('Authorization', token).send(newProduct).expect(HttpCodes.Created)
        assert.property(response.body, 'id')
        assert.typeOf(response.body.id, 'number')

        console.log('Create a product without manufacturer')
        newProduct = { name: 'Produto 1', stock: 100, price: 1000 } as Product
        await supertest(BASE_URL).post('/products').set('Authorization', token).send(newProduct).expect(HttpCodes.Unprocessable)
    })

    test('Update product', async (assert) => {
        console.log('Update a product without login')
        let product = { stock: 50, price: 4499, manufacturerId: 1 } as Product
        await supertest(BASE_URL).put('/products/1').send(product).expect(HttpCodes.Unauthorized)
        
        console.log('Login with admin')
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`
        
        console.log('Update a product')
        const response = await supertest(BASE_URL).put('/products/1').set('Authorization', token).send(product).expect(HttpCodes.OK)
        assert.property(response.body, 'id')
        assert.typeOf(response.body.id, 'number')

        console.log('Update a product with an invalid id')
        await supertest(BASE_URL).put('/products/10').set('Authorization', token).send(product).expect(HttpCodes.NotFound)
    })

    test('Delete product', async () => {
        console.log('Delete a product without login')
        await supertest(BASE_URL).delete('/products/5').expect(HttpCodes.Unauthorized)
        
        console.log('Login with admin')
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`
        
        console.log('Delete a product')
        await supertest(BASE_URL).delete('/products/5').set('Authorization', token).expect(HttpCodes.NoContent)

        console.log('Delete a product with an invalid id')
        await supertest(BASE_URL).put('/products/50').set('Authorization', token).expect(HttpCodes.NotFound)
    })

})
