//商品管理模块
//引入jwt验证token和设置响应头的模块
const router = require('./jwt');

// 引入数据库连接模块
const connection = require('./conn')

//
router.get('/goodsmanagement',(req,res)=>{
	res.send('1');

})

module.exports = router;