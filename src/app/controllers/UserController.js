import * as Yup from 'yup'

import { User } from '../models/User'
import { File } from '../models/File'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      avatar_id: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail, avatar_id } = req.body

    const userExists = await User.findOne({ where: { email: bodyEmail } })

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    if (avatar_id) {
      const avatar = await File.findByPk(avatar_id)

      if (!avatar) {
        return res.status(404).json({
          message: 'Cannot find avatar with provided id'
        })
      }
    }

    const { id, name, email } = await User.create(req.body)

    return res.json({ id, name, email })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: Yup.string().min(6),
      avatar_id: Yup.number()
    })

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json(error)
    }

    const { email: bodyEmail, oldPassword, avatar_id } = req.body

    const user = await User.findByPk(req.user)

    if (bodyEmail && bodyEmail !== user.email) {
      const emailExists = User.findOne({ where: { email: bodyEmail } })

      if (emailExists) {
        return res.status(400).json({
          message: 'Email is already in use'
        })
      }
    }

    if (oldPassword) {
      const isValidPassword = await user.verifyPassword(oldPassword)

      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Password does not match'
        })
      }
    }

    if (avatar_id) {
      const avatar = await File.findByPk(avatar_id)

      if (!avatar) {
        return res.status(404).json({
          message: 'Cannot find avatar with provided id'
        })
      }
    }

    const { id, name, email } = await user.update(req.body)

    return res.json({ id, name, email })
  }
}

export default new UserController()
