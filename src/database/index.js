import Sequelize from 'sequelize'

import dbConfig from '../config/database'
import { User } from '../app/models/User'
import { File } from '../app/models/File'
import { Meetup } from '../app/models/Meetup'
import { Subscription } from '../app/models/Subscription'

export class Database {
  constructor () {
    this.models = [
      User,
      File,
      Meetup,
      Subscription
    ]

    this.init()
  }

  init () {
    this.connection = new Sequelize(dbConfig)

    this.models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}
