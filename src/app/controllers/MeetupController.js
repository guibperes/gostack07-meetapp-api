import * as Yup from 'yup'
import { parseISO, isPast, subHours, addHours } from 'date-fns'
import { Op } from 'sequelize'

import { Meetup } from '../models/Meetup'
import { File } from '../models/File'

class MeetupController {
  async store (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { banner_id } = req.body

    const parsedDate = parseISO(req.body.date)

    if (isPast(parsedDate, Date.now())) {
      return res.status(400).json({
        message: 'Cannot create a meetup with a past date'
      })
    }

    const userHaveOne = await Meetup.findOne({
      where: {
        user_id: req.user,
        date: {
          [Op.between]: [subHours(parsedDate, 2), addHours(parsedDate, 2)]
        }
      }
    })

    if (userHaveOne) {
      return res.status(400).json({
        message: 'Cannot create two hour proximity meetups'
      })
    }

    if (banner_id) {
      const banner = await File.findOne({
        where: {
          id: banner_id,
          uploaded_by: req.user
        }
      })

      if (!banner) {
        return res.status(404).json({
          message: 'Cannot find banner with provided id'
        })
      }
    }

    const { id, title, description, location, date } = await Meetup.create({
      ...req.body,
      user_id: req.user
    })

    return res.json({ id, title, description, location, date })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number()
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

    const { id: meetupId } = req.params
    const { banner_id } = req.body

    const meetup = await Meetup.findOne({
      where: { id: meetupId, user_id: req.user }
    })

    if (!meetup) {
      return res.status(404).json({
        message: 'Meetup not founded with provided id'
      })
    }

    if (isPast(meetup.date, Date.now())) {
      return res.status(401).json({
        message: 'This meetup has already happened'
      })
    }

    if (banner_id) {
      const banner = await File.findOne({
        where: {
          id: banner_id,
          uploaded_by: req.user
        }
      })

      if (!banner) {
        return res.status(404).json({
          message: 'Cannot find banner with provided id'
        })
      }
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
