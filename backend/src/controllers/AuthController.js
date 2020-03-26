const connection = require('../database/connection')

module.exports = {
    async login(req, res) {
        const { id } = req.body

        const org = await connection('orgs')
            .where('id', id)
            .select('name')
            .first()

        if (org)
            return res.json({status: true, name: org.name})
        else
            return res.status(400).json({
                status: false,
                message: "Org not found"
            })
    }
}