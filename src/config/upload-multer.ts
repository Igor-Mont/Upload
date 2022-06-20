import { Request } from 'express'
import { S3Client } from '@aws-sdk/client-s3'
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
      file.key = `${hash}-${file.originalname}`

      return cb(null, file.key)
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: 'us-east-1',      
    }),
    bucket: 'nodejs-portfolio',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl : 'public-read',
    key: (req: Request, file, cb) => {
      const hash = crypto.randomBytes(16).toString('hex')
      const filename = `${hash}-${file.originalname}`

      return cb(null, filename)
    }
  })
}

export default {
  storage: storageTypes[process.env.STORAGE_TYPE],
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