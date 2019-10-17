import { Meetup } from '../models/Meetup'
import { File } from '../models/File'

class ScheduleController {
  async index (req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.user },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url']
        }
      ]
    })

    return res.json(meetups)
  }
}

export default new ScheduleController()
