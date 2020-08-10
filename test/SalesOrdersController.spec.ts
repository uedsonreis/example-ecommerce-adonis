import test from 'japa'
import supertest from 'supertest'

import { HttpCodes } from 'App/Utils'
import Item from 'App/Models/Item'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Sales Orders Controller', () => {

    test('Sales Orders list', async (assert) => {
        console.log('List all sales orders without login')
        await supertest(BASE_URL).get('/sales/orders').expect(HttpCodes.Unauthorized)
        
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`

        console.log('List all sales orders')
        let response = await supertest(BASE_URL).get('/sales/orders').set('Authorization', token).expect(HttpCodes.OK)
        assert.isArray(response.body)
        
        console.log('List filtered sales orders')
        response = await supertest(BASE_URL).get('/sales/orders').set('Authorization', token).query({ productId: 1 }).expect(HttpCodes.OK)
        assert.isArray(response.body)
    })

    test('Create new sales order', async (assert) => {
        console.log('Create a sales order without login')
        let items = [{ productId: 1, price: 1000, amount: 1 }] as Item[]
        await supertest(BASE_URL).post('/sales/orders').send(items).expect(HttpCodes.Unauthorized)
        
        console.log('Login with admin')
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`
        
        console.log('Create a new product')
        const response = await supertest(BASE_URL).post('/sales/orders').set('Authorization', token).send(items).expect(HttpCodes.Created)
        assert.property(response.body, 'id')
        assert.typeOf(response.body.id, 'number')

        console.log('Create a product without manufacturer')
        items = [{ price: 1000, amount: 1 }] as Item[]
        await supertest(BASE_URL).post('/products').set('Authorization', token).send(items).expect(HttpCodes.Unprocessable)
    })

    test('Delete product', async () => {
        console.log('Delete a sales order without login')
        await supertest(BASE_URL).delete('/sales/orders/1').expect(HttpCodes.Unauthorized)
        
        console.log('Login with admin')
        const admin = { email: 'admin', password: 'admin' }
        const { body } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)
        const token = `Bearer ${body.token}`
        
        console.log('Delete a sales order')
        await supertest(BASE_URL).delete('/sales/orders/1').set('Authorization', token).expect(HttpCodes.NoContent)

        console.log('Delete a sales order with an invalid id')
        await supertest(BASE_URL).put('/sales/orders/10').set('Authorization', token).expect(HttpCodes.NotFound)
    })

})
