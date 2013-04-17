/**
 * Author: DolphinBoy
 * Email: dolphinboyo@gmail.com
 * Date: 13-4-17
 * Time: 下午3:33
 * Description: 应用入口文件
 */

var express = require('express');

var app = express();

app.set('title', 'Birdway');

//设置模版引擎
//    server.engine('.html', require('ejs').__express);   //这两种方法都可以
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
//        server.register('.html', require('ejs'));

app.set('view options', {layout: false});
//  server.set('view cache', true); //上线开启模板缓存

//  server.use(express.bodyParser({uploadDir:'./uploads'}));//上传到指定的临时目录/uploads
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
var maxAge = 3600000 * 24 * 30;
app.use(express.static(__dirname + '/public', { maxAge: maxAge }));
app.use(express.favicon());

/**
 app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
 */

// 环境配置
app.configure('development', function(){
  app.use(express.logger());
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.logger());
  //app.use(express.errorHandler());
//  server.use(gzippo.staticGzip(global.STATIC.PUBLIC));  //压缩静态文件
//  server.use(gzippo.compress());
//  server.enable('view cache')  // view cache is enabled by default in production mode
});

//要处理404

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('common/error', { error: err });
}



// 路由配置
app.all('*', function(req, res, next){
  console.log('Request url:' + req.protocol +'//:' + req.host + '/' + req.path + '/' + req.originalUrl);
  next();
});

app.get('/', function(req, res){
  //res.send('Hello World!');
//  return res.render('signin', { title: '注册 | ' + app.locals.name });
  return res.render('signin', { title: '注册 | 小云通讯录' });
});





app.listen(3000);
console.log('Listening on port 3000.');