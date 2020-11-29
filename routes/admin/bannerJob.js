/*
 * @Author: liweilong
 * @Date: 2020-11-27 12:17:18
 */
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const {
  bannerJobs
} = require('../../models/themes')
const result = require('../../lib/result')
const {
  env
} = require('../index')
// 配置上传路径
const upload = multer({
  dest: './public/upload/bannerjobs'
})
// 路由实例
const bannerJobRouter = express.Router()

// 显示轮播工作内容
bannerJobRouter.get('/', (req, res, next) => {
  bannerJobs.find({}, (err, data) => {
    if (err) {
      res.render('admin/500.html')
    }
    res.render('admin/bannerjob/bannerjob.html', {
      bannerjobs: data,
      current: 4,
      themeIndex: 1
    })
  })
})

// 显示添加轮播
bannerJobRouter.get('/add', (req, res, next) => {
  let id = req.query.id
  if (!id) {
    res.render('admin/bannerjob/addbannerjob.html', {
      current: 4,
      themeIndex: 1
    })
  } else {
    bannerJobs.findOne({
      _id: id
    }, (err, data) => {
      if (err) {
        console.log(err);
        next(result.servererror('获取数据失败'))
      }
      res.render('admin/bannerjob/addbannerjob.html', {
        current: 4,
        bannerjob: data,
        themeIndex: 1
      })
    })
  }

})


// 编辑活动展示界面
bannerJobRouter.post('/edit', async (req, res, next) => {
  let id = req.body.id
  delete req.body.id
  const r = await bannerJobs.updateOne({
    _id: id
  }, req.body)
  console.log(r);
  if (r.ok) {
    res.redirect('/admin/bannerjob')
  } else {
    next(result.servererror('编辑失败'))
  }
})


// 删除轮播
bannerJobRouter.get('/del', async (req, res, next) => {
  const r = await bannerJobs.deleteOne({
    _id: req.query.id
  })
  
  if (r.deletedCount && r.ok) {
    res.json(result.ok('删除成功'))
  } else {
    next(result.params_error('没有该标题！'))
  }
})

// 添加轮播内容
bannerJobRouter.post('/add', async (req, res, next) => {
  const r = await new bannerJobs(req.body).save()
  if (r) {
    res.json(result.ok('保存成功'))
  } else {
    next(result.params_error('添加失败'))
  }
})

// 处理上传图片
bannerJobRouter.post('/upload', upload.single('img'), (req, res, next) => {
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

module.exports = bannerJobRouter