import mongoose from 'mongoose'
import http from './http'

const PORT = 3000

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Connected with database 📦`)
    http.listen(PORT, () => console.log(`Server is running on port ${PORT} 🔥`))
  })
  .catch(err => console.error(err))