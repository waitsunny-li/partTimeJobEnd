/*
 * @Author: liweilong
 * @Date: 2020-11-21 15:34:40
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://admin:123456@job.i4ig.com:27017/parttimejob', { useNewUrlParser: true });
const Schema = mongoose.Schema

const headerTitleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  link_url: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  created_time: {
    type: String,
    default: Date.now
  }
})

const headerTitles = mongoose.model('header', headerTitleSchema)

module.exports = {
  headerTitles
}