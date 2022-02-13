// 登录的路由
const express = require('express');
const router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')

//引入jwt模块
const jwt= require('jsonwebtoken');

//密钥
const secretkey = 'itsource';




//拦截所有请求(设置响应头的封装)
router.all('*',(req, res, next) => {
	//设置响应头
	res.header("Access-Control-Allow-Origin", "*");//允许的域
	res.header("Access-Control-Allow-Headers",  "authorization");//循序携带的头
	//放行
	next();
})

//接收登录的请求
router.post('/loginSign',(req,res)=>{
     //接受前端传过来的账号密码
     let {account,password} = req.body;
     //根据传过来的账号密码验证
     //sql
     const sqlStr = `select * from account where account='${account}'&& password='${password}'`;
     //执行sql
     connection.query(sqlStr,(err,data)=>{
     	if (err) throw err;

     	//对象浅拷贝
     	let userInfo = Object.assign({},data[0]);

     	if (data.length) {
     		// 登录成功
     		//生成token
			const token = jwt.sign({
			   userInfo,    //你要加密的对象
			}, secretkey, {     //secretkey
			   expiresIn:  60 * 60 * 2 //token到期时间，固定写法
			});
     		res.send({code:0,reason:'欢迎登录!',token,account});
     	}else{
     		//登录失败
     		res.send({code:1,reason:'账号或者密码不正确!'});
     	}
     })
}) 

module.exports = router;