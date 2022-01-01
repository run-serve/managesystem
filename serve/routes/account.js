// 账号管理的路由
const express = require('express');
const router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')

//拦截所有请求(设置响应头的封装)
router.all('*',(req, res, next) => {
	//设置响应头
	res.header("Access-Control-Allow-Origin", "*");
	//放行
	next();
}) 

// 接收账号请求 /*accountadd*/
router.post('/accountadd',(req, res) =>{
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
	//查询数据库账号列表信息
	//sql
    const sqlStr = `select * from account order by ctime desc`; //根据时间降序
	//执行sql
	connection.query(sqlStr,(err,data) =>{
		if (err) throw err;
		res.send(data);
	})
})

// 接受删除请求
router.get('/accountdel',(req,res) =>{
	//接受前端传参
	const {id} = req.query;
	//sql
	const sqlStr = `delete from account where id=${id}`
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if(data.affectedRows >0){
			// 返回删除成功提示
		    res.send({code:0,reason:'删除账号成功'});
		}
		// 返回删除失败提示
		else{
			res.send({code:1,reason:'删除账号失败'});
		}
	})
})

//接受编辑查询的请求/*accountedit*/
router.get('/accountedit',(req,res) =>{
	//接受前端传参
	const {id} = req.query
	//根据id查询编辑的列表信息
	//sql
	const sqlStr = `select * from account where id=${id}`;
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err;
		res.send(data[0]);
	})
})

//接受要修改的请求/*accounteditsave*/
router.post('/accounteditsave',(req,res) =>{
	//接受前端传参
	let {account,id,userGroup} = req.body;
	//根据前端传的id修改表字段
	//sql
	const sqlStr =`update account set account='${account}',userGroup='${userGroup}' where id=${id}`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows>0) {
        	//返回成功提示
          res.send({code:0,reason:'修改账号成功'});
        }
           //返回失败提示
        else{
             res.send({code:1,reason:'修改账号失败'});
        }
	})
	
})

module.exports = router;