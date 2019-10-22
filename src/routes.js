import { Router } from 'express'

import { upload } from './config/storage'
import { auth } from './middlewares/auth'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import MeetupController from './app/controllers/MeetupController'
import ScheduleController from './app/controllers/ScheduleController'
import SubscriptionController from './app/controllers/SubscriptionController'

const routes = new Router()

// PUBLIC ROUTES
routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// PRIVATE ROUTES
routes.use(auth)
routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/meetups', MeetupController.store)
routes.get('/meetups', MeetupController.index)
routes.put('/meetups/:id', MeetupController.update)
routes.delete('/meetups/:id', MeetupController.delete)
routes.post('/meetups/:id/subscribe', SubscriptionController.store)

routes.get('/subscriptions', SubscriptionController.index)

routes.get('/schedules', ScheduleController.index)

export default routes
