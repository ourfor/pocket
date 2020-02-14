const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');

const app = express();
const config = require("./webpack.dev.js");
const compiler = webpack(config);


app.use(history());

// 告诉 express 使用 webpack-dev-middleware
// 以及将 webpack.config.js 配置文件作为基础配置

app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath
}))

//使用热模块替换
app.use(require("webpack-hot-middleware")(compiler));



//将文件 serve 到端口 80
app.listen(80,function(){
    console.log("Example app listen on port 80\n");
    console.log("😳😏😜😙😝☺️🙂😉😁😂😄😌☹️😕😔🤔🙄😑😒");
});