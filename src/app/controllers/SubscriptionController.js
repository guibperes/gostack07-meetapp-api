import { isPast } from 'date-fns'

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

    const { id } = await Subscription.create({
      meetup_id,
      user_id: req.user
    })

    return res.json({ id })
  }
}

export default new SubscriptionController()
