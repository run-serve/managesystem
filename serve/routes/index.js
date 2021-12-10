var express = require('express');
var router = express.Router();

// 服务器根目录请求
router.get('/', (req, res) => {
	res.send('后端服务器根目录!')
})

module.exports = router;
