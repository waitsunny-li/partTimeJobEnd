/*
 * @Author: liweilong
 * @Date: 2020-11-21 13:43:59
 */
const express = require('express')
const themes = require('../../models/themes')
const {
  topHeaders,
  headerTitles
} = require('../../models/themes')
const result = require('../../lib/result')

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

// api头部导航小程序获取
themesRouter.get('/headertitles', (req, res, next) => {
  headerTitles.find({}, (err, data) => {
    if (err) {
      next(result.servererror('无法获取数据'))
    }
    res.json(result.back(data))
  })
})

module.exports = themesRouter

