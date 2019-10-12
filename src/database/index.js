import Sequelize from 'sequelize'

import dbConfig from '../config/database'
import { User } from '../app/models/User'

export class Database {
  constructor () {
    this.models = [
      User
    ]

    this.init()
  }

  init () {
    this.connection = new Sequelize(dbConfig)

    this.models.map(model => model.init(this.connection))
  }
}
