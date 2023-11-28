import{$ as n,a0 as o,a1 as l,a6 as r,a2 as e,a3 as t,a4 as p,a5 as a,I as s}from"./framework-e783454b.js";const c="/media进程间通信学习内容/84e8bfe1bdfb66b1da75e06ca2c9fc33.png",d="/media进程间通信学习内容/43d8a1d63838b68102c493a773adb831.png",g="/media进程间通信学习内容/20ec88f94bff808a8bcdbbd7e00c08cd.png",_="/media进程间通信学习内容/05438e1a57a775323713c45100ac9b5f.png",m="/media进程间通信学习内容/630cb06c3086ffba6fb203a5a3ae317b.png",f="/media进程间通信学习内容/47fae86680ce79a7ed24d7237c1d16dc.png",u="/media进程间通信学习内容/c0bdec69bc1cc87001a1903296feba86.png",b="/media进程间通信学习内容/a55a1d964faddbc271c37e56f0588cde.png",h="/media进程间通信学习内容/3a10aa097584f54f8b871ad0fc8668e6.png",x={},F=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"提示"),e("p",null,"进程间通信学习内容")],-1),I=a('<p><img src="'+c+'" alt="" loading="lazy"><img src="'+d+'" alt="" loading="lazy"><img src="'+g+'" alt="" loading="lazy"></p><h2 id="一、定义介绍" tabindex="-1"><a class="header-anchor" href="#一、定义介绍" aria-hidden="true">#</a> 一、定义介绍</h2><ol><li>**管道：**管道是Linux 中进程间通信的一种方式，它把一个程序的输出直接连接到另一个程序的输入。Linux 的管道主要包括两种：无名管道和命名管道。 <ol><li><p><strong>管道（无名管道）</strong></p><p><strong>（1）无名管道</strong></p></li></ol></li></ol><p>无名管道有几个重要的限制：</p><p>无名管道是半双工的，数据只能在一个方向上流动，A进程传给B进程，不能反向传递管道只能用于父子进程或兄弟进程之间的通信，即具有亲缘关系的进程。</p><p>无名管道的特点：</p><p>1）无名管道是半双工的</p><p>2）无名管道没有名字：只能用于父子进程或者兄弟进程之间（具有亲缘关系的进程）。</p><p>3）无名管道不是普通的文件，并且只存在与内存中。</p><p>4）无名管道的缓冲区是有限的，该缓冲区的大小为4Kbyte。</p><ol><li>**命名管道：**命名管道是一种特殊类型的文件，它在系统中以文件形式存在。这样克服了无名管道的弊端，他可以允许没有亲缘关系的进程间通信。</li></ol><p>命名管道特点：</p><p>1）FIFO在文件系统中作为一个特殊的文件而存在。</p><p>2）虽然FIFO文件存在于文件系统中，但FIFO中的内容却存放在内存中，在Linux中，该缓冲区的大小为4Kbyte。</p><p>3）FIFO有名字，不同的进程可以通过该命名管道进行通信</p><p>4）FIFO所传送的数据是无格式的。</p><p>5）从FIFO读数据是一次性操作，数据一旦被读，它就从FIFO中被抛弃，释放空间以便写更多的数据。</p><p>6）当共享FIFO的进程执行完所有的I/O操作以后，FIFO将继续保存在文件系统中以便以后使用。</p><ol><li>**信号：**信号是软件层次上对中断机制的一种模拟，是一种异步通信方式，进程不必通过任何操作来等待信号的到达。信号可以在用户空间进程和内核之间直接交互，内核可以利用信号来通知用户空间的进程发生了哪些系统事件。</li></ol><p>信号的来源有两种：硬件来源（如键盘ctrl+c），软件来源（kill, raise, alarm和setitimer以及sigqueue函数，当然还包括一些非法操作）；</p><p>操作系统对信号的处理方式：1）忽略；有两个信号是不能忽略的：SIGKLL和SIGSTOP；2）捕捉，执行对应的信号处理程序；3）缺省，执行默认操作。</p><ol><li>**消息队列：**消息队列是内核地址空间中的内部链表，具有特定的格式,存放在内存中并由消息队列标识符标识，并且允许一个或多个进程向它写入与读取消息。消息队列通过Linux内核在各个进程直接传递内容，消息顺序地发送到消息队列中，并以几种不同的方式从队列中获得，每个消息队列可以用IPC标识符唯一地进行识别。</li></ol><p>消息队列克服了信号承载信息量少的问题，管道只能承载无格式字符流。</p><ol><li>**信号量：**信号量实质上就是一个标识可用资源数量的计数器，它的值总是非负整数。它们常常被用作一个锁机制，在某个进程正在对特定的资源进行操作时，信号量可以防止另一个进程去访问它。</li></ol><p>信号量可细分为：二值信号量和计数信号量</p><p>信号量是一种特殊的变量，它只取正整数值并且只允许对这个值进行两种操作：等待（wait）和信号（signal）。（P、V操作，P用于申请资源，V用于释放资源）。</p><ol><li>**共享内存：**共享内存是在多个进程之间共享内存区域的一种进程间的通信方式，使得多个进程可以直接读写同一块内存空间，它是针对其他通信机制运行效率较低而设计的。共享内存由IPC为进程创建的一个特殊地址范围，为了在多个进程间交换信息，内核专门留出了一块内存区，可以由需要访问的进程将其映射到自己的私有地址空间。进程就可以直接读写这一块内存而不需要进行数据的拷贝，从而大大提高效率。</li></ol><p>需要注意的是：共享内存并未提供同步机制，在一个进程结束对共享内存的写操作之前，并无自动机制可以阻止另二个进程开始对它进行读取。所以，我们通常需要用其他的机制来同步对共享内存的访问。</p><ol><li>**内存映射：**内存映射，是将一个文件映射到一块内存的方法。内存映射文件与虚拟内存有些类似，通过内存映射文件可以保留一个地址的区域，同时将物理存储器提交给此区域，内存文件映射的物理存储器来自一个已经存在于磁盘上的文件，而且在对该文件进行操作之前必须首先对文件进行映射。使用内存映射文件处理存储于磁盘上的文件时，将不必再对文件执行I/O操作。每一个使用该机制的进程通过把同一个共享的文件映射到自己的进程地址空间来实现多个进程间的通信（这里类似于共享内存，只要有一个进程对这块映射文件的内存进行操作，其他进程也能够马上看到）。</li><li>**套接字socket：**套接字是更为基础的进程间通信机制，与其他方式不同的是，套接字可用于不同机器之间的进程间通信。在Linux中，套接字是基于网络的，它也有自己的家族名字--AF_INET。</li></ol><h2 id="二、详细函数接口说明" tabindex="-1"><a class="header-anchor" href="#二、详细函数接口说明" aria-hidden="true">#</a> 二、详细函数接口说明</h2>',30),k={href:"https://blog.csdn.net/a987073381/article/details/52006729",target:"_blank",rel:"noopener noreferrer"},y={href:"https://blog.csdn.net/zqixiao_09/article/details/50485047",target:"_blank",rel:"noopener noreferrer"},O={href:"https://blog.csdn.net/zqixiao_09/article/details/50498874?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.no_search_link&spm=1001.2101.3001.4242.1",target:"_blank",rel:"noopener noreferrer"},z={href:"https://blog.csdn.net/qq_27664167/article/details/81712887",target:"_blank",rel:"noopener noreferrer"},S=a('<p>1、管道</p><p>1.1无名管道</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过使用底层的read和write调用来访问数据。向file_descriptor[1]写数据，从file_descriptor[0]中读数据。写入与读取的顺序原则是先进先出。</p><p>1.2 命名管道</p><p>命名管道是一种特殊类型的文件，它在系统中以文件形式存在。这样克服了无名管道的弊端，他可以允许没有亲缘关系的进程间通信。</p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>编程示例：</p><p>#include &lt;sys/types.h&gt;</p><p>#include &lt;sys/stat.h&gt;</p><p>int mkfifo(const char *filename,mode_t mode); //建立一个名字为filename的命名管道，参数mode为该文件的权限（mode%~umask），若成功则返回0，否则返回-1，错误原因存于errno中。</p><p>eg.mkfifo( &quot;/tmp/cmd_pipe&quot;, S_IFIFO | 0666 );</p><p>具体操作方法只要创建了一个命名管道然后就可以使用open、read、write等系统调用来操作。创建可以手工创建或者程序中创建。</p><p>int mknod(const char *path, mode_t mode, dev_t dev); //第一个参数表示你要创建的文件的名称，第二个参数表示文件类型，第三个参数表示该文件对应的设备文件的设备号。只有当文件类型为 S_IFCHR 或 S_IFBLK 的时候该文件才有设备号，创建普通文件时传入0即可。</p><p>eg.mknod(FIFO_FILE,S_IFIFO|0666,0);</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>2、信号</p><p>信号机制是unix系统中最为古老的进程之间的通信机制，用于一个或几个进程之间传递异步信号。信号可以有各种异步事件产生，比如键盘中断等。shell也可以使用信号将作业控制命令传递给它的子进程。</p><p>在此列出几个简单使用方法定义：</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>3、消息队列</p><p>Msgget() msgsnd() msgrcv() msgctl()</p><p>4、信号量（Semaphore）</p><p>Semget() semop() sembuf</p><p>5、共享内存（Share Memory）</p><p>Shmget() shmat() shmdt()</p><p>6、内存映射（Memory Map）</p><p>*mmap() munmap() msync()</p><p>7、套接字</p><p>套接字的创建和使用与管道是有区别的，套接字 明确地将客户端与服务器 区分开来，可以实现多个客户端连到同一服务器。</p><p>服务器套接字连接过程描述：</p><p>首先，服务器应用程序用socket创建一个套接字，它是系统分配服务器进程的类似文件描述符的资源。 接着，服务器调用bind给套接字命名。这个名字是一个标示符，它允许linux将进入的针对特定端口的连接转到正确的服务器进程。 然后，系统调用listen函数开始接听，等待客户端连接。listen创建一个队列并将其用于存放来自客户端的进入连接。 当客户端调用connect请求连接时，服务器调用accept接受客户端连接，accept此时会创建一个新套接字，用于与这个客户端进行通信。</p><p>客户端套接字连接过程描述：</p><p>客户端首先调用socket创建一个未命名套接字，让后将服务器的命名套接字作为地址来调用connect与服务器建立连接。</p><p>只要双方连接建立成功，我们就可以像操作底层文件一样来操作socket套接字实现通信。</p><ol><li>管道</li></ol><p>管道实际是用于进程间通信的一段共享内存，创建管道的进程称为管道服务器，连接到一个管道的进程为管道客户机。一个进程在向管道写入数据后，另一进程就可以从管道的另一端将其读取出来。</p><p>管道的特点：</p><p>1)、管道是半双工的，数据只能向一个方向流动；需要双方通信时，需要建立起两个管道；</p><p>2)、 只能用于父子进程或者兄弟进程之间（ 具有亲缘关系的进程）。 比如fork或exec创建的新进程， 在使用exec创建新进程时，需要将管道的文件描述符作为参数传递给exec创建的新进程。 当父进程与使用fork创建的子进程直接通信时，发送数据的进程关闭读端，接受数据的进程关闭写端。</p><p>3)、单独构成一种独立的文件系统：管道对于管道两端的进程而言，就是一个文件，但它不是普通的文件，它不属于某种文件系统，而是自立门户，单独构成一种文件系统，并且只存在与内存中。</p><p>4)、数据的读出和写入：一个进程向管道中写的内容被管道另一端的进程读出。写入的内容每次都添加在管道缓冲区的末尾，并且每次都是从缓冲区的头部读出数据。</p><p>通过使用底层的read和write调用来访问数据。 向 file_descriptor[1]写 数据，从 file_descriptor[0]中 读数据。写入与读取的顺序原则是 先进先出。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>命名管道mkfifo</li><li>信号signal</li><li>消息队列 （本质是 链表）</li><li>信号量</li><li>共享内存：（需要信号量辅助读写的先后顺序）效率最高。</li></ol><p>采用共享内存通信的一个显而易见的好处就是<strong>效率高</strong>，因为进程可以直接读写内存，而<strong>不需要任何数据的拷贝</strong>。对于像管道和消息队列等通信方式，则需要在内核和用户控件进行四次数据的拷贝，而<strong>共享内存只拷贝两次数据：一次从输入文件到共享区，另一次从共享内存区到输出文件</strong>。实际上，进程之间在共享内存时，并不总是读写少量数据后就解除映射，有新的通信时，再重新建立共享内存区域。而是保持共享区域，知道通信完毕为止，这样，数据内同一直保存在共享内存中，并没有写回文件。共享内存中的内容往往是在接触映射时才写回文件的。因此，采用共享内存的通信方式效率是最高的。</p><p>共享内存最大不足之处在意，由于多个进程对同一块内存区域具有访问的权限，<strong>各个进程之间的同步问题显得尤为重要</strong>。必须控制同一时刻只有一个进程对共享内存区域写入数据，否则会造成数据的混乱。同步控制问题可以由信号量来解决；</p>',48);function q(L,v){const i=s("ExternalLinkIcon");return o(),l("div",null,[F,r(" more "),I,e("p",null,[t("参考资料：知识点讲解"),e("a",k,[t("https://blog.csdn.net/a987073381/article/details/52006729"),p(i)])]),e("p",null,[t("代码示例："),e("a",y,[t("https://blog.csdn.net/zqixiao_09/article/details/50485047"),p(i)]),t(" （上）")]),e("p",null,[t("（下，缺个消息队列）"),e("a",O,[t("https://blog.csdn.net/zqixiao_09/article/details/50498874?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.no_search_link&spm=1001.2101.3001.4242.1"),p(i)])]),e("p",null,[t("消息队列："),e("a",z,[t("https://blog.csdn.net/qq_27664167/article/details/81712887"),p(i)])]),S])}const N=n(x,[["render",q],["__file","进程间通信学习内容.html.vue"]]);export{N as default};
