/*
 * @Author: liweilong
 * @Date: 2020-11-25 16:38:36
 */
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const {
  headerTitles
} = require('../../models/themes')
const result = require('../../lib/result')
const {
  env
} = require('../index')
// 配置上传路径
const upload = multer({
  dest: './public/upload/headerTitle'
})
// 路由实例
const headerTitleRouter = express.Router()

// 显示高薪就业页面
headerTitleRouter.get('/', (req, res, next) => {
  headerTitles.find({}, (err, data) => {
    if (err) {
      res.render('admin/500.html')
    }
    res.render('admin/headertitle/headertitle.html', {
      headerTitles: data,
      current: 2
    })
  })
})

// 显示添加头部导航界面
headerTitleRouter.get('/add', (req, res, next) => {
  let id = req.query.id
  if (!id) {
    res.render('admin/headertitle/addheadertitle.html', {
      current: 2
    })
  }

  headerTitles.findOne({
    _id: id
  }, (err, data) => {
    if (err) {
      next(result.servererror('获取数据失败'))
    }
    res.render('admin/headertitle/addheadertitle.html', {
      current: 2,
      headerTitle: data
    })
  })

})

// 编辑头部导航
headerTitleRouter.post('/edit', (req, res, next) => {
  let {
    title,
    link_url,
    id,
    img_url
  } = req.body
  headerTitles.updateOne({_id: id}, {title, link_url, img_url}, (err, data) => {
    if (err) {
      next(result.params_error('更新失败'))
    }
    res.redirect('/admin/headertitle')
  })

})

// 上传头部导航内容
headerTitleRouter.post('/add', (req, res, next) => {
  new headerTitles(req.body).save().then((data) => {
    res.json(result.ok('保存成功'))
  }).catch(err => {
    next(err)
  })
})

// 删除头部导航内容
headerTitleRouter.get('/del', (req, res, next) => {
  let id = req.query.id
  headerTitles.deleteOne({
    _id: id
  }).then(data => {
    res.json(result.ok('删除成功'))
  }).catch(err => {
    next(result.params_error('没有该标题！'))
  })
})

// 处理上传图片
headerTitleRouter.post('/upload', upload.single('headerTileimg'), (req, res, next) => {
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


module.exports = headerTitleRouter