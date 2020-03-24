const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const {page = 1} = req.query

        const [ total ] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('orgs', 'orgs.id', '=', 'incidents.org_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'orgs.name', 
                'orgs.email', 
                'orgs.whatsapp',
                'orgs.city',
                'orgs.state'
            ])

        res.header('X-Total-Count', total['count(*)'])
        res.header('X-Total-Pages', Math.ceil(total['count(*)'] / 5))

        return res.json({
            status: true,
            incidents
        })
    },

    async create(req, res) {
        const { title, description, value } = req.body
        const org_id = req.headers.authorization

        try {
            const [ id ] = await connection('incidents').insert({
                title,
                description,
                value,
                org_id
            })
    
            return res.json({
                status: true,
                id
            })
        } catch (e) {
            return res.json({
                status: false,
                error: e
            })
        }
    },

    async delete(req, res) {
        const { id } = req.params
        const org_id = req.headers.authorization

        try {
            const incident = await connection('incidents')
                .where('id', id)
                .select('org_id')
                .first()

            if (! incident) {
                throw new Error('Incident not found')
            }

            if (incident.org_id !== org_id) {
                return res.status(401).json({
                    status: false,
                    message: "Org not allowed"
                })
            }

            await connection('incidents').where('id', id).delete()

            return res.json({
                status: true,
                message: "Incident deleted"
            })
        }
        catch(error) {
            return res.json({
                status: false,
                error: error.message
            })
        }
    }
}