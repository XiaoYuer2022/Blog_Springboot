#########################################################################
# File Name:    vpnkill.sh
# Author:       浩XX
# mail:         508506630@qq.com
# Created Time: 2023年05月13日 星期六 14时03分35秒
#########################################################################
#!/bin/bash

#关闭clash的vpn服务
pid_clash=`ps -ax|grep clash-linux-amd64-v1.10.0 |grep -v grep | awk '{print $1}'`
pid_fastgithub=`ps -ax|grep fastgithub |grep -v grep | awk '{print $1}'`
# -z 是进行空字符检查
if [ -z "$pid_clash" ] && [ -z "$pid_fastgithub" ]; then
  echo -e "\033[0;31mError, both clash and fastgithub are not running !!!\033[0m"
  exit 1
fi 
if [ -n "$pid_clash" ] ; then
    echo -e "\033[0;32m[${pid_clash}]: The clash is running...\033[0m"
fi 

if [ -n "$pid_fastgithub" ] ; then
    echo -e "\033[0;32m[${pid_fastgithub}]: The fastgithub is running...\033[0m"
fi 

echo -en "\033[0;32m \n\nAre you sure you want to kill clash[${pid_clash}] or fastgithub[${pid_fastgithub}]? [1/2/n] \033[0m"
read answer


case $answer in
  y | Y | yes | YES)
    # 杀死clash进程
    if [ -z "$pid_clash" ]; then
         echo -e  "\033[0;31mError: clash process is not exist ! failed to kill \033[0m"
         exit 1
    else
         kill ${pid_clash}
        echo -e "\033[0;37m Send shutdown request to clash(${pid_clash}) OK\033[0m"
    fi
    ;;
  1)
    # 杀死clash进程
    if [ -z "$pid_clash" ]; then
        echo -e "\033[0;31mError: clash process is not exist ! failed to kill \033[0m"
        exit 1
    else
        kill ${pid_clash}
        echo -e "\033[0;37m Send shutdown request to clash(${pid_clash}) OK\033[0m"
    fi
    ;;
  2)
    # 杀死fastgithub进程
     if [ -z "$pid_fastgithub" ]; then
         echo -e "\033[0;31mError: fastgithub process is not exist ! failed to kill \033[0m"
         exit 1
    else
        kill ${pid_fastgithub}
        echo -e "\033[0;37m Send shutdown request to clash(${pid_fastgithub}) OK\033[0m"
    fi
    ;;
  *)
    echo -e "\033[0;37m Cancel killing the process \033[0m"
    # 不杀死clash
    ;;
esac

