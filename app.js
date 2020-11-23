/*
 * @Author: liweilong
 * @Date: 2020-11-20 16:56:51
 */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const themesRouter = require('./routes/themes')
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

// 路由
app.use(themesRouter)

// 监听
app.listen('3000', () => {
  console.log('服务器已经启动！请开始你的表演');
})