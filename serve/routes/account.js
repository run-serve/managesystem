// 账号管理的路由
const express = require('express');
const router = express.Router();

//引入expressJwt 用于验证token的有效性
const expressJwt = require('express-jwt');

//密钥
const secretKey = 'itsource';

// 引入数据库连接模块
const connection = require('./conn')

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

// 接收添加账号请求 /*accountadd*/
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

// 接受要批量删除的请求/*accountBatch*/
router.get('/accountBatch',(req,res)=>{
	//接受前端传参
	let { idArr } = req.query;
	//根据前端传的id批量删除
	//sql
	const sqlStr = `delete from account where id in (${idArr})`;//使用in子句批量删除
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err;
		if(data.affectedRows > 0){
			//返回成功提示
			res.send({code:0,reason:'批量删除账号成功'});
		}
		//返回失败
		else{
			res.send({code:1,reason:'批量删除账号失败'});
		}
	})	
})

//接受分页查询列表请求/*accountListPage*/
router.get('/accountListPage',(req,res)=>{
	//接受前端传参
	let {currentPage,pageSize} = req.query;

	//按照前端传的页码和条数查询
	//sql
	let sqlStr = `select * from account order by ctime desc`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if (err) throw err;
		//数据总条数
		let count = data.length;
		//计算跳过多少条
        let n = (currentPage - 1) * pageSize;
        //sql拼接 
        sqlStr +=` limit ${n},${pageSize}`;
        //执行sql查询对应页码的数据
        connection.query(sqlStr,(err,data)=>{
          if (err) throw err;
          //把总条数和分页对应数据发给前端
          res.send({count,data});
        })     
	})	
})

//接受修改密码的请求/*accountModifyPass*/
router.post('/accountModifyPass',(req,res)=>{
	//接受前端传参
	let {id,pass,newPass} = req.body;
    //根据前端传的id修改账号密码
    //sql
    const sqlStr = `update account set password='${newPass}' where id=${id}&&password=${pass}`;
    //执行sql
    connection.query(sqlStr,(err,data)=>{
    	if (err) throw err;
    	if (data.affectedRows > 0) {
            //返回成功提示
          res.send({code:0,reason:'修改密码成功'});
        }
           //返回失败提示
        else{
             res.send({code:1,reason:'原密码错误,请输入正确的原密码！'});
        }
    	
    })
})

//接受显示当前用户名的请求
router.get('/accountName',(req,res)=>{
	let accountName = req.user.userInfo.account;
	res.send({accountName});
})


module.exports = router;