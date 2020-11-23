/*
 * @Author: liweilong
 * @Date: 2020-11-21 13:43:59
 */
const express = require('express')
const themes = require('../models/themes')

const themesRouter = express.Router()

themesRouter.get('/', (req, res) => {
  res.render('index.html', {
    name: 'liweilong'
  })
})

module.exports = themesRouter

