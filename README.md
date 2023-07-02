# 部署文档

## 一、基础部署文档

参考 [原博主的部署教程](https://www.ttkwsd.top/article/59)

1、安装docker

2、安装docker-compose

3、拉取canel镜像，然后把（instance.properties和canal.properties）配置文件修改一下（具体按教程来）

注意： 在docker下有个.ENV文件，里面记录了mysql、redis、rabbitmq等等的密码，要和上述内容一致

说明：rabbitmq在本地的账号、密码均为guest，远程访问的话就是admin/admin。这里填guest

4、创建文件夹备用：
```bash
cd /usr/local
mkdir docker
mkdir canal
mkdir kibana
mkdir nginx
mkdir upload
mkdir vue
mkdir -p vue/admin
mkdir -p vue/blog
```

5、创建一个nginx.conf放在`/usr/local/nginx`目录下：

```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##
	

	server {
                listen 80;
                server_name _;
                return 301 https://$host$request_uri;
        }
	
	# 第二个：
	# 前台服务
	server {
        listen  443 ssl;
        server_name  haoxx.site;

        ssl_certificate    /etc/ssl/certs/haoxx.site_bundle.pem;
        ssl_certificate_key  /etc/ssl/certs/haoxx.site.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

       location / {
            root   /usr/local/vue/blog;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location ^~ /api/ {
            proxy_pass http://127.0.0.1:8080/;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }

    }

	# 管理前台
	server {	
        listen  443 ssl;
        server_name  admin.haoxx.site;

        ssl_certificate    /etc/ssl/certs/admin.haoxx.site_bundle.pem;
        ssl_certificate_key  /etc/ssl/certs/admin.haoxx.site.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

       location / {
            root   /usr/local/vue/admin;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        location ^~ /api/ {
            proxy_pass http://127.0.0.1:8080/;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }

    }

	# server {
    #     listen  443 ssl;

    #     add_header 'Access-Control-Allow-Origin' 'https://www.ttkwsd.top';
    #     add_header 'Access-Control-Allow-Methods' *;
    #     server_name  文件上传域名;
    #     ssl_certificate    /etc/ssl/certs/xxxxxxxxxxxx.pem;
    #     ssl_certificate_key  /etc/ssl/certs/xxxxxxxxxxxx.key;
    #     ssl_session_timeout 5m;
    #     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #     ssl_prefer_server_ciphers on;

    #     location / {
    #       root /usr/local/upload/;
    #     }

    # }


	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
```

6、将证书放在`/etc/ssl/cets/`目录下

7、现在开始打包两个前端：

1. 先`npm install`；

2. 修改shoka-admin和shoka-blog的 utils 文件下的 token.ts，将 domain 改成自己的所在域

3. 接着修改前端的vite.config.ts代理地址，改成自己的 ip

4. 申请了 Gitee 和 Github 的第三方登录，记得修改前端的应用 id 和回调地址

![](https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlicaStK32pp_-WJC/root/content)

![](https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlijJkpkn19cteN6o/root/content)

![](https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlikbIwEV3PZyc3FB/root/content)


将两个工程打包后，放在/usr/local/vue下，分别命令为admin和blog

8、后台配置

8.1 MySql的IP、账号和密码

这里配置的是(注意：IP是docker network的IP)：
```yaml
    url: jdbc:mysql://172.20.0.1:3306/blog?serverTimezone=Asia/Shanghai&allowMultiQueries=true&rewriteBatchedStatements=true
    username: root
    password: 12345
```

![](https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdliqn5LtObXivzJxC/root/content)

8.2 Redis的IP和密码

8.3 rabbitmq的IP和账号、密码

8.4 QQ邮箱配置

8.5 blog的url设置为：`https://haoxx.site/`  注意，一定要以`/`结尾

8.6 search mode可选两种，简单点就选mysql

8.7 设置upload

8.8 elasticsearch的设置

8.9 QQ、GitHub的第三方登录

9、docker的设置



将xxx.jar和deploy下的.env、blog-start.sh、docker-compose.yml、Dockerfile上传到/usr/local/docker下，运行blog-start.sh即可。注意在docker-compose.yml中配置一个docker nerwork，名为blog-net，将所有容器都连在这个网络中。然后，在云服务器中用`docker network ls`和`ifconfig`对比网络ID，确定blog-net的IP为`172.20.0.1`，所以前面填IP的时候都按这个IP来填。

```dockerfile
version: "3"
services:
  blog-service:
    build: .
    image: blog-springboot:latest
    container_name: blog-springboot
    restart: always
    depends_on:
      - mysql
      - redis
      - rabbitmq
    volumes:
      - "/usr/local/upload:/usr/local/upload"
    ports:
      - "8080:8080"
    networks:
      - blog-net
  mysql:
    image: mysql:${MYSQL_VERSION}
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      TZ: Asia/Shanghai
    ports:
      - "3306:3306"
    networks:
      - blog-net
  redis:
    image: redis:${REDIS_VERSION}
    container_name: redis
    restart: always
    command: --requirepass "${REDIS_PASSWORD}"
    ports:
      - "6379:6379"
    networks:
      - blog-net
  rabbitmq:
    image: rabbitmq:${RABBITMQ_VERSION}
    container_name: rabbitmq
    restart: always
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD}
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - blog-net
  elasticsearch:
    image: elasticsearch:${ELASTICSEARCH_VERSION}
    container_name: elasticsearch
    restart: always
    environment:
      discovery.type: "single-node"
      ES_JAVA_OPTS: "-Xms64m -Xmx128m"
      http.cors.enabled: "true"
      http.cors.allow-origin: "*"
      xpack.security.enabled: "true"
      ELASTIC_PASSWORD: "${ELASTICSEARCH_PASSWORD}"
    ports:
      - "9200:9200"
      - "9300:9300"
    networks:
      - es-net
      - blog-net
  kibana:
    image: kibana:${ELASTICSEARCH_VERSION}
    container_name: kibana
    volumes:
      - "/usr/local/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml"
    depends_on:
      - elasticsearch
    ports:
      - "5601:5601"
    networks:
      - es-net
      - blog-net
  canal_server:
    image: canal/canal-server:${CANAL_VERSION}
    container_name: canal
    volumes:
      - "/usr/local/canal/instance.properties:/home/admin/canal-server/conf/example/instance.properties"
      - "/usr/local/canal/canal.properties:/home/admin/canal-server/conf/canal.properties"
    ports:
      - "11111:11111"
    networks:
      - blog-net
  nginx:
    image: nginx:${NGINX_VERSION}
    container_name: nginx
    restart: always
    volumes:
      - "/usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "/etc/ssl/certs:/etc/ssl/certs"
      - "/usr/local/vue:/usr/local/vue"
      - "/usr/local/upload:/usr/local/upload"
    privileged: true
    ports:
      - "443:443"
      - "80:80"
    networks:
      - blog-net
networks:
  es-net:
    driver: bridge
  blog-net:
    driver: bridge
```

## 二、数据备份

将第一次配置好的所有文件都从服务器里面打包拷贝下来了，放在了`云服务器上的数据`目录中。

## 三、修改docker下的MySql的端口号和密码

今天2023/06/12，我的MySQL服务器被攻击了，所以为了保证数据安全，需要将MySQL的对外影响端口修改，并设置安全性更高的密码。

1）MySQL密码的修改：修改与docker-compose.yml同目录下的隐藏文件`.env`中MySQL和Redis的密码；

2） 修改springboot下的配置文件，MySQL的密码、Redis的密码还有MySQL的端口号；

3）修改docker-compose.yml中MySQL的配置，修改端口号为3380；

4）在启动MySQL容器后，使用`docker cp mysql:/etc/mysql/my.cnf .`将配置文件拷贝出来，然后添加`port=3380`字段：
```bash
[mysqld]
port=3380
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
```
5）故技重施，`docker cp my.cnf mysql:/etc/mysql/my.cnf`重新覆盖配置文件，然后`docker restart mysql`就可以了。

6） 给搞忘了，还有在canal目录下的instance.properties文件，修改MySQL的IP、端口号、账户名和密码。不过这个容器并未使用。

7）补充说明：检查服务器端口能否正常使用：使用telnet工具：`telnet  服务器IP 端口号`



