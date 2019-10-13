import { Router } from 'express'

import { auth } from './middlewares/auth'
import { UserController } from './app/controllers/UserController'
import { SessionController } from './app/controllers/SessionController'

const routes = new Router()

const userController = new UserController()
const sessionController = new SessionController()

// PUBLIC ROUTES
routes.post('/users', userController.store)
routes.post('/sessions', sessionController.store)

// PRIVATE ROUTES
routes.use(auth)
routes.put('/users', userController.update)

export default routes
