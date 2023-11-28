import requests as r
 
def getTime(url):
    res = r.get(url)
    return res.elapsed
    
print(getTime("https://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/bionic/main/installer-amd64/current/images/cdrom/initrd.gz"))
 
print(getTime("http://mirrors.aliyun.com/ubuntu/dists/bionic/main/installer-amd64/current/images/cdrom/initrd.gz"))
 
print(getTime("https://mirrors.ustc.edu.cn/ubuntu/dists/bionic/main/installer-amd64/current/images/cdrom/initrd.gz"))
 
print(getTime("http://mirrors.163.com/ubuntu/dists/bionic/main/installer-amd64/current/images/cdrom/initrd.gz"))

