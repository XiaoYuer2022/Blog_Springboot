import{$ as i,a0 as l,a1 as d,a6 as r,a2 as n,a3 as s,a4 as c,a5 as e,I as o}from"./framework-e783454b.js";const t={},p=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"关于docker软件的使用记录")],-1),v=e(`<h1 id="docker记录" tabindex="-1"><a class="header-anchor" href="#docker记录" aria-hidden="true">#</a> docker记录</h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>镜像 容器 仓库 略</p><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>docker rm container-id 删除指定 id 的容器</p><p>docker stop/start container-id 停止/启动指定 id 的容器</p><p>docker rmi image-id 删除指定 id 的镜像</p><p>docker volume ls 查看 volume 列表</p><p>docker network ls 查看网络列表</p><p>镜像相关：</p><p>导出镜像：docker iamge save centos:7.2.1511 &gt; centos-7.2.1511.tgz</p><p>导入镜像： docker image load -i centos-7.2.1511.tgz</p><p>查看镜像详细信息：docker image inspect 镜像-ID</p><p>docker images 查看镜像列表</p><p>docker search XX 默认在本地，没有的话去docker hub上搜索</p><p>容器相关： docker ps 查看当前运行中的容器(-a查看所有容器记录，包括死了的) 用镜像启动一个容器：docker run -d -p 80:80 nginx (-d表示后台运行，-p表示端口映射) 查看容器信息：docker container inspect 容器ID 进入容器空间1：docker run -it centos bash （从镜像到容器） 进入容器空间2：docker exec -it 容器ID bash （从终端进入到一个活着的容器，比如后台容器）</p><p>容器端口映射：</p><table><thead><tr><th>命令</th><th>解释</th></tr></thead><tbody><tr><td>-<strong>p hostPort:containerPort</strong></td><td>端口映射-p 8080:80</td></tr><tr><td><strong>-p ip:hostPort:containerPort</strong></td><td>配置监听地址-p 10.0.0.100:8080:80</td></tr><tr><td><strong>p ip::containerPort</strong></td><td>随机分配端口 -p 10.0.0.100：：80</td></tr><tr><td><strong>-p hostPort:containerPort:udp</strong></td><td>指定协议 -p 8080:80:tcp</td></tr><tr><td><strong>-p 81:80 -p 443:443</strong></td><td>指定多个</td></tr></tbody></table><h2 id="写自己的镜像-dockerfile" tabindex="-1"><a class="header-anchor" href="#写自己的镜像-dockerfile" aria-hidden="true">#</a> 写自己的镜像 Dockerfile</h2><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM node:11
MAINTAINER easydoc.net

# 复制代码
ADD . /app

# 设置容器启动后的默认运行目录
WORKDIR /app

# 运行命令，安装依赖
# RUN 命令可以有多个，但是可以用 &amp;&amp; 连接多个命令来减少层级。
# 例如 RUN npm install &amp;&amp; cd /app &amp;&amp; mkdir logs
RUN npm install --registry=https://registry.npm.taobao.org

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 &amp;&amp; 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app &amp;&amp; ./start.sh
CMD node app.js

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明： FROM 这个镜像的妈妈是谁？（指定基础镜像） MAINTAINER告诉别人，谁负责养他？（指定维护者信息，可以没有） RUN 你想让他干啥（在命令前加上RUN即可） ADD 给他一点创业资金（copy文件，会自动解压） WORKDIR 我是cd，今天刚化了妆（设置当前工作目录） VILUME 给他一个存放行李的地方（设置卷，挂载主机目录） EXPOSE 他要打开的门是什么（指定对外的端口） CMD 奔跑吧，兄弟 （指定容器启动后要干的事情） <strong>Docker的其他命令</strong>：</p><blockquote><p>CPOY 复制文件</p><p>ENV 环境变量</p><p>ENTRYPOINT 容器启动后执行的命令</p></blockquote><h3 id="build为镜像-安装包-和运行" tabindex="-1"><a class="header-anchor" href="#build为镜像-安装包-和运行" aria-hidden="true">#</a> Build为镜像（安装包）和运行</h3><p>编译 <code>docker build -t test:v1 .</code></p><blockquote><p>-t 设置镜像名字和版本号</p></blockquote><p>运行<code>docker run -p 8080:8080 --name test-hello test:v1</code></p><blockquote><p>-p 映射容器内端口到宿主机</p><p>--name 容器名字</p><p>-d 后台运行</p></blockquote><h2 id="目录挂载" tabindex="-1"><a class="header-anchor" href="#目录挂载" aria-hidden="true">#</a> 目录挂载</h2><p>现存问题：</p><ul><li>使用 Docker 运行后，我们改了项目代码不会立刻生效，需要重新build和run，很是麻烦。</li><li>容器里面产生的数据，例如 log 文件，数据库备份文件，容器删除后就丢失了。</li></ul><p><strong>目录挂载</strong>以解决上述问题</p><p>几种挂载方式：</p><ul><li>bind mount 直接把宿主机目录映射到容器内，适合挂代码目录和配置文件。可挂到多个容器上</li><li>volume 由容器创建和管理，创建在宿主机，所以删除容器不会丢失，官方推荐，更高效，Linux 文件系统，适合存储数据库数据。可挂到多个容器上</li><li>tmpfs mount 适合存储临时文件，存宿主机内存中。不可多容器共享。</li></ul><h3 id="挂载演示" tabindex="-1"><a class="header-anchor" href="#挂载演示" aria-hidden="true">#</a> 挂载演示</h3><p><code>bind mount</code> 方式用绝对路径 -v D:/code:/app</p><p><code>volume</code> 方式，只需要一个名字 -v db-data:/app</p><h2 id="_2023-04-29-学习容器技术" tabindex="-1"><a class="header-anchor" href="#_2023-04-29-学习容器技术" aria-hidden="true">#</a> 2023/04/29 学习容器技术</h2><p>一种环境隔离的虚拟化技术，相比于传统的虚拟化技术，它拥有利用系统资源更高效、启动时间更快、持续交付和部署等特点。</p><h2 id="_2023-06-06-使用" tabindex="-1"><a class="header-anchor" href="#_2023-06-06-使用" aria-hidden="true">#</a> 2023/06/06 使用</h2>`,39),u={href:"https://github.com/ttkican/Blog",target:"_blank",rel:"noopener noreferrer"},m=e(`<h3 id="_1、docker-与docker-compose的安装" tabindex="-1"><a class="header-anchor" href="#_1、docker-与docker-compose的安装" aria-hidden="true">#</a> 1、docker 与docker-compose的安装</h3><h3 id="_2、下载镜像" tabindex="-1"><a class="header-anchor" href="#_2、下载镜像" aria-hidden="true">#</a> 2、下载镜像</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker pull 镜像名:属性
docker pull canal/canal-server:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、运行镜像" tabindex="-1"><a class="header-anchor" href="#_3、运行镜像" aria-hidden="true">#</a> 3、运行镜像</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker run --name canal -d canal/canal-server:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：镜像只有一个，下载的就是镜像。但是可以用该镜像运行若干个不同的容器</p><h3 id="_4、docker容器的操作" tabindex="-1"><a class="header-anchor" href="#_4、docker容器的操作" aria-hidden="true">#</a> 4、docker容器的操作：</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1) 查看正在运行的容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> 
<span class="token comment"># 1.2) 查看已经下载的镜像</span>
<span class="token function">docker</span> images
<span class="token comment"># 2）查看所有容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
<span class="token comment"># 3) 停止指定容器</span>
<span class="token function">docker</span> stop 容器名或容器ID
<span class="token comment"># 4）启动容器</span>
<span class="token function">docker</span> start 容器名和容器ID
<span class="token comment"># 5）进入容器终端，以mysql容器举例</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql <span class="token function">bash</span>
<span class="token comment"># 上述命令中 -it 表示以交互式的方式， bash 表示以bash终端的方式来交互</span>
<span class="token comment"># 6）容器与本地Linux之间的文件拷贝</span>
<span class="token function">docker</span> <span class="token function">cp</span> /home/ubuntu/xxx.sql mysql:/
<span class="token function">docker</span> <span class="token function">cp</span> mysql:/xx.sql /home/ubuntu/
<span class="token comment"># 7) 容器的删除和镜像的删除</span>
<span class="token function">docker</span> <span class="token function">rm</span> 容器名或容器ID
<span class="token function">docker</span> rmi 镜像名或镜像ID
<span class="token comment"># 8) 使用docker-compose和对应的docker-compose.yml来启动docker容器</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> <span class="token parameter variable">--build</span>  <span class="token comment"># 在有docker-compose.yml的同级目录下运行哦</span>
<span class="token comment"># 9) 查看docker网络</span>
<span class="token function">docker</span> network <span class="token function">ls</span>
<span class="token comment"># 查看上述命令的输出，例如我在docker-compose.yml中设置了网络名为：blog-net，然后就能在docker network ls下看到有个NAME为docker_blog-net的网络，然后其NETWORK_ID为d32231f3430c，在然后使用ifconfig命令查看docker虚拟网卡(是类似于br-xxx这种，这里是br-d32231f3430c，而不是下面的veth8fad9XX等)，就知道了该docker网络下的IP为172.20.0.1，后面其他同docker network下的容器想要和mysql容器和redis容器通信的话就填172.20.0.1。注意：docker容器下的127.0.0.1是容器内部自身的回环地址，其他容器肯定访问不到。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker-compose.yml文件示例：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>version: &quot;3&quot;
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
      - &quot;/usr/local/upload:/usr/local/upload&quot;
    ports:
      - &quot;8080:8080&quot;
    networks:
      - blog-net
  mysql:
    image: mysql:\${MYSQL_VERSION}
    container_name: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD}
      TZ: Asia/Shanghai
    ports:
      - &quot;3306:3306&quot;
    networks:
      - blog-net
  redis:
    image: redis:\${REDIS_VERSION}
    container_name: redis
    restart: always
    command: --requirepass &quot;\${REDIS_PASSWORD}&quot;
    ports:
      - &quot;6379:6379&quot;
    networks:
      - blog-net
  rabbitmq:
    image: rabbitmq:\${RABBITMQ_VERSION}
    container_name: rabbitmq
    restart: always
    environment:
      RABBITMQ_DEFAULT_USER: \${RABBITMQ_USER}
      RABBITMQ_DEFAULT_PASS: \${RABBITMQ_PASSWORD}
    ports:
      - &quot;5672:5672&quot;
      - &quot;15672:15672&quot;
    networks:
      - blog-net
  elasticsearch:
    image: elasticsearch:\${ELASTICSEARCH_VERSION}
    container_name: elasticsearch
    restart: always
    environment:
      discovery.type: &quot;single-node&quot;
      ES_JAVA_OPTS: &quot;-Xms64m -Xmx128m&quot;
      http.cors.enabled: &quot;true&quot;
      http.cors.allow-origin: &quot;*&quot;
      xpack.security.enabled: &quot;true&quot;
      ELASTIC_PASSWORD: &quot;\${ELASTICSEARCH_PASSWORD}&quot;
    ports:
      - &quot;9200:9200&quot;
      - &quot;9300:9300&quot;
    networks:
      - es-net
      - blog-net
  kibana:
    image: kibana:\${ELASTICSEARCH_VERSION}
    container_name: kibana
    volumes:
      - &quot;/usr/local/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml&quot;
    depends_on:
      - elasticsearch
    ports:
      - &quot;5601:5601&quot;
    networks:
      - es-net
      - blog-net
  canal_server:
    image: canal/canal-server:\${CANAL_VERSION}
    container_name: canal
    volumes:
      - &quot;/usr/local/canal/instance.properties:/home/admin/canal-server/conf/example/instance.properties&quot;
      - &quot;/usr/local/canal/canal.properties:/home/admin/canal-server/conf/canal.properties&quot;
    ports:
      - &quot;11111:11111&quot;
    networks:
      - blog-net
  nginx:
    image: nginx:\${NGINX_VERSION}
    container_name: nginx
    restart: always
    volumes:
      - &quot;/usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf&quot;
      - &quot;/etc/ssl/certs:/etc/ssl/certs&quot;
      - &quot;/usr/local/vue:/usr/local/vue&quot;
      - &quot;/usr/local/upload:/usr/local/upload&quot;
    privileged: true
    ports:
      - &quot;443:443&quot;
      - &quot;80:80&quot;
    networks:
      - blog-net
networks:
  es-net:
    driver: bridge
  blog-net:
    driver: bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的启动脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 文件名：blog-start.sh</span>
<span class="token comment"># 打包之后上传的jar包路径</span>
<span class="token assign-left variable">SOURCE_PATH</span><span class="token operator">=</span>/usr/local/docker
<span class="token comment"># docker的镜像和容器名称都命名为这个</span>
<span class="token assign-left variable">SERVER_NAME</span><span class="token operator">=</span>blog-springboot
<span class="token assign-left variable">TAG</span><span class="token operator">=</span>latest
<span class="token comment"># 容器id</span>
<span class="token assign-left variable">CID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;<span class="token variable">$SERVER_NAME</span>&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">)</span></span>
<span class="token comment"># 镜像id</span>
<span class="token assign-left variable">IID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;<span class="token variable">$SERVER_NAME</span>&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $3}&#39;</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$CID</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;存在容器<span class="token variable">$SERVER_NAME</span>, CID-<span class="token variable">$CID</span>&quot;</span>
  <span class="token function">docker</span> stop <span class="token variable">$CID</span>
  <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable">$CID</span>
<span class="token keyword">fi</span>
<span class="token comment"># 构建docker镜像</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$IID</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;存在<span class="token variable">$SERVER_NAME</span>:<span class="token variable">$TAG</span>镜像，IID=<span class="token variable">$IID</span>&quot;</span>
  <span class="token function">docker</span> rmi <span class="token variable">$IID</span>
<span class="token keyword">fi</span>
<span class="token comment"># 重新构建镜像并运行</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span> <span class="token parameter variable">--build</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function b(k,h){const a=o("ExternalLinkIcon");return l(),d("div",null,[p,r(" more "),v,n("p",null,[s("在配置和使用"),n("a",u,[s("ttkican_Blog-master博客"),c(a)]),s("时的一些命令记录")]),m])}const q=i(t,[["render",b],["__file","docker记录.html.vue"]]);export{q as default};
