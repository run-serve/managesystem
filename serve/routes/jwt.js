//jwt  模块抽取

// 账号管理的路由
const express = require('express');
const router = express.Router();

//引入jwt模块
global.jwt= require('jsonwebtoken');

//引入expressJwt 用于验证token的有效性
const expressJwt = require('express-jwt');

//密钥
global.secretKey = 'itsource';


//拦截所有请求(设置响应头的封装)
router.all('*',(req, res, next) => {
	//设置响应头
	res.header("Access-Control-Allow-Origin", "*");//允许的域
	res.header("Access-Control-Allow-Headers",  "authorization");//循序携带的头
	//放行
	next();
})  

//使用中间件验证token合法性
router.use(expressJwt ({
    secret: secretKey 
}).unless({
    path: ['/login/loginSign']  //不需要验证token的地址
}))


//拦截器
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //如果前端请求不带token，就返回错误
        res.status(401).send('无效token...');
    }
});

module.exports = router;