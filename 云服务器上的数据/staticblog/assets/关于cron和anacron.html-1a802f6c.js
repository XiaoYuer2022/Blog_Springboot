import{$ as r,a0 as n,a1 as o,a6 as a,a2 as t,a5 as p}from"./framework-e783454b.js";const c={},e=t("div",{class:"hint-container tip"},[t("p",{class:"hint-container-title"},"提示"),t("p",null,"关于cron和anacron的说明")],-1),s=p("<p>用户自己建立的cronttab文件在这个目录下：/var/spool/cron (要创建一份个人 crontab 文件，只要输入： crontab -e)</p><p>比较这个目录/var/spool/anacron/下的cron.daily cron.weekly cron.monthly与当前系统的时间，来判断定时任务是否需要执行。</p><p>1、关于run-parts命令</p><p>对于ubuntu来说，run-parts是个二进制文件，位于/bin/run-parts;对于centos来说，他是一个脚本。它的后面接一个目录名，功能就是运行这个</p><p>目录下的第一层目录中的所有脚本文件。 就是遍历目标文件夹，执行第一层目录下的可执行权限的文件。</p><p>参数 --test : run-parts --test /目录名 //打印会被run-parts运行的脚本的名称，但不会实际的运行这些脚本。</p><p>参数 --list : run-parts --list /目录名 //打印所有匹配的文件名，不局限于可执行，没有执行权限的文件也会打印，但不会实际的去执行。</p><p>该选项不能与–test一起使用。</p><p>参数 --report : run-parts --report /目录名 //类似于–verbose，但只打印会生成输出的脚本的名称。脚本的名称被打印到脚本首先产生输出的STDUT或STDRR中的任何一个</p><p>其它参数，略</p><p>2、关于test命令</p><p>在脚本中常用test测试命令。其中在crontab中的test -x 文件名 是在测试该文件是否具有可执行权限。</p><p>3、cron和anacron的说明 /etc/anacrontab 和 /etc/crontab</p><p>我们用 cron.daily 工作来说明一下 /etc/anacrontab 的执行过程:</p><p>读取 /var/spool/anacron/cron.daily 文件中 anacron 上一次执行的时间。</p><p>和当前时间比较，如果两个时间的差值超过 1 天，就执行 cron.daily 工作。</p><p>只能在 03：00-22：00 执行这个工作。</p><p>执行工作时强制延迟时间为 5 分钟，再随机延迟 0～45 分钟。</p><p>使用 nice 命令指定默认优先级，使用 run-parts 脚本执行 /etc/cron.daily 目录中所有的可执行文件。</p><p>大家会发现，/etc/cron.{daily，weekly，monthly} 目录中的脚本在当前的 Linux 中是被 anacron 调用的，不再依靠 cron 服务。不过，anacron 不用设置多余的配置，我们只需要把需要定时执行的脚本放入 /etc/cron.{daily，weekly，monthly} 目录中，就会每天、每周或每月执行，而且也不再需要启动 anacron 服务了。如果需要进行修改，则只需修改 /etc/anacrontab 配置文件即可。</p><p>// /etc/crontab</p><p>11 17 * * * * root cd / &amp;&amp; run-parts --report /etc/cron.hourly</p><p>12 25 6 * * * root test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron.daily )</p><p>13 47 6 * * 7 root test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron.weekly )</p><p>14 52 6 1 * * root test -x /usr/sbin/anacron || ( cd / &amp;&amp; run-parts --report /etc/cron.monthly )</p><p>// /etc/anacrontab</p><p>period delay job-identifier command</p><p>10 # These replace cron&#39;s entries</p><p>11 1 5 cron.daily run-parts --report /etc/cron.daily #每天开机 5 分钟后就检查 /etc/cron.daily 目录内的文件是否被执行，如果今天没有被执行，那就执行</p><p>12 7 10 cron.weekly run-parts --report /etc/cron.weekly #每隔 7 天开机后 25 分钟检查 /etc/cron.weekly 目录内的文件是否被执行，如果一周内没有被执行，就会执行</p><p>13 @monthly 15 cron.monthly run-parts --report /etc/cron.monthly #每隔一个月开机后 45 分钟检查 /etc/cron.monthly 目录内的文件是否被执行，如果一个月内没有被执行，那就执行</p><p>//注：把5/10/45全改为0,anacron或cron的定时任务就会按照你指定的准确时间运行，否则默认会有一定的延迟</p><p>4、cron和anacron的比较</p><p>下面是 cron 以及 anacron 的比较，帮助你理解何时用他们其中一个。</p><table><thead><tr><th>cron</th><th>anacron</th></tr></thead><tbody><tr><td>它是守护进程</td><td>它不是守护进程</td></tr><tr><td>适合服务器</td><td>适合桌面/笔记本电脑</td></tr><tr><td>可以让你以分钟级运行计划任务</td><td>只能让你以天为基础来运行计划任务</td></tr><tr><td>关机时不会执行计划任务</td><td>如果计划任务到期，机器是关机的，那么它会在机器下次开机后执行计划任务</td></tr><tr><td>普通用户和 root 用户都可以使用</td><td>只有 root 用户可以使用（使用特定的配置启动普通任务）</td></tr></tbody></table>",35);function d(l,i){return n(),o("div",null,[e,a(" more "),s])}const u=r(c,[["render",d],["__file","关于cron和anacron.html.vue"]]);export{u as default};
