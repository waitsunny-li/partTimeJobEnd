/*
 * @Author: liweilong
 * @Date: 2020-11-29 17:15:55
 */
const express = require('express')
const {
  jobcontents,
  positions
} = require('../../models/themes')

const jobRouter = express.Router()

// show jobcontent.html
jobRouter.get('/', async (req, res, next) => {
  res.render('admin/jobcontent/jobcontent.html', {
    themeIndex: 3,
  })
})

// show add job
jobRouter.get('/add', async (req, res, next) => {
  res.render('admin/jobcontent/addjobcontent.html', {
    themeIndex: 3,
  })
})


module.exports = jobRouter