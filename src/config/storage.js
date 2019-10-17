import { resolve, extname } from 'path'
import crypto from 'crypto'
import multer from 'multer'

export const upload = multer({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) callback(err, null)

        return callback(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
})
