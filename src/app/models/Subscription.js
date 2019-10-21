import Sequelize, { Model } from 'sequelize'

export class Subscription extends Model {
  static init (sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        meetup_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    )

    return this
  }
}
