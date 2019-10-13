import * as Yup from 'yup'

import { User } from '../models/User'

export class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail } = req.body

    const userExists = await User.findOne({ where: { email: bodyEmail } })

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const { id, name, email, provider } = await User.create(req.body)

    return res.json({ id, name, email, provider })
  }

  async update (req, res) {
    console.log(req.user)

    return res.json({ ok: true })
  }
}
