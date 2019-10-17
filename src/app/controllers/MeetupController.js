import * as Yup from 'yup'

import { Meetup } from '../models/Meetup'

class MeetupController {
  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { id, title, description, location, date, banner } = await Meetup.create({
      ...req.body,
      user_id: req.user
    })

    return res.json({ id, title, description, location, date, banner })
  }
}

export default new MeetupController()
