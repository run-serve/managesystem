//连接mysql  
const mysql = require('mysql'); // 引入mysql模块 需要安装 cnpm i mysql -S

// 使用mysql模块的方法创建连接对象
const connection = mysql.createConnection({
  host     : 'localhost', // 服务器地址
  user     : 'root', // mysql的账号
  password : 'root', // mysql的密码
  database : 'smms' // 要连接的数据库的名字
});
 
// 执行连接
connection.connect(() => {
  console.log('数据库连接成功!')
});

// 暴露出去
module.exports = connection;