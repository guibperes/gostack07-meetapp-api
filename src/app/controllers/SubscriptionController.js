import { Op } from 'sequelize'
import { isPast, subHours, addHours } from 'date-fns'

import Queue from '../../lib/Queue'
import { Meetup } from '../models/Meetup'
import { User } from '../models/User'
import { File } from '../models/File'
import SubscriptionMail from '../jobs/SubscriptionMail'

class SubscriptionController {
  async store (req, res) {
    /*
    const userSubscribed = await Subscription.findOne({
      where: {
        meetup_id,
        user_id: req.user
      }
    })

    if (userSubscribed) {
      return res.status(401).json({
        message: 'User already subscribed for this meetup'
      })
    }

    const userSubscribedOnTime = await Subscription.findOne({
      where: {
        user_id: req.user,
        meetup_date: {
          [Op.between]: [subHours(meetup.date, 2), addHours(meetup.date, 2)]
        }
      }
    })

    if (userSubscribedOnTime) {
      return res.status(401).json({
        message: 'User already subscribed for a meetup on this time'
      })
    }

    const { id, meetup_date } = await Subscription.create({
      meetup_id,
      user_id: req.user,
      meetup_date: meetup.date
    })

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user
    })

    return res.json({ id, meetup_date })
    */
    const { id: meetup_id } = req.params

    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          as: 'organizer'
        }
      ]
    })

    if (!meetup) {
      return res.status(400).json({
        message: 'Cannot find meetup with provided id'
      })
    }

    if (isPast(meetup.date, Date.now())) {
      return res.status(400).json({
        message: 'Cannot register to a past meetup'
      })
    }

    const user = await User.findByPk(req.user)

    if (!user) {
      return res.status(401).json({
        message: 'Cannot find user with provided token'
      })
    }

    return res.json()
  }

  async index (req, res) {
    /*
    const subscriptions = await User.findByPk(req.user, {
      include: {
        association: 'meetups',
        attributes: ['id']
      }
    })

    return res.json(subscriptions)
    */
    return res.json()
  }
}

export default new SubscriptionController()
