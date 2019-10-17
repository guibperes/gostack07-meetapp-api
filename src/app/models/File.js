import Sequelize, { Model } from 'sequelize'

import { APP_URL } from '../../config/env'

export class File extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `${APP_URL}/files/${this.path}`
          }
        }
      },
      {
        sequelize
      }
    )

    return this
  }
}
