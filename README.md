# 使用指南

fork至：[Naccl](https://github.com/Naccl/NBlog/issues/63)

说明：

这是一个基于java的spring boot框架的博客，有前端页面展示，也可以后端的数据修改。
- blog-view 是前面的网页页面，用npm管理模块和启动；
- blog-cmd 是后台的数据管理系统，用npm管理模块和启动；
- blog-api 是用java和若干框架搭建的中间件，用于连接redis内存数据库、MYSQL数据库、blog-cmd、blog-view。


## 如何使用

开发模式：三个模块其实都可以在windows下运行，也可以选择只留blog-api在windows下运行。

1、下载工程。blog-cms、blog-view在linux上运行，blog-api在windows上运行。

2、[配置环境] 在blog-cms和blog-view的目录下，分别执行`npm install`命令，安装相应的模块；

3、[配置环境] 在linux上安装MYSQL并导入sql文件，然后安装redis数据库。将mysql和redis设置允许远程服务器连接。

![](https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlRfUObGvS08Aswn9/root/content)

4、[配置环境] windows下，修改blog-api目录下的`blog-api/src/main/resources/application-dev.properties`文件，修改的重点在于：三个服务的IP和端口、MYSQL的IP和端口还有账号和密码、redis的IP和端口和密码。<font color="blue">其他服务以后用到再说吧</font>。

5、[启动] windows下，在blog-api工程中，找到`blog-api/src/main/java/top/naccl/BlogApiApplication.java`，并用ideal打开java程序运行（环境是jdk 1.8）

6、[启动] Linux下，找到blog-cms和blog-view目录下，运行`npm run serve`来启动程序。然后分别打开两个网址查看情况。注：数据库的账号和密码，如果是原版的，就是`username：Admin  userpassword：123456`，如果是我修改过的，就是`username：haoxx  userpassword：508506630.yh`


## 如何发布
- [√] 已实现

两个vue在各自的端口上运行，并在代码内与baseURL的api程序进行交互，实现数据的处理。其中：
- 管理后台在`src\util\request.js`文件中指定，前端页面在`src\plugins\axios.js`文件中指定。
- java后台程序是基于spring boot框架写的，主要负责数据处理，在配置文件中设置：
    - MySQL: 127.0.0.1:3380 访问账号和密码为：yuhao/QQ加点加名字前字母
    - Redis：127.0.0.1:6379 访问账号为：QQ加点加名字前字母
    - 邮箱配置为：QQ邮箱，密码是SMAT服务的授权码
    - 开启了代理（如果后续会用到telegram）
    - blog.api=http://localhost:8090/
    - blog.cms=https://admin.haoxx.site/
    - blog.view=https://haoxx.site/

邮箱的配置为：

<img align="center" src="https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlSW-w7l0WeZ8aru7/root/content"/>

服务器上的nginx配置为：
```bash
server {
		listen 443 ssl;
		server_name haoxx.site;

		ssl_certificate     /ssl/haoxx.site.pem;
		ssl_certificate_key /ssl/haoxx.site.key;

		ssl_session_timeout 30m;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
		ssl_prefer_server_ciphers on;

		location / {
			# root /usr/share/nginx/blogviewpublic;
			proxy_pass http://127.0.0.1:8071/;
		}
	}

	server {
		listen 443 ssl;
		server_name admin.haoxx.site;

		ssl_certificate     /ssl/admin.haoxx.site.pem;
		ssl_certificate_key /ssl/admin.haoxx.site.key;

		ssl_session_timeout 30m;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
		ssl_prefer_server_ciphers on;

		location / {
			# root /usr/share/nginx/blogcmspublic;
			proxy_pass http://127.0.0.1:8072/;
		}
	}

	server {
		listen 443 ssl;
		server_name api.haoxx.site;

		ssl_certificate     /ssl/api.haoxx.site.pem;
		ssl_certificate_key /ssl/api.haoxx.site.key;

		ssl_session_timeout 30m;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
		ssl_prefer_server_ciphers on;

		location / {
			proxy_pass http://127.0.0.1:8090/;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
	}
```

说明：先用pm2把用户页面、管理员页面启动在8071和8072端口，然后在使用再使用配置。明确一点：api在本地的8090端口，通过`http://127.0.0.1:8090/`来访问，而用户页面和管理页面都有一个域名。为了让api也能够在外部访问，可以设置：`http://46.x.x.x:8090/`来访问，或者也给他一个域名：`https://api.haoxx.site/`。然后再blog-views中配置baseURL为：`baseURL: 'https://api.haoxx.site/'`，在blog-cms中配置：`baseURL: 'https://haoxx.site/admin/'`。

## 用pm2来管理工程

1、安装pm2

```bash
node install pm2 -g
```
2、分别创建两个文件夹：cms和view，然后下面以cms为例：

3、新建文件 package.json，内容如下
```json
{
  "name": "cms",
  "version": "1.0.0",
  "description": "NBlog cms",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Naccl",
  "license": "MIT",
  "dependencies": {
    "compression": "^1.7.4",
    "connect-history-api-fallback": "^1.6.0",
    "express": "^4.17.1"
  }
}
```
4、运行`npm install`安装依赖

5、新建文件 app.js，内容如下
```js
const express = require('express')
const compression = require('compression')
const history = require('connect-history-api-fallback')
const app = express()

app.use(compression())
app.use(history())
app.use(express.static('./dist'))

app.listen(8071, () => {
  console.log('cms server running at 8071')
})
```
6、pm2启动服务
```bash
pm2 start app.js --name="cms-blog"
```
7、补充：查看后台任务：`pm2 ls`；停止所有任务：`pm2 stop all`；删除所有任务：`pm2 delete all`；停止指定任务：`pm2 stop cms`

## 2023/06/02更新
域名终于下来了，现在开始将域名和服务绑定

1、nginx.conf的配置基本不变，需要添加：
```bash
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}
```
该代码块的用途是将所有http服务转为对应url的https服务。
2、cms和view的baseURL更改
```js
/**
 * 怎么判断java的api程序有无正常运行？怎么判断baseURL是否填对？
 * 1、cms端的baseURL将后面的/admin/删除，然后用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * 2、view端的baseURL直接用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * baseURL: 'https://api.haoxx.site/blog/admin/',    cms端 用户管理终端
 * baseURL: 'https://api.haoxx.site/blog/',          view端 前台显示终端
 * 3、调试时注意：https网页中调用http连接会被浏览器屏蔽掉！所以会出现：Network Error的问题！
 */
 
// views端：
const request = axios.create({
	baseURL: 'https://api.haoxx.site/blog/',  //调试时使用：http://111.230.43.93:8090/
	timeout: 10000,
})
//cms端
const request = axios.create({
	baseURL: 'https://api.haoxx.site/blog/admin/',  //调试时使用：http://111.230.43.93:8090/
	timeout: 10000,
})
```
3、后续的计划：
- [ ] 看懂代码吧
- [ ] 配置游客登录