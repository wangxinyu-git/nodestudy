// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')
// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo.js')
// 导入需要的验证规则对象
const { update_userinfo_schema,update_password_schema,update_avatar_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户的基本信息,这样服务端的信息就到expressJoi进行验证，只有验证成功后才能调用updateUserInfo处理函数
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的路由
router.put('/updatepwd',expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更新用户头像的路由
router.put('/update/avatar',expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)


// 向外共享路由对象
module.exports = router
