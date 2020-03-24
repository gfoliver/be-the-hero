const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, city, state } = req.body
    
        const id = crypto.randomBytes(4).toString('HEX')
    
        try {
            await connection('orgs').insert({
                id,
                name, 
                email, 
                whatsapp, 
                city, 
                state
            })
    
            return res.json({
                status: true,
                id
            })
        }
        catch(e) {
            return res.json({
                status: false,
                error: e
            })
        }
    },
    async index(req, res) {
        const orgs = await connection('orgs').select('*')

        return res.json({
            status: true,
            orgs
        })
    }
}