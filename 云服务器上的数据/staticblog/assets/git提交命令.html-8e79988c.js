import{$ as e,a0 as i,a1 as t,a6 as l,a2 as n,a3 as a,a4 as d,a5 as c,I as r}from"./framework-e783454b.js";const o={},p=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"关于git软件的使用记录")],-1),u=n("h1",{id:"git提交命令",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#git提交命令","aria-hidden":"true"},"#"),a(" git提交命令")],-1),m={href:"https://blog.csdn.net/m0_46698504/article/details/129260726",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="_1、设置用户名和邮箱" tabindex="-1"><a class="header-anchor" href="#_1、设置用户名和邮箱" aria-hidden="true">#</a> 1、设置用户名和邮箱</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&quot;HaoY&quot;</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&quot;508506630@qq.com&quot;</span>
<span class="token comment"># 查看git的配置</span>
<span class="token function">git</span> config <span class="token parameter variable">--list</span>
<span class="token comment"># 使用代理</span>
<span class="token function">git</span> clone https://github.com/twbs/bootstrap.git <span class="token parameter variable">--config</span> <span class="token string">&quot;http.proxy=127.0.0.1:7890&quot;</span>  
<span class="token comment"># 查看clash日志，有github相关字样</span>

<span class="token comment">#ubuntu系统设置git的全局代理</span>
<span class="token comment"># 设置的是http的代理 fastgithub的端口是38457</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> http.proxy <span class="token string">&quot;http://127.0.0.1:7890&quot;</span>     <span class="token comment"># 设置的是http的代理</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> https.proxy <span class="token string">&quot;http://127.0.0.1:7890&quot;</span>    <span class="token comment"># 设置的是https的代理(clash和fastgithub不用设置这个)</span>
<span class="token comment"># 清除代理</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> http.proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、在gitee上创建并初始化一个仓库" tabindex="-1"><a class="header-anchor" href="#_2、在gitee上创建并初始化一个仓库" aria-hidden="true">#</a> 2、在gitee上创建并初始化一个仓库</h2><p>在网站上手动进行</p><h2 id="_3、将该仓库拉取到本地" tabindex="-1"><a class="header-anchor" href="#_3、将该仓库拉取到本地" aria-hidden="true">#</a> 3、将该仓库拉取到本地</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git clone https://xx.git
//此时该目录下会生成一个.git隐藏目录
//可以用vscode打开该目录，采用图形化界面来操作了
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、将工程文件或目录放置到上述目录下-并上传" tabindex="-1"><a class="header-anchor" href="#_4、将工程文件或目录放置到上述目录下-并上传" aria-hidden="true">#</a> 4、将工程文件或目录放置到上述目录下，并上传</h2><p>使用此命令随时查看工作状态：</p><p><code>git status</code></p><p>1）添加文件到缓冲区</p><p><code>git add * //或者git add 文件名/目录名</code></p><p>2）上传到git的本地版本库中，并做记录</p><p><code>git commit -m &quot;第一次提交&quot;</code></p><p>3）先做分支初始化，再上传到远程服务器中</p><p><code>git init</code></p><p><code>git push origin</code></p><h2 id="_5、补充说明" tabindex="-1"><a class="header-anchor" href="#_5、补充说明" aria-hidden="true">#</a> 5、补充说明</h2><p>要么当前.git目录下的config文件文件如下：</p><figure><img src="https://api.onedrive.com/v1.0/shares/s!An8j80bjmrTdlHCHfRyOUR24-TBS/root/content" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>否则，.config文件中没有说明url的话，你可以这样(直接通过git push -f 命令指定仓库也是可以的)，下面是deploy.sh文件的部分内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">times</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&quot;+%Y-%m-%d__%H:%M:%S&quot;</span><span class="token variable">)</span></span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token variable">$times</span>
<span class="token function">git</span> branch <span class="token parameter variable">-M</span> main
<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:XiaoYuer2022/XiaoYuer2022.github.io.git main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、git清空仓库" tabindex="-1"><a class="header-anchor" href="#_6、git清空仓库" aria-hidden="true">#</a> 6、git清空仓库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> status
<span class="token comment"># 创建一个新文件夹,或者手动删除本地所有文件在推送</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;仓库已经清空&quot;</span>

<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:XiaoYuer2022/XiaoYuer2022.github.io.git main

<span class="token comment"># 要么直接git push -f 或者下面两行</span>

<span class="token comment">#添加远程仓库(已添加可以跳过)</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:username/repositoryname
<span class="token comment">#推送到远程仓库</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master

<span class="token comment"># 强制推送</span>
<span class="token function">git</span> push <span class="token parameter variable">--force</span> origin main 或者 <span class="token function">git</span> push <span class="token parameter variable">--force</span> origin master

<span class="token comment"># 从远端服务器拉取到本地</span>
<span class="token function">git</span> pull origin master
<span class="token comment"># 或者：</span>
<span class="token number">1</span>）git fetch origin    <span class="token comment"># 下载最新代码，origin是远端仓库地址</span>
<span class="token number">2</span>）git <span class="token function">diff</span>  HEAD origin/master <span class="token comment"># HEAD是本地分支，查看两者差异</span>
<span class="token number">3</span>）git pull  <span class="token comment"># 合并</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动删除文件的命令是：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>恢复：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 把删除的文件恢复到最新版本 </span>
<span class="token function">git</span> checkout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、初始创建一个仓库后" tabindex="-1"><a class="header-anchor" href="#_7、初始创建一个仓库后" aria-hidden="true">#</a> 7、初始创建一个仓库后</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git init
git add README.md
git commit -m <span class="token string">&quot;first commit&quot;</span>
git branch -M main
git remote add origin git@github.com:XiaoYuer2022/chat.git
git push -u origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特别说明：除第一次上传外，后续都不需要<code>git remote add origin git@github.com:XiaoYuer2022/chat.git</code>命令了。</p><h2 id="_8、使用代理" tabindex="-1"><a class="header-anchor" href="#_8、使用代理" aria-hidden="true">#</a> 8、使用代理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用代理</span>
<span class="token function">git</span> clone https://github.com/twbs/bootstrap.git <span class="token parameter variable">--config</span> <span class="token string">&quot;http.proxy=127.0.0.1:7890&quot;</span>  
<span class="token comment"># 查看clash日志，有github相关字样</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9、添加远端仓库" tabindex="-1"><a class="header-anchor" href="#_9、添加远端仓库" aria-hidden="true">#</a> 9、添加远端仓库</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git remote add origin git@github.com:XiaoYuer2022/TinyWebServer2023.git
<span class="token comment">## 如果重复的话,1)更改远端仓库：</span>
git remote set-url origin git@github.com:XiaoYuer2022/TinyWebServer2023.git

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10、从远端github仓库更新代码" tabindex="-1"><a class="header-anchor" href="#_10、从远端github仓库更新代码" aria-hidden="true">#</a> 10、从远端github仓库更新代码</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>git pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_11、向仓库添加新功能" tabindex="-1"><a class="header-anchor" href="#_11、向仓库添加新功能" aria-hidden="true">#</a> 11、向仓库添加新功能</h2><div class="language-git line-numbers-mode" data-ext="git"><pre class="language-git"><code>在 Git 中，git add . 与 git add -A 命令都可以将当前目录下的所有修改过的文件添加到 Git 的暂存区，以便后续进行提交（commit）操作。但是，两者之间还是有一些明显的区别的。

具体来说：

git add . 只会将新文件和修改过的文件添加到 Git 暂存区，而不包括已经删除的文件。

git add -A 命令可以将所有修改过的、新建的、删除的文件都添加到 Git 暂存区，相当于 git add . 和 git add -u 命令的联合操作。

简而言之，git add . 只会添加已跟踪文件的更改和新文件，但不包括已删除的文件；而 git add -A 将更改、新文件和删除的文件全部添加到 Git 暂存区。当我们需要确保已将所有修改过的文件添加到 Git 中时，通常建议使用 git add -A 命令来执行添加操作。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38);function g(b,h){const s=r("ExternalLinkIcon");return i(),t("div",null,[p,l(" more "),u,n("p",null,[n("a",m,[a("参考链接"),d(s)])]),v])}const f=e(o,[["render",g],["__file","git提交命令.html.vue"]]);export{f as default};
