import { Request, Response, Router } from 'express'
import multer from 'multer'
import multerConfig from './config/upload-multer'

const uploadMulter = multer(multerConfig)

const routes = Router()

routes.post('/uploads', uploadMulter.single('file'), (req: Request, res: Response) => {
  console.log(req.file)

  return res.json({ message: 'Upload with NodeJS' })
})

export { routes }