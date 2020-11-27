/*
 * @Author: liweilong
 * @Date: 2020-11-27 09:12:33
 */
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const result = require('../../lib/result')
const {
  env
} = require('../index')
const {
  slideActives
} = require('../../models/themes')

// 配置图片上传路径
const upload = multer({
  dest: './public/upload/slideactives'
})
const slideRouter = express.Router()

// 活动展示内容
slideRouter.get('/', (req, res, next) => {
  slideActives.find({}, (err, data) => {
    if (err) {
      res.render('admin/500.html')
    }
    res.render('admin/slideactive/slideactives.html', {
      current: 3,
      slideActives: data
    })
  })
})

// 活动展示添加界面
slideRouter.get('/add', (req, res, next) => {
  let id = req.query.id
  if (id) {
    slideActives.findOne({
      _id: id
    }, (err, data) => {
      if (err) {
        next(result.params_error(err))
      }
      res.render('admin/slideactive/addslideactive.html', {
        current: 3,
        slideActive: data
      })
    })
  } else {
    res.render('admin/slideactive/addslideactive.html', {
      current: 3
    })
  }
})

// 编辑活动展示界面
slideRouter.post('/edit', (req, res, next) => {
  let id = req.body.id
  delete req.body.id
  slideActives.updateOne({
    _id: id
  }, req.body, (err, data) => {
    if (err) {
      console.log(err);
      next(result.params_error('更新失败'))
    }
    res.redirect('/admin/slideactive')
  })
})

// 添加展示内容
slideRouter.post('/add', (req, res, next) => {
  let {
    title,
    desc,
    link_url,
    btn_text,
  } = req.body
  if (title && desc && link_url && btn_text) {
    new slideActives(req.body).save().then(data => {
      res.json(result.ok('添加成功'))
    }).catch(err => {
      next(result.params_error(err))
    })
  } else {
    next(result.params_error('请输入填写完整'))
  }

})

// 删除内容
slideRouter.get('/del', (req, res, next) => {
  let id = req.query.id
  if (!id) next(result.params_error('删除失败'))
  slideActives.deleteOne({
    _id: id
  }).then(data => {
    res.json(result.ok('删除成功'))
  }).catch(err => {
    next(result.servererror(err))
  })
})

// 活动展示图片上传
slideRouter.post('/upload', upload.single('img_url'), (req, res, next) => {
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


module.exports = slideRouter