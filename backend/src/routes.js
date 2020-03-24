const { Router } = require('express')
const OrgController = require('./controllers/OrgController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const AuthController = require('./controllers/AuthController')

const routes = Router()

// Get all orgs
routes.get('/orgs', OrgController.index)

// Create org
routes.post('/orgs', OrgController.create)

// Get all incidents
routes.get('/incidents', IncidentController.index)

// Create incident
routes.post('/incidents', IncidentController.create)

// Delete incident
routes.delete('/incidents/:id', IncidentController.delete)

// Get incidents by org
routes.get('/profile', ProfileController.index)

// Login
routes.post('/login', AuthController.login)

module.exports = routes