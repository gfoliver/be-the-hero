const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, city, state } = req.body
    
        const id = generateUniqueId()
    
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