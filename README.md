# 部署文档

## 一、基础部署文档


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

进一步的补充说明：

如果在docker-compose.yml中修改mysql的端口为：
```yml
ports:
	- "3380:3380"
```
则需要额外步骤：修改容器内部的`/etc/mysql/my.cnf`，在[mysqld]中添加`port=3308`。

当然，你可以只加载docker-compose.yml中修改mysql的端口为：
```yml
ports:
	- "3380:3306"
```

这样就可以实现mysqld的端口号修改，而无需其他额外操作。



## 四、修复QQ登录(简单讲讲springboot+vue)
### 1、QQ登录的整体思路
- **第一步：获取code**
```http
https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102xx&redirect_uri=https%3A%2F%2Fhaoxx.site%2Foauth%2Flogin%2Fqq&scope=get_user_info
```
&emsp;&emsp;按下F12进入调试模式，点击头像进行QQ登录后，得到code值。
- **第二步：获取access_token** 
```http
1) 模板：https://graph.qq.com/oauth2.0/token?grant_type={grant_type}&client_id={appid}&client_secret={appkey}&code={code}&redirect_uri={uri}
2）样例：https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=1020xx&client_secret=xxXpuoVyD&code=xxx&redirect_uri=https://xx/login/qq
```
返回值为：（HTML显示content为html/text）
access_token=377E38EEE3A4F8D526952B7173C04D55&expires_in=7776000&refresh_token=1C748A9B3003BC81236988F79B15ED0F
- **第三步：用access_token去申请open-id**
```http
https://graph.qq.com/oauth2.0/me?access_token=11111111111111111111111111111111&fmt=json
```
返回值为：
如果没有使用了fmt选项，则为：callback( {"client_id":"102053757","openid":"305F286E01D87A361D22A0C4814EE162"} );  或 如果使用了fmt选项，则为：{"client_id":"102053757","openid":"305F286E01D87A361D22A0C4814EE162"}
- **第四步：有access_token、client_id(或称appid)、open-id来申请用户信息**
```http
https://graph.qq.com/user/get_user_info?access_token=11111111111111111111111111111111&oauth_consumer_key=101137684&openid=333333333333333333333333333
```
返回值为：
{
    "ret": 0,
    "msg": "",
    "is_lost": 0,
    "nickname": "小鱼儿",
    "gender": "男",
    "gender_type": 2,
    "province": "广东",
    "city": "深圳",
    "year": "1990",
    "constellation": "",
    "figureurl": "http://qzapp.qlogo.cn/qzapp/XXXXXXXX0",
    "figureurl_1": "http://qzapp.qlogo.cn/qzapp/1XXxxxx14EE162/50",
    "figureurl_2": "http://qzapp.qlogo.cn/qzaXXXXXXXXXXC4814EE162/100",
    "figureurl_qq_1": "http://thirdqq.qlogo.cn/g?b=oXXXXXXXX72902881",
    "figureurl_qq_2": "http://thirdqq.qlogo.cn/g?X72902881",
    "figureurl_qq": "http://txxxx&kti=ZKBxx2902881",
    "figureurl_type": "1",
    "is_yellow_vip": "0",
    "vip": "0",
    "yellow_vip_level": "0",
    "level": "0",
    "is_yellow_year_vip": "0"
}

### 2、如何实现

- 在vue前端项目中：

&emsp;&emsp;在src/api/login/index.js中定义了`qqlogin()`函数：
```js
export function qqLogin(data: GitInfo): AxiosPromise<Result<string>> {
  return request({
    url: "/oauth/qq",
    method: "post",
    data,
  });
}
```

&emsp;&emsp;当你点击前端的QQ图标发起登录行为时，由src/componments/Dialog/login.vue调用前面提到的`qqlogin()`函数，发起上面提到的第一步，来尝试获得一个`code`：
```vue
<script setup lang="ts">
import { login } from "@/api/login";
//...省略
const qqLogin = () => {
  //保留当前路径
  user.savePath(route.path);
  app.setLoginFlag(false);
  window.open(
    "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id="+
    config.QQ_APP_ID +
    "&redirect_uri="+
    config.QQ_REDIRECT_URL +
    "&scope=scope" +
    "&display=display",
    "_self"
  );
};
</script>
```

&emsp;&emsp;紧接着，由src/componments/Oauto/index.vue里面再次调用`qqlogin()`将`code`传给后端的springboot来做后面几个调用链接的申请选项值，然后等待后端程序回传给我一个`data`：
```vue
<script setup lang="ts">
  onMounted(() => {
  if (route.path == "/oauth/login/qq") {
    qqLogin({ code: route.query.code as string }).then(
      async ({ data }) => {
        if (data.flag) {
          // 设置Token
          setToken(data.data);
          // 获取用户信息
           await user.GetUserInfo();
          if (user.email === "") {
            window.$message?.warning("请绑定邮箱以便及时收到回复");
          } else {
            window.$message?.success("QQ登录成功");
          }
          //window.$message?.success("QQ登录成功");
        } else {
          window.$message?.success("QQ登录失败");
        }
      }
    );
  }
</script>
```

其中`data`是由后端传回来的，后端的这个数据定义为：
```java
//在model/vo/Resylt.java中定义了这样一个数据类：
@Data
@ApiModel(description = "结果返回类")
public class Result<T> {
    /**
    * 返回状态
    */
    @ApiModelProperty(value = "返回状态")
    private Boolean flag;

    /**
    * 状态码
    */
    @ApiModelProperty(value = "状态码")
    private Integer code;

    /**
    * 返回信息
    */
    @ApiModelProperty(value = "返回信息")
    private String msg;

    /**
    * 返回数据
    */
    @ApiModelProperty(value = "返回数据")
    private T data;
    //后面的部分省略
}
```
在controller/LoginController.java中有qqLogin方法来调用它：
```java
    /**
     * QQ登录
     *
     * @param code QQ登录信息
     * @return {@link Result<String>} Token
     */
    @ApiOperation(value = "QQ登录")
    @PostMapping("/oauth/qq")
    public Result<String> qqLogin(@Validated @RequestBody CodeDTO code){
        return Result.success(loginService.qqLogin(code));
    }
```

- 在springboot后端项目中：

1. 在config/properties/QqProperties.java文件中给那些在第三方QQ登陆时需要用到的变量赋值（例如client_id和client_secrect）。主要是从配置文件中读取变量值并赋给类对象的属性。
2. 在controller/LoginController.java文件中的qqLogin方法来获取前端的`code`并返回处理后的`data`。`data（Result类）`的值有flag、code、msg等属性。`return Result.success(loginService.qqLogin(login));`
3. controller中调用了`LoginService`：在service/LoginService.java中的qqLogin方法只有函数原型，具体实现在同级目录`impl`下的`service/LoginServiceImpl.java`中：`return socialLoginStrategyContext.executeLoginStrategy(data, LoginTypeEnum.QQ);`
4. service调用了strategy/content目录下的SocialLoginStrategyContext.java的`executeLoginStrategy`方法，其函数体为`return socialLoginStrategyMap.get(loginTypeEnum.getStrategy()).login(data);`。在这里要仔细分析：1）这个`loginTypeEnum`值为`QQ={2, "QQ登录", "qqLoginStrategyImpl"}`，所以上面这个函数体就是在`socialLoginStrategyMap(qq).login(data)`，而`socialLoginStrategyMap类`在strategy目录下的SocialLoginStrategy.java；2）不过这个类里面只有一个login方法的函数原型，所幸在同目录有个`AbstractLoginStrategyImpl.java`，该文件中`public abstract class AbstractLoginStrategyImpl implements SocialLoginStrategy`可见AbstractLoginStrategyImpl类是SocialLoginStrategy的虚继承，则AbstractLoginStrategyImpl类也是一个虚类，在该类中实现了login()函数，但是有调用了`getSocialToken`和`getSocialUserInfo`方法，这两个方法为虚方法，用于根据不同对象的动态实现。
5. 因此，现在的重点就在stratage/impl目录下的QqLoginStrategyImpl.java文件，这里面就是重写了上面所述的`getSocialToken`和`getSocialUserInfo`方法。

&emsp;&emsp;具体地，`getSocialToken`方法调用`getQqToken`子方法在已有`code`的基础上去申请获得`access_token`,并且调用`getUserOpenId`子方法在已有`access_token`的基础上去申请获得`openid`,最后生成一个`SocialTokenVO`类的对象。

&emsp;&emsp;在`getSocialUserInfo`方法中，形参使用上述的`SocialTokenVO`对象，解析其中的`access_token`、`openid`并从配置文件中读取`client_id`来做最后一步：申请获得QQ用户信息。成功后返回`SocialUserInfoVO`对象。该对象主要包含QQ用户的头像和昵称。

最后，再来说一下`getQqToken`和`getUserOpenId`方法，其函数主题具体就是组成一个url发送给QQ互联平台，然后从返回的数据中解析得到`access_token`和`openid`。注意：返回的含这两个数据的链接是`html/text`格式的，这程序中将其转换成字节数组，再转换成字符串，然后通过字符串切割才得到的。与之不同的是，最后一步获取QQ用户信息时返回的是JSON格式，不需要再像这样做了，直接用JSON的解析函数就行。

再次回顾QQ登录四大步骤：1）获取code；2）获取access_token; 3）获取oepnid；4）获取QQ用户信息。
```http
1) 获取code，使用此链接能打开QQ登录界面，点击头像登录且回调地址正确才会产生code。其返回链接的格式为：回调地址+code=XXX
https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=10205XXX&redirect_uri=https%3A%2F%2Fhaoxx.site%2Foauth%2Flogin%2Fqq&scope=get_user_info

返回值：https%3A%2F%2Fhaoxx.site%2Foauth%2Flogin%2Fqq&code=xxx
2) 获取access_token，将code值填入其中：
https://graph.qq.com/oauth2.0/token?grant_type={grant_type}&client_id={appid}&client_secret={appkey}&code={code}&redirect_uri={uri}
返回值（为html/text格式）：access_token=377E38EEE3A4F8D526952B7173C04D55&expires_in=7776000&refresh_token=1C748A9B3003BC81236988F79B15ED0F
3）获取oepnid
https://graph.qq.com/oauth2.0/me?access_token=11111111111111111111111111111111&fmt=json
返回值（为html/text格式）：callback( {"client_id":"102053757","openid":"305F286E01D87A361D22A0C4814EE162"} );
4）获取QQ用户信息（oauth_consumer_key这里填写clientid，就是appid）
https://graph.qq.com/user/get_user_info?access_token=11111111111111111111111111111111&oauth_consumer_key=101137684&openid=333333333333333333333333333
返回值：一个json字符串
```

以下为java代码的实现：
```java
/**
* 获取QQ的Token
*

* @return {@link TokenVO} QQ的Token
*/
public TokenVO getQqToken(String code) {
String getQqAccessTokenUrl = "https://graph.qq.com/oauth2.0/token?grant_type="+qqProperties.getGrantType() + "&client_id="+qqProperties.getAppId()+"&client_secret="+qqProperties.getAppKey()+"&code="+code+"&redirect_uri="+qqProperties.getRedirectUrl();
//logger.error("后端发送url来申请access_token为："+getQqAccessTokenUrl);
try (CloseableHttpClient client = HttpClients.createDefault()) {
	HttpGet httpGet = new HttpGet(getQqAccessTokenUrl);
	CloseableHttpResponse response = client.execute(httpGet);
	org.apache.http.HttpEntity entity = response.getEntity();
	byte[] bytes = EntityUtils.toByteArray(entity);
	String str = new String(bytes, "utf-8");
	//logger.error("access_token的回复为："+str);
	String[] split = str.split("&");
	String[] split1 = split[0].split("=");
	response.close();
	TokenVO tokenVO = new TokenVO();
	//logger.error("access_token为："+split1[1]);
	tokenVO.setAccess_token(split1[1]);  // 设置 access_token 属性
	return tokenVO;  // 返回 TokenVO 对象
		} catch (Exception e) {
		throw new ServiceException("qq登录错误,access_token获取失败:"+e);
	}
}
```

以及：

```java
/**
* 获取用户的OpenId
*
* @param accessToken 上一个函数的返回值
* @return 用户的OpenId
*/
private String getUserOpenId(String accessToken) {
String getQqOpenIdUrl = "https://graph.qq.com/oauth2.0/me?access_token="+accessToken + "&fmt="+"json";
// 返回用户OpenId
try (CloseableHttpClient client = HttpClients.createDefault()) {
	HttpGet httpGet = new HttpGet(getQqOpenIdUrl);
	CloseableHttpResponse response = client.execute(httpGet);
	org.apache.http.HttpEntity entity = response.getEntity();
	byte[] bytes = EntityUtils.toByteArray(entity);
	String jsonResponse = new String(bytes, StandardCharsets.UTF_8);
	// 使用 fastjson 解析 JSON
	JSONObject jsonObject = JSON.parseObject(jsonResponse);
	// 提取 openid 值
	String openid = jsonObject.getString("openid");
	//logger.error("openid为："+openid);
	// 返回 openid
	return openid;
	} catch (Exception e) {
		throw new ServiceException("qq登录错误,openid获取失败:"+e);
	}
}
```

## 五、springboot使用日志

1、引用库：
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
```

2、创建对象

&emsp;&emsp;假设是在ShutdownManager.java文件中，当前文件必有一个主类叫：`ShutdownManager`，则在该类里面创建一个日志对象：`private static final Logger logger = LoggerFactory.getLogger(ShutdownManager.class);`

3、使用该日志对象

如代码块所示：`logger.info("====关闭后台任务任务线程池====");`。


需要注意的是，其实直接写`System.out.println("字符串")`在`docker logs`中查看日志也都是能够看到的。

## 六、docker的日志管理工具

在docker中安装一个镜像：`dozzle`  ，就可以管理所有docker日志了。可以在公网环境下，使用`http://公网ip:8888/`来访问该容器，里面能查看所有容器的日志。

在`docker-compose.yml`中的配置文件如下：
```dockerfile
dozzle:
    image: amir20/dozzle:latest
    container_name: dozzle
    restart: always
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    privileged: true
    ports:
      - "8888:8080"
    networks:
      - blog-net   //注意：这个要和其他容器连在一个docker网桥上
```
