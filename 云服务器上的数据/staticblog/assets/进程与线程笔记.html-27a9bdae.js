import{$ as n,a0 as d,a1 as o,a6 as c,a2 as i,a3 as a,a4 as t,a5 as r,I as p}from"./framework-e783454b.js";const g="/media进程与线程笔记/d9b061df62171b02e7a445e1d176c593.png",f="/media进程与线程笔记/d1f2e482b131c2aac315142934b97807.png",s="/media进程与线程笔记/dffc560d52616dd91c7a30860543c238.png",l="/media进程与线程笔记/a480238e9c3785af646f9d776e569797.png",_="/media进程与线程笔记/c2a7079ed0d2e0959a02775cfc93798f.png",h="/media进程与线程笔记/c9dd37b5aeb33abe47b944c4fa8bed5f.png",m="/media进程与线程笔记/ebe07dbeff2c5d9943d4d094dca4ca93.png",b="/media进程与线程笔记/af808190d54947777f6c8ee2e8d91687.png",u="/media进程与线程笔记/36cf0a7153422dfaf17386b3796366c4.png",x="/media进程与线程笔记/02a6d45da336592e5cb66280578c295e.png",v="/media进程与线程笔记/6d0a2a04a3119ad47edcabd7349d4673.png",k="/media进程与线程笔记/f58553028c983dc7f5284ea0f6ff8f10.png",y="/media进程与线程笔记/5cb46546d42be10317ef6f30ce6d2fa3.png",z="/media进程与线程笔记/ef46427ce1d4b7268ae4baed43486364.png",N="/media进程与线程笔记/dcb7db7fed64b2b783a84f14c2324fc0.png",L="/media进程与线程笔记/5529093d85e5635aa1effa437df22107.png",E="/media进程与线程笔记/5f24fbd285b131e20cf48c931def0d45.png",I="/media进程与线程笔记/b329e9b72442e377d0ab3e954626d92a.png",V="/media进程与线程笔记/eeec806437bfc7f6d52f615ef7078477.png",q="/media进程与线程笔记/6f23ed4e0dfc3ec691de15324db383a4.png",A="/media进程与线程笔记/ae2a762c612c3978c89eac5acbea13ad.png",B="/media进程与线程笔记/ae42db34e057eaba61295c7337e7c546.png",C="/media进程与线程笔记/5341a44ed914b07567b7dc18abdb8390.png",U={},j=i("div",{class:"hint-container tip"},[i("p",{class:"hint-container-title"},"提示"),i("p",null,"进程与线程笔记")],-1),w=r('<h1 id="一、创建进程-线程" tabindex="-1"><a class="header-anchor" href="#一、创建进程-线程" aria-hidden="true">#</a> 一、创建进程/线程：</h1><p>1、进程创建pid_t fork(void); 说明：fork - create a child process</p><p>包含头：#include &lt;unistd.h&gt;</p><p>返回值：创建成功，则在父进程中返回子进程的PID，在子进程中返回0。创建失败，在父进程中返回-1。</p><p>2、进程创建pid_t vfork(void); 说明：vfork - create a child process and block parent</p><p>包含头：#include &lt;sys/types.h&gt;</p><p>#include &lt;unistd.h&gt;</p><p>3、线程创建int pthread_create(pthread_t *thread, const pthread_attr_t *attr,</p><p>void *(*start_routine) (void *), void *arg);</p><p>包含头：#include &lt;pthread.h&gt;</p><p>注意; Compile and link with -pthread.</p><p>返回值：创建成功返回0，否则返回错误值。</p><p>参数：</p><ol><li>pthread_t *thread：传递一个 pthread_t 类型的指针变量，也可以直接传递某个 pthread_t 类型变量的地址。pthread_t 是一种用于表示线程的数据类型，每一个 pthread_t 类型的变量都可以表示一个线程。</li><li>const pthread_attr_t *attr：用于手动设置新建线程的属性，例如线程的调用策略、线程所能使用的栈内存的大小等。大部分场景中，我们都不需要手动修改线程的属性，将 attr 参数赋值为 NULL，pthread_create() 函数会采用系统默认的属性值创建线程。</li><li>void *(*start_routine) (void *)：以函数指针的方式指明新建线程需要执行的函数，该函数的参数最多有 1 个（可以省略不写），形参和返回值的类型都必须为 void* 类型。void* 类型又称空指针类型，表明指针所指数据的类型是未知的。使用此类型指针时，我们通常需要先对其进行强制类型转换，然后才能正常访问指针指向的数据。</li><li>void *arg：指定传递给 start_routine 函数的实参，当不需要传递任何数据时，将 arg 赋值为 NULL 即可。</li></ol><p>**如果成功创建线程，pthread_create() 函数返回数字 0，反之返回非零值。各个非零值都对应着不同的宏，指明创建失败的原因，常见的宏有以下几种：</p><p>EAGAIN：系统资源不足，无法提供创建线程所需的资源。</p><p>EINVAL：传递给 pthread_create() 函数的 attr 参数无效。</p><p>EPERM：传递给 pthread_create() 函数的 attr 参数中，某些属性的设置为非法操作，程序没有相关的设置权限。</p><p>**以上这些宏都声明在 &lt;errno.h&gt; 头文件中，如果程序中想使用这些宏，需提前引入此头文件。</p><p>**示例：</p><p>void *receive(void *pth_arg) {}</p><p>pthread_t id;</p><p>pthread_create(&amp;id,NULL,receive,(void*)cfd);</p><h1 id="二、创建和使用进程-线程时的一些问题" tabindex="-1"><a class="header-anchor" href="#二、创建和使用进程-线程时的一些问题" aria-hidden="true">#</a> 二、创建和使用进程/线程时的一些问题：</h1><h2 id="_1、fork-和vfork-函数的区别" tabindex="-1"><a class="header-anchor" href="#_1、fork-和vfork-函数的区别" aria-hidden="true">#</a> 1、fork()和vfork()函数的区别：</h2><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为什么会有vfork，因为以前的fork 很傻， 它创建一个子进程时，将会创建一个新的地址</p><p>空间，并且拷贝父进程的资源，而往往在子进程中会执行exec 调用，这样，前面的拷贝工</p><p>作就是白费力气了，这种情况下，聪明的人就想出了vfork，它产生的子进程刚开始暂时与</p><p>父进程共享地址空间（其实就是线程的概念了），因为这时候子进程在父进程的地址空间中</p><p>运行，所以子进程不能进行写操作，并且在儿子 霸占着老子的房子时候，要委屈老子一</p><p>下了，让他在外面歇着（阻塞），一旦儿子执行了exec 或者exit 后，相 于儿子买了自己的</p><p>房子了，这时候就相于分家了。</p>',33),P={href:"https://blog.csdn.net/jianchi88/article/details/6985326",target:"_blank",rel:"noopener noreferrer"},D=i("p",null,"在代码中获得当前进程pid的函数为：getpid()；",-1),G=i("p",null,"在代码中获得当前进程父进程pid的函数为：getppid()。",-1),M=i("h2",{id:"_2、fork-功能简介",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_2、fork-功能简介","aria-hidden":"true"},"#"),a(" 2、fork()功能简介：")],-1),R=i("figure",null,[i("img",{src:f,alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),S=i("figure",null,[i("img",{src:s,alt:"",tabindex:"0",loading:"lazy"}),i("figcaption")],-1),T={href:"https://blog.csdn.net/qq_38410730/article/details/81193118",target:"_blank",rel:"noopener noreferrer"},$=r('<figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里需要注明一点：<strong>父子进程的调度的顺序是由调度器决定的，与进程的创建顺序无关。</strong></p><p>******还记得之前的图吗？子进程与父进程共享程序代码，而数据区、栈区、系统栈区相互独立。因此，父进程的代码实际上父、子进程要各执行一次。为了让父子进程执行不同的程序，有两种办法：1是在if(pid==0)中执行子程序特有的程序，2在子进程中调用execv()函数集。</p><p>在实际应用中，通常调用execv()的都是子进程。人们之所以创建一个子进程，其目的就是执行一个与父进程代码不同的程序，而系统调用execv()就是子进程执行一个新程序的手段之一。子进程调用execv()之后，系统会立即为子进程加载可执行文件分配私有程序内存空间，从此子进程也成为一个真正的进程。</p><p>如果说子进程是父进程的“儿子”，那么子进程在调用execv()之前，它所具有的单独用户堆栈和数据区也仅相当于它的私有“房间”；但因它还没有自己的“住房”，因此也只能寄住在“父亲”家，而不能“自立门户”，尽管它有自己的“户口”（进程控制块）。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>调用exec系列函数的前后，父子进程的关系变化如下图所示：</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>为了避免子进程成为孤儿进程，父进程应该要等子进程结束并销毁子进程后才可以退出。因此，父进程中应设置系统调用wait()，子进程中应设置退出函数exit()。</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+z+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+N+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3、vfork-的进一步说明" tabindex="-1"><a class="header-anchor" href="#_3、vfork-的进一步说明" aria-hidden="true">#</a> 3、vfork()的进一步说明：</h2><figure><img src="'+L+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4、线程的基本使用" tabindex="-1"><a class="header-anchor" href="#_4、线程的基本使用" aria-hidden="true">#</a> 4、线程的基本使用：</h2><figure><img src="'+E+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',22),F={href:"https://blog.csdn.net/yi_chengyu/article/details/120412980",target:"_blank",rel:"noopener noreferrer"},H=r('<figure><img src="'+I+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_5、线程与进程" tabindex="-1"><a class="header-anchor" href="#_5、线程与进程" aria-hidden="true">#</a> 5、线程与进程</h2><figure><img src="'+V+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+q+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+A+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6、fork与vfork" tabindex="-1"><a class="header-anchor" href="#_6、fork与vfork" aria-hidden="true">#</a> 6、fork与vfork</h2><figure><img src="'+B+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+C+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',8);function J(K,O){const e=p("ExternalLinkIcon");return d(),o("div",null,[j,c(" more "),w,i("p",null,[a("参考： "),i("a",P,[a("https://blog.csdn.net/jianchi88/article/details/6985326"),t(e)])]),D,G,M,R,S,i("p",null,[a("参考："),i("a",T,[a("https://blog.csdn.net/qq_38410730/article/details/81193118"),t(e)])]),$,i("p",null,[a("参考资料："),i("a",F,[a("https://blog.csdn.net/yi_chengyu/article/details/120412980"),t(e)])]),H])}const W=n(U,[["render",J],["__file","进程与线程笔记.html.vue"]]);export{W as default};
