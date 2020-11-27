/*
 * @Author: liweilong
 * @Date: 2020-11-21 15:34:40
 */
const mongoose = require('mongoose')
const {
  topHeaderSchema,
  headerTitleSchema,
  bannerActivesSchema,
  bannerJobSchema
} = require('./schema')

mongoose.connect('mongodb://admin:123456@job.i4ig.com:27017/parttimejob', {
  useNewUrlParser: true
});
const Schema = mongoose.Schema

// 头部滚动模型
const topHeaderSche = new Schema(topHeaderSchema)
const topHeaders = mongoose.model('topheader', topHeaderSche)

// 高薪兼职模型
const headerTitleSche = new Schema(headerTitleSchema)
const headerTitles = mongoose.model('header', headerTitleSche)

// 滚动图片模型
const bannerActivesSche = new Schema(bannerActivesSchema)
const slideActives = mongoose.model('banneractive', bannerActivesSche)

// 滚动图片模型
const bannerJobSche = new Schema(bannerJobSchema)
const bannerJobs = mongoose.model('bannerjob', bannerJobSche)



module.exports = {
  topHeaders,
  headerTitles,
  slideActives,
  bannerJobs
}