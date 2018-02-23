var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require("body-parser-xml")(bodyParser);

var routes = require('./routes/index');

var app = express(); // 生成一个express实例 app

// view engine setup
//设置views文件夹为存放视图文件的目录，即存放模版文件的地方，__dirname为全局变量，存储当前正在执行的脚本所在目录
app.set('views', path.join(__dirname, 'views'));

// 设置视图模版引擎为pug
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 加载日志的中间件
app.use(logger('dev'));

// 加载解析json的中间件
app.use(bodyParser.json());
app.use(bodyParser.xml({
	limit: '1MB',
	xmlParseOptions: {
		normalize: true,
		normalizeTags: true,
		explicitArray: false
	}
}))

// 加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({
	extended: false
}));

// 加载解析cookie的中间件
app.use(cookieParser());

// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由控制器
app.use(routes);

// catch 404 and forward to error handler
// 捕获404错误，并转发到错误处理器
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
// 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// 导出app实例供其他模块调用
module.exports = app;