import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import Youch from 'youch'

import { IS_DEV, APP_PORT } from './config/env'
import { Database } from './database'
import routes from './routes'

class App {
  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(morgan(IS_DEV ? 'dev' : 'common'))
    this.errorHandler()
    this.notFoundHandler()
  }

  routes () {
    this.server.use(routes)
  }

  errorHandler () {
    this.server.use((err, req, res, next) => {
      if (IS_DEV) {
        const errors = new Youch(err, req).toJSON()

        return res.status(500).json(errors)
      }

      return res.status(500).json({
        message: 'Internal Server Error'
      })
    })
  }

  notFoundHandler () {
    this.server.use('*', (req, res) => {
      return res
        .status(404)
        .json({ message: 'This route is not provided' })
    })
  }

  async start () {
    try {
      await new Database()
      await this.server.listen(APP_PORT)

      console.log(`Server started on port ${APP_PORT}`)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
}

export default new App()
