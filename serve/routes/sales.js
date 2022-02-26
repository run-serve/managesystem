//销售管理的路由
//引入jwt验证token和设置响应头的模块
const router = require('./jwt');

// 引入数据库连接模块
const connection = require('./conn')



//接受查询销售统计的查询请求/*salesdata*/
router.post('/salesdata',(req,res)=>{
	//查询销售数据表
	let {starTime, endTime} = req.body;
	//写sql
	const sqlStr = `select * from sales where ctime between "${starTime}" and "${endTime}"`;
	//执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
});

//接受选取时间查询的请求/*selecttime*/
// router.post('/selecttime',(req,res)=>{
// 	// 接受前端传参
// 	let {starTime, endTime} = req.body;
// 	//sql
// 	const sqlStr = `select * from sales where ctime between "${starTime}" and "${endTime}"`;
// 	//执行sql
// 	connection.query(sqlStr,(err,data)=>{
// 		if (err) throw err;
// 		console.log(data);
// 		res.send(data);
// 	})

// })

module.exports = router;