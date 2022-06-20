import { Schema, model } from 'mongoose'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const s3 = new aws.S3()

const PostSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

PostSchema.pre('save', function () {
  if(!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

PostSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === 's3') {
    s3.deleteObject({
      Bucket: 'nodejs-portfolio',
      Key: this.key
    }).promise()
  } else {
      promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
})

const Post = model('Post', PostSchema)

export { Post }

