import { Request } from 'express'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

const storageTypes = {
  local: multer.diskStorage({
    destination: uploadFolder,
    filename(req: Request, file, cb) {
      const hash = crypto.randomBytes(16).toString('hex')
      const filename = `${hash}-${file.originalname}`

      return cb(null, filename)
    },
  }),
  s3: multerS3
}

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