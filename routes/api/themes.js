/*
 * @Author: liweilong
 * @Date: 2020-11-21 13:43:59
 */
const express = require('express')
const themes = require('../../models/themes')
const {
  topHeaders,
  headerTitles,
  slideActives,
  bannerJobs,
  positions,
  jobcontents
} = require('../../models/themes')
const result = require('../../lib/result')
const jobRouter = require('../admin/jobcontent')

const themesRouter = express.Router()

// api头部轮播小程序获取
themesRouter.get('/topheaders', (req, res, next) => {
  topHeaders.find({}, (err, data) => {
    if (err) {
      next(result.servererror('无法获取数据'))
    }
    res.json(result.back(data))
  })
})

// api头部轮播小程序添加
themesRouter.post('/topheaders/add', async (req, res, next) => {
  try {
    const r = await new topHeaders(req.body.data).save()
    res.json(result.ok('保存成功'))
  } catch(e) {
    next(result.params_error('标题不能为空'))
  }
})

// api头部轮播小程序删除
themesRouter.post('/topheaders/del', async (req, res, next) => {
  const id = req.body.id
  const r = await topHeaders.deleteOne({
    _id: id
  })
  if (r.ok && r.deletedCount == 1) {
    res.json(result.ok('删除成功'))
  } else {
    res.json(result.params_error('删除失败'))
  }
})

// api头部导航小程序获取
themesRouter.get('/headertitles', (req, res, next) => {
  headerTitles.find({}, (err, data) => {
    if (err) {
      next(result.servererror('无法获取数据'))
    }
    res.json(result.back(data))
  })
})

// api头部导航小程序获取
themesRouter.get('/slideactives', (req, res, next) => {
  slideActives.find({}, (err, data) => {
    if (err) {
      next(result.servererror('无法获取数据'))
    }
    res.json(result.back(data))
  })
})

// api头部导航小程序获取
themesRouter.get('/bannerjobs', async (req, res, next) => {
  const data = await bannerJobs.find({})
  res.json(result.back(data))
})

// api position cate
themesRouter.get('/positions', async (req, res, next) => {
  const data = await positions.find({})
  res.json(result.back(data))
})

// api jobcontent 
themesRouter.get('/jobcontents', async (req, res, next) => {
  let {
    page,
    cate
  } = req.query
  let page_num = page ? page : 1
  let pageSize = parseInt(page_num) * 2
  const data = await jobcontents.find({
    position: cate
  }).limit(pageSize)
  res.json(result.back(data))
})

// api a search of cate
themesRouter.post('/jobcontents/search', async (req, res, next) => {
  const data = await jobcontents.find({
    position: req.body.name
  })
  res.json(result.back(data))
})



module.exports = themesRouter