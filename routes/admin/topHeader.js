/*
 * @Author: liweilong
 * @Date: 2020-11-24 09:18:38
 */
const express = require('express')
const {
  topHeaders
} = require('../../models/themes')
const result = require('../../lib/result')
const indexRouter = express.Router()

// 重定向
indexRouter.get('/', (req, res) => {

  res.redirect(root)
})

// 主页
indexRouter.get('/', (req, res, next) => {
  res.render('admin/index.html')
})

// 头部轮播管理
indexRouter.get('/topbanner', (req, res, next) => {
  topHeaders.find({}, (err, data) => {
    if (err) {
      next(result.server_parror('获取数据失败，请联系后端人员'))
    }
    res.render('admin/topbanner/topbanner.html', {
      topHeaders: data,
      current: 1,
      themeIndex: 1
    })
  })

})

// 显示添加头部轮播
indexRouter.get('/topbanner/add', (req, res, next) => {
  let id = req.query.id
  if (!id) {
    res.render('admin/topbanner/addtopbanner.html')
  }

  topHeaders.findOne({
    _id: id
  }, (err, data) => {
    if (err) {
      next(result.servererror('获取数据失败'))
    }
    res.render('admin/topbanner/addtopbanner.html', {
      topHeader: data,
      current: 1,
      themeIndex: 1
    })
  })
})

// 添加头部轮播
indexRouter.post('/topbanner/add', async (req, res, next) => {
  let {
    title,
    desc
  } = req.body
  new topHeaders({
    title,
    desc
  }).save().then((data) => {
    res.json(result.ok('保存成功'))
  }).catch(err => {
    next(err)
  })

})

// 编辑头部轮播
indexRouter.post('/topbanner/edit', (req, res, next) => {
  let {
    title,
    desc,
    id
  } = req.body
  topHeaders.updateOne({_id: id}, {title, desc}, (err, data) => {
    if (err) {
      next(result.params_error('更新失败'))
    }
    res.redirect('/admin/topbanner')
  })

})

// 删除头部轮播
indexRouter.get('/topbanner/del', (req, res, next) => {
  let id = req.query.id
  topHeaders.deleteOne({
    _id: id
  }).then(data => {
    res.json(result.ok('删除成功'))
  }).catch(err => {
    next(result.params_error('没有该标题！'))
  })
})

module.exports = indexRouter