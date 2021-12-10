// 账号管理的路由
const express = require('express');
const router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')

// 接收账号请求 /*accountadd*/
router.post('/accountadd',(req, res) =>{
	res.header("Access-Control-Allow-Origin", "*");
// 接收前端参数
let { account, password, userGroup} = req.body;
// 把数据存入数据库
// sql语句
const sqlStr = `insert into account(account, password, usergroup) values('${account}','${password}','${userGroup}')`
console.log(sqlStr)

    res.send("通了！")
// 执行sql   
})

module.exports = router;