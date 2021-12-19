// 账号管理的路由
const express = require('express');
const router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')

// 接收账号请求 /*accountadd*/
router.post('/accountadd',(req, res) =>{
	//设置响应头
	res.header("Access-Control-Allow-Origin", "*");
	// 接收前端参数
	let {account, password, userGroup} = req.body;
	// 把数据存入数据库
	// sql语句
	const sqlStr = `insert into account(account, password, usergroup) values('${account}','${password}','${userGroup}')`;
	// 执行sql   
	connection.query(sqlStr,(err,data) =>{
		 if(err) throw err;
		 //如果首行数大于0 成功，否则失败
		 if (data.affectedRows >0) {
		 	//返回成功提示
		 	res.send({code:0,reason:'添加账号成功'});
		 }else{
		 	//返回失败信息
		 	res.send({code:1,reason:'添加账号失败'});
		 }
	})

})
//接受账号列表请求 /*accountList*/
router.get('/accountList',(req,res) =>{
	//设置响应头
	res.header("Access-Control-Allow-Origin", "*");
	//查询数据库账号列表信息
	//sql
    const sqlStr = `select * from account order by ctime desc`; //根据时间降序
	//执行sql
	connection.query(sqlStr,(err,data) =>{
		if (err) throw err;
		res.send(data);
	})
})


module.exports = router;