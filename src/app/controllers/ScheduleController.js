import { Meetup } from '../models/Meetup'

class ScheduleController {
  async index (req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.user },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          association: 'banner',
          attributes: ['name', 'path', 'url']
        }
      ]
    })

    return res.json(meetups)
  }
}

export default new ScheduleController()
