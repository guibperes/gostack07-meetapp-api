import express from 'express'
import morgan from 'morgan'

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
  }

  routes () {
    this.server.use(routes)
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
