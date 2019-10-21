import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export class User extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  static associate (models) {
    this.belongsTo(
      models.File,
      {
        foreignKey: 'avatar_id',
        as: 'avatar'
      }
    )

    this.belongsToMany(
      models.Meetup,
      {
        through: 'subscriptions',
        foreignKey: 'meetup_id',
        as: 'meetups'
      }
    )
  }

  verifyPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
