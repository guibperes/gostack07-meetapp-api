import * as Yup from 'yup'
import { parseISO, isPast } from 'date-fns'

import { Meetup } from '../models/Meetup'
import { File } from '../models/File'

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

    if (isPast(parseISO(req.body.date), Date.now())) {
      return res.status(400).json({
        message: 'Cannot create a meetup with a past date'
      })
    }

    const { id, title, description, location, date, banner } = await Meetup.create({
      ...req.body,
      user_id: req.user
    })

    return res.json({ id, title, description, location, date, banner })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    if (req.body.date && isPast(parseISO(req.body.date), Date.now())) {
      return res.status(400).json({
        message: 'Cannot update a meetup to a past date'
      })
    }

    if (req.body.banner) {
      const banner = await File.findByPk(req.body.banner)

      if (!banner) {
        return res.status(404).json({
          message: 'Cannot find banner with provided id'
        })
      }
    }

    const { id: meetupId } = req.params

    const meetup = await Meetup.findOne({
      where: { id: meetupId, user_id: req.user }
    })

    if (!meetup) {
      return res.status(401).json({
        message: 'You cannot update this meetup'
      })
    }

    if (isPast(meetup.date, Date.now())) {
      return res.status(401).json({
        message: 'This meetup has already happened'
      })
    }

    const {
      id,
      title,
      description,
      location,
      date
    } = await meetup.update(req.body)

    return res.json({ id, title, description, location, date })
  }
}

export default new MeetupController()
