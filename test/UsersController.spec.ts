import test from 'japa'
import supertest from 'supertest'

import { HttpCodes } from 'App/Utils'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Users Controller', () => {

    test('Login with wrong credentials', async () => {
        console.log('Login with wrong credentials')
        const user = { email: 'abcdef', password: '123456' }
        await supertest(BASE_URL).post('/login').send(user).expect(HttpCodes.BadRequest)
    })

    test('List all users', async (assert) => {
        console.log('List all users')
        const user = { email: 'admin', password: 'admin' }

        const { body: { token } } = await supertest(BASE_URL).post('/login').send(user).expect(HttpCodes.OK)

        const { body: list } = await supertest(BASE_URL).get('/users').set('Authorization', `Bearer ${token}`).expect(HttpCodes.OK)
        assert.isArray(list)

        await supertest(BASE_URL).delete('/login').set('Authorization', `Bearer ${token}`).expect(HttpCodes.NoContent)
    })

    test('Create a new User', async (assert) => {
        console.log('Create a new User')
        const admin = { email: 'admin', password: 'admin' }
        const { body: { token } } = await supertest(BASE_URL).post('/login').send(admin).expect(HttpCodes.OK)

        const user = { email: 'uedson', password: 'reis' }
        const { body } = await supertest(BASE_URL).post('/users').set('Authorization', `Bearer ${token}`).send(user).expect(HttpCodes.Created)
        assert.property(body, 'id')
    })

    test('Create a new Customer', async (assert) => {
        console.log('Create a new Customer')
        const customer = { email: 'jose', password: '123', name: 'José da Silva', age: 27, address: 'Endereço 123' }
        const { body } = await supertest(BASE_URL).post('/customers').send(customer).expect(HttpCodes.Created)
        assert.property(body, 'token')
        assert.typeOf(body.token, 'string')
    })

})
