/*
 * @Author: liweilong
 * @Date: 2020-11-29 17:15:55
 */
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const {
  jobcontents,
  positions
} = require('../../models/themes')
const {env} = require('../index')
const result = require('../../lib/result')

// 配置上传路径
const upload = multer({
  dest: './public/upload/jobcontent'
})
const jobRouter = express.Router()

// show jobcontent.html
jobRouter.get('/', async (req, res, next) => {
  let jobcontentList = await jobcontents.find({})
  res.render('admin/jobcontent/jobcontent.html', {
    jobcontentList,
    themeIndex: 3
  })
})

// show add job
jobRouter.get('/add', async (req, res, next) => {
  let id = req.query.id
  const positionList = await positions.find({})
  const data = await jobcontents.findOne({_id: id})
  res.render('admin/jobcontent/addjobcontent.html', {
    positionList,
    themeIndex: 3,
    jobcontent: data
  })
})

// add job
jobRouter.post('/add', async (req, res, next) => {
  try {
    const r = await new jobcontents(req.body).save()
    res.json(result.ok('保存成功'))
  } catch(err) {
    console.log(err.errors);
    next(result.params_error(err.errors))
  }
})

// del jobcontent
jobRouter.post('/del', async (req, res, next) => {
  let id = req.body.id
  const r = await jobcontents.deleteOne({_id: id})
  if (r.ok && r.deletedCount == 1) {
    res.json(result.ok('删除成功'))
  } else {
    next(result.params_error('删除失败'))
  }
})

// edit jobcontent
jobRouter.post('/edit', async (req, res, next) => {
  let id = req.body.id
  delete req.body.id
  jobcontents.updateOne({
    _id: id
  }, req.body, (err, data) => {
    if (err) {
      next(result.params_error('更新失败'))
    }
    res.redirect('/admin/jobcontent')
  })
})

// 处理上传图片
jobRouter.post('/upload', upload.single('image_url'), (req, res, next) => {
  let {
    destination,
    originalname,
    filename
  } = req.file
  let oldPath = destination + '/' + filename
  let newPath = destination + '/' + filename + originalname
  fs.rename(oldPath, newPath, () => {
    let data = {}
    data.img_url = env + newPath.substring(1)
    res.json(result.back(data))
  })
})



module.exports = jobRouter