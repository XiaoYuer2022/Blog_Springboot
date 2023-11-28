import{$ as n,a0 as a,a1 as t,a6 as c,a2 as e,a5 as i}from"./framework-e783454b.js";const r={},o=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"提示"),e("p",null,"C++复习总攻略")],-1),s=i('<p>C++：基本数据类型/扩展数据类型、复合数据类型、函数、循环和分支、类、模板、内存模型/命令空间/堆的使用、异常。</p><p>数据类型：基本数据类型分为整型和浮点型。整型有bool、char、short int、int、long int、long long；浮点型有float、double还有long double。扩展类型则是unsigned XXX。</p><p>复合数据类型有数组、结构体、共用体、枚举、字符串、String类、指针、(vector容器和array)。注意，数组的两种替代品：vector使用new实现的类模板，可变长，方便且安全。array和数组一样定长，但是方便且安全。可以用方法begin和end来确定头尾，避免越界，用at方法来取元素时会自动检查越界问题，要比数组用方括号安全一些。</p><p>函数：</p><p>循环：for、while、do_while。分支：if/else、switch/case、三元运算符?:</p><p>类：类的申明与定义、类的继承（注意权限问题）、（构造函数、拷贝构造函数深拷贝浅拷贝、析构函数），还有static和const修饰的方法和属性的一些使用注意事项，最后还有一个问题就是友元（全局函数友元和类友元）</p><p>重载：函数重载和运算符重载。注意cpp三要素：封装、继承、多态。</p><p>模板：函数模板、类模板</p><p>异常：try throw catch</p><p>文件IO</p><h2 id="_1、char与signed-char和signed-char" tabindex="-1"><a class="header-anchor" href="#_1、char与signed-char和signed-char" aria-hidden="true">#</a> 1、char与signed char和signed char</h2><p>一般char就是signed char （VC编译器、X86上的GCC），不过arm-linux-gcc却把char定义为 unsigned char。在存储介质中的表现形式是一样的，占1字节8bit。区别在于看第一位是不是符号位。</p><p>int默认就是signed int。</p><p>在补充一点，32位和64位系统中，数据类型的不同之处：</p><p>在32位机器和64机器中int类型都占用4个字节。编译器可以根据自身硬件来选择合适的大小，但是需要满足约束：short和int型至少为16位，long型至少为32位，并且short型长度不能超过int型，而int型不能超过long型。这即是说各个类型的变量长度是由编译器来决定的，而当前主流的编译器中一般是32位机器和64位机器中int型都是4个字节（例如，GCC）。下面列举在GCC编译器下32位机器和64位机器各个类型变量所占字节数： <img src="https://s3.bmp.ovh/imgs/2022/08/10/e2def3a84e510cd9.png" alt="图1" loading="lazy"> 需要关注的是，一般而言，32位机器和64位最大的不同就是long和指针。一般32位的long是4字节，64位是8字节；32位的指针是4字节，64位的指针是8字节。</p>',15);function p(h,l){return a(),t("div",null,[o,c(" more "),s])}const _=n(r,[["render",p],["__file","c__复习总攻略.html.vue"]]);export{_ as default};
