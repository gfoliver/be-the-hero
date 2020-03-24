const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const org_id = req.headers.authorization

        const incidents = await connection('incidents')
            .where('org_id', org_id)
            .select('*')

        return res.json({
            status: true,
            incidents
        })
    }
}