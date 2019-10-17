import { Router } from 'express'

import { upload } from './config/storage'
import { auth } from './middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import MeetupController from './app/controllers/MeetupController'
import ScheduleController from './app/controllers/ScheduleController'

const routes = new Router()

// PUBLIC ROUTES
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// PRIVATE ROUTES
routes.use(auth)
routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/meetups', MeetupController.store)
routes.put('/meetups/:id', MeetupController.update)

routes.get('/schedules', ScheduleController.index)

export default routes
