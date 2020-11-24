/*
 * @Author: liweilong
 * @Date: 2020-11-24 09:18:38
 */
const express = require('express')
const { root } = require('../index')
const { topHeaders, headerTitles } = require('../../models/themes')
const indexRouter = express.Router()

// 重定向
indexRouter.get( '/', (req, res) => {
  
  res.redirect(root)
})

// 主页
indexRouter.get( root + '/', (req, res) => {
  res.render('admin/index.html', {
    name: 'liweilo'
  })
})

// 头部轮播管理
indexRouter.get(root + '/topbanner', (req, res) => {
  res.render('admin/topbanner.html', {
    name: 'liweilo'
  })
})

// 显示添加头部轮播
indexRouter.get(root + '/topbanner/add', (req, res) => {
  res.render('admin/addtopbanner.html')
})

// 添加头部轮播
indexRouter.post('/topbanner/add', async (req, res) => {
  console.log(req.body);
  let {title, desc} = req.body
  if (!title && !desc) {
    res.json({
      state: 401,
      msg: '请输入所需字段',
    })
  }
  new headerTitles({title, desc}).save(err => {
    if (err) {
      res.json({
        state: 400,
        msg: '保存成功'
      })
    }
  })
  
})

module.exports = indexRouter