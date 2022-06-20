import { Request } from 'express'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req: Request, file, cb) {
      const hash = crypto.randomBytes(16).toString('hex')
      const filename = `${hash}-${file.originalname}`

      return cb(null, filename)
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req: Request, file, cb) => {
    const allowedMimes = [
      'image/png',
      'image/jpeg',
      'image/pjpeg',
      'image/gif'
    ]

    allowedMimes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type.'))
    }
}