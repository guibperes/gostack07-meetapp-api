import { Router } from 'express'

import { auth } from './middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

const routes = new Router()

// PUBLIC ROUTES
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// PRIVATE ROUTES
routes.use(auth)
routes.put('/users', UserController.update)

export default routes
