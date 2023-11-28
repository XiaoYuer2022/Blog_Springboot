import{$ as r,a0 as s,a1 as l,a6 as a,a2 as o,a3 as p,a4 as e,a9 as n,a5 as c,I as u}from"./framework-e783454b.js";const C={},i=o("div",{class:"hint-container tip"},[o("p",{class:"hint-container-title"},"提示"),o("p",null,"C/C++学习思路")],-1),_=c("<p>学完编程语言是基础，但仅仅掌握基础还不顾，离上手干活还有很大的鸿沟。鸿沟在于<strong>编程基础四大件和应用实践编程</strong></p><p>编程四大件：数据结构和算法、计算机网络、操作系统和设计模式</p><p>应用编程实践：这部分会涉及到一些工具、编程环境、和具体编程实践，应该说这一部分学完，自己应该能做点东西出来、或者说能看懂一些实际项目的代码。包括但不限于：Linux操作系统的学习和使用（包含常用系统配置和shell脚本的使用）、编译/调试工具的使用、Linux环境编程（Linux系统编程、多线程编程和网络编程）</p><hr><p>C/cpp与Java的比较</p><p>C/cpp与Java还是有很大的区别的。C是一种面向过程的更偏向于底层的编程语言，cpp是一种面向对象的编程语言。C和cpp，尤其是cpp，语言粒度细、机制多，性能虽然高，但语言本身的包袱也确实重，我们更愿意称它为“造轮子”的语言！也正因为C和cpp性能好，粒度细，所以什么都能做。而Java本身就是一种服务于互联网软件开发（后端开发+客户端开发）的语言，它是一个明显的“生态圈”的概念，所以应用领域非常清晰。更一般地来说，Java是纯应用层的，而C/cpp程序员既需要对底层知识有所了解，也需要知道应用层的知识。</p><hr><p>岗位分析</p><p>一般来说，C/cpp更适合做后台开发。包括：通信公司的后台开发、互联网公司的后台开发、游戏公司的后台开发。。。</p><p>后台开发的职责细分，有：有做数据处理和分析的、有做基础协议和通信的、有做基础协议和通信的、甚至有做后台系统驱动和内核的。。。</p><hr><p>编程语言本身的学习</p><p><strong>C语言</strong>：</p>",13),g=o("li",null,"除了最基本的变量、条件、循环、字符串、数组、函数、结构体外",-1),d=c("<blockquote><p><strong>推荐书籍</strong>：《C Primer Plus》、《C和指针》、《C专家编程》</p></blockquote><p><strong>cpp</strong>：</p><ul><li>cpp和C语言确实是不同的语言，但是cpp确实是对C语言的延伸，可以理解为在C语言里加入了面向对象的特性。因为只有面向对象特性的加持，代码才能更好的<strong>复用</strong>、<strong>扩展</strong>和<strong>工程化</strong>，这是大型项目的必备要素</li><li>除了C语言所有的底子之外，还需要学习cpp的面向对象（封装、继承与多态）特性、<strong>泛型</strong>、<strong>模板</strong>、<strong>STL</strong>等等</li></ul><blockquote><p>推荐书籍（有先后顺序）：《cpp Primer》、《Effective cpp》、《cpp 标准程序库》、《STL源码剖析》《深度探索cpp对象模型》</p></blockquote><p><strong>最后一个小建议是</strong>：语言部分的学习建议不要拖太久，一定要规划好时间，一鼓作气，高强度给它压下来，否则容易把自己拖泄气。</p><hr><p>编程基础“四大件”</p><p>四大件是指：数据结构和算法、计算机网络、操作系统、设计模式</p><p>1、数据结构和算法</p>",9),k=c("<blockquote><p>参考资料： 《大话数据结构》、《算法》、《剑指offer》《LeetCode刷题》 ，建议多在LeetCode上刷题</p></blockquote><p>2、计算机网络</p><p>此处的计算机网络指的就是TCP/IP协议栈，可以说它是当下互联网通信的基石，无论如何一定要对TCP/IP的协议栈了如指掌，主要就是学习和掌握原理，包括：<strong>ARP协议、IP协议、ICMP协议、TCP和UDP协议、DNS协议、HTTP协议、HTTPS协议</strong>。</p><blockquote><p>推荐书籍： 《TCP/IP详解》</p></blockquote><p>3、操作系统</p><p>该部分重点包括：进程和线程的相关原理（原子性、并发、锁）、内存相关原理（内存分布、内存调度）</p><blockquote><p>推荐书籍：《深入理解计算机系统》</p></blockquote><p>4、设计模式</p><p>倒不需要23种设计模式全部记住，常见的几个如：<strong>单例模式、工厂模式、代理模式、策略模式、模板方法模式</strong>建议熟练于心。</p><blockquote><p>推荐书籍：《大话设计模式》、《设计模式之禅》</p></blockquote><hr><p>应用编程实践</p><p>这部分会涉及到一些工具、编程环境、和具体编程实践，应该说这一部分学完，自己应该能做点东西出来、或者说能看懂一些实际项目的代码。</p><p>1、Linux操作系统的使用</p><p>包括：常见的Linux系统命令和基本的Shell编程</p><blockquote><p>推荐书籍：《鸟哥的私房菜》</p></blockquote><p>2、编译/调试工具</p><p>我想大家最熟悉的一定是GCC了，与该命令配套的还有make/makefile脚本也必须掌握。作为make升级版的扩平台编译脚本Cmake和CmakeLists.txt也需要掌握。在gcc编译时，进场要指定头文件和库文件路径，这时常用的pkg-config命令就配上用场了。</p><p>进阶一点的，除了GCC还有其他的编译工具，比如Clang。还有其他的跨平台的交叉编译工具链等等也需要学习。</p><p>在程序调试中，GDB也需要掌握。</p><p>3、Linux环境编程</p><p>（1）Linux系统编程</p><p>调用Linux系统的API来进行程序编写和功能实现。</p><p>（2）多线程编写</p><p>这一点与编程四大件之一的《操作系统》有很大的联系，进行多进程、多线程的程序编写，还有考虑进程间/线程间的通信：共享内存，还有考虑多进程间/多线程间的变量读写问题：互斥量、信号量、互斥锁、读写锁。一般在这部分，还会涉及到内存的开辟和释放问题。</p><p>此处指的是多线程编程实践相关的东西，一般包括：线程、资源、信号、同步、互斥、锁等等一些具体的编程方法。</p><p>（3）网络编程</p><p>此处的网络编程主要指的是具体Linux系统上的网络编程 API和 IO函数的编程实践。一般是TCP和UDP相关的程序，涉及到点对点通信、广播通信、客户端-服务器-客户端通信等等。</p>",28);function P(f,h){const t=u("font");return s(),l("div",null,[i,a(" more "),_,o("ul",null,[g,o("li",null,[p("C语言最最最重要的就是"),e(t,{color:"red"},{default:n(()=>[p("指针")]),_:1}),p("和"),e(t,{color:"red"},{default:n(()=>[p("内存管理")]),_:1}),p("。以后在工作中多半靠这两个东西吃饭，而且也是检验C语言掌握情况的两大标准")])]),d,o("p",null,[p("可以说这个直接决定了面试的成败！几种基础数据结构类型得烂熟于心，比如："),e(t,{color:"red"},{default:n(()=>[p("字符串、链表、二叉树、堆、栈、队列、哈希")]),_:1}),p("等；基本的几大算法也要了如指掌，比如"),e(t,{color:"red"},{default:n(()=>[p("查找、排序、动态规划、分治")]),_:1}),p("等等。")]),k])}const x=r(C,[["render",P],["__file","C和C__学习思路.html.vue"]]);export{x as default};
