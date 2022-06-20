import { Request, Response, Router } from 'express'
import { Post } from './models/post'
import multer from 'multer'
import multerConfig from './config/upload-multer'

const uploadMulter = multer(multerConfig)

const routes = Router()

routes.get("/posts", async (req: Request, res: Response) => {
  const posts = await Post.find();

  return res.json(posts);
});

routes.post('/uploads', uploadMulter.single('file'), async (req: Request, res: Response) => {
  const { originalname: name, size, key, location: url = '' } = req.file

  const post = await Post.create({
    name,
    size,
    key,
    url
  })

  return res.json(post)
})

routes.delete("/posts/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

export { routes }