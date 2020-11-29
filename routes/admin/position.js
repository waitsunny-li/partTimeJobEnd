/*
 * @Author: liweilong
 * @Date: 2020-11-28 19:17:17
 */
const express = require('express')
const {
  positions
} = require('../../models/themes')
const result = require('../../lib/result')

const positionRouter = express.Router()

// show position.html
positionRouter.get('/', async (req, res, next) => {
  let data = await positions.find({})
  res.render('admin/classify/position.html', {
    themeIndex: 2,
    positionsData: data
  })
})

// add position
positionRouter.post('/add', async (req, res, next) => {
  try {
    const r = await new positions(req.body).save()
    console.log(r);
    res.json(result.back(r))
  } catch (err) {
    next(result.params_error('该字段不能为空'))
  }
})

// del position
positionRouter.post('/del', async (req, res, next) => {
  let id = req.body.id
  const r = await positions.deleteOne({_id: id})
  if (r.ok && r.deletedCount == 1) {
    res.json(result.ok('删除成功'))
  } else {
    next(result.params_error('删除失败'))
  }
})

// edit position
positionRouter.post('/edit', async (req, res, next) => {
  let p = req.body
  const r = await positions.updateOne({_id: p.id}, {name: p.name})
  if (r.n && r.ok) {
    res.json(result.back({name: p.name}))
  } else {
    next(result.params_error('编辑失败'))
  }
})


module.exports = positionRouter