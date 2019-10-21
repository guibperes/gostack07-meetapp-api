import { Op } from 'sequelize'
import { isPast, subHours, addHours } from 'date-fns'

import { Subscription } from '../models/Subscription'
import { Meetup } from '../models/Meetup'

class SubscriptionController {
  async store (req, res) {
    const { id: meetup_id } = req.params

    const meetup = await Meetup.findByPk(meetup_id)

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

    return res.json({ id, meetup_date })
  }
}

export default new SubscriptionController()
