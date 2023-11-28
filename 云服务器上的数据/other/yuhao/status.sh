#! /bin/sh
pid_n="PID"
cpu_n="%CPU"
mem_n="%MEM"
vsz_n="虚拟内存"
rss_n="真实内存"
command_n="COMMAND"

echo  -n "你想查询什么？ 默认为内存: 内存 [0] / CPU [1] / ps命令简单输出(MB单位) [2] / ps命令详细输出(MB单位) [3] :"
read answer


case $answer in
  1)
	echo "获取占用CPU资源最多的10个进程："
	ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head
	;;
	2)
	echo "ps命令的简单输出为[MB单位，按vss从大到小排序]："
	ps --no-header -eo pid,%cpu,%mem,vsz,rss,comm --sort=-rss | awk -v p=$pid_n -v c=$cpu_n -v m=$mem_n -v v=$vsz_n -v r=$rss_n -v cmd=$command_n 'BEGIN {printf "%-8s%-8s%-8s%-8s%-8s%s\n", p, c, m, v, r, cmd} {vsz_mb=$4/1024;rss_mb=$5/1024;printf "%-8s%-8s%-8s%-12.2f%-12.2f%s\n",$1, $2, $3, vsz_mb, rss_mb, $6}' | head -n 10
	;;
	3)
	echo "ps命令的详细输出为[MB单位，按vss从大到小排序]："
	ps --no-header -eo pid,%cpu,%mem,vsz,rss,command --sort=-rss | awk -v p=$pid_n -v c=$cpu_n -v m=$mem_n -v v=$vsz_n -v r=$rss_n -v cmd=$command_n 'BEGIN {printf "%-8s%-8s%-8s%-8s%-8s%s\n", p, c, m, v, r, cmd} {vsz_mb=$4/1024;rss_mb=$5/1024;printf "%-8s%-8s%-8s%-12.2f%-12.2f%s\n",$1, $2, $3, vsz_mb, rss_mb, $6}' | head -n 10
	;;
  *)
	echo "获取占用内存资源最多的10个进程："
	ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
	;;
esac



