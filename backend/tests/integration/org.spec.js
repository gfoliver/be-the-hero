const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })
    
    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new org', async () => {
        const response = await request(app)
            .post('/orgs')
            .send({
                name: "Org de Teste",
                email: "guilhermefleckoliveira@gmail.com",
                whatsapp: "5199999999",
                city: "Porto Alegre",
                state: "RS"
            })
        
        expect(response.body).toHaveProperty('status')
        expect(response.body.status).toBe(true)
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

})