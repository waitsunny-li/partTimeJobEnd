/*
 * @Author: liweilong
 * @Date: 2020-11-20 16:56:51
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// 路由模块
const indexRouter = require('./routes/admin/topHeader')
const headerTitleRouter = require('./routes/admin/headerTitle')
const slideRouter = require('./routes/admin/slideactive')
const bannerJobRouter = require('./routes/admin/bannerJob')
const positionRouter = require('./routes/admin/position')
const jobRouter = require('./routes/admin/jobcontent')
// api路由模块
const themesRouter = require('./routes/api/themes')


const app = express()


/**
 *注册中间件
 */
// 开放
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))


// 配置body-parser 中间件（插件：专门用来解析表单POST请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// 模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

/**
 *  api路由
*/
app.use('/api', themesRouter)


/**
 * 后台管理路由
*/
app.use('/admin', indexRouter)
app.use('/admin/headertitle', headerTitleRouter)
app.use('/admin/slideactive', slideRouter)
app.use('/admin/bannerjob', bannerJobRouter)
app.use('/admin/position', positionRouter)
app.use('/admin/jobcontent', jobRouter)

// 统一处理404错误
app.use((req, res) => {
  res.render('admin/404.html')
})

// 配置统一处理错误信息中间件
app.use((err, req, res, next) => {
  console.log(err);
  res.json(err)
})

// 监听
app.listen('3000', () => {
  console.log('服务器已经启动！请开始你的表演');
})