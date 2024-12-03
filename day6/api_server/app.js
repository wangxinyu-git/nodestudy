// 导入 express 模块

const express = require('express')
// 创建 express 的服务器实例
const app = express()

const Joi = require('joi')
const config = require("./config")
const expressJWT = require('express-jwt')
// 导入 cors 中间件
const cors = require('cors')
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
// 将 cors 注册为全局中间件
app.use(cors())
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.auth 属性上
// 配置expressJwt中间件
app.use(
  expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//]
  })
);

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof Joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误，未授权
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('Express server running at http://127.0.0.1:3007')
})