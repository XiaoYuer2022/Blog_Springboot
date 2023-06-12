#!/bin/bash

# 定义备份目录和文件名
BACKUP_DIR="/usr/local/backups/mysql"
new_BLOG_FILENAME="mysql_new_blog-$(date +\%Y-\%m-\%d_\%H-\%M-\%S).sql"

echo "[`date +\%Y-\%m-\%d_\%H-\%M-\%S`]:备份状态为：" >> $BACKUP_DIR/backup_mysql.log
# 使用 mysqldump 命令备份所有数据库
docker exec mysql mysqldump --opt --extended-insert=false -u root  -p'12345' --databases blog  --hex-blob > "$BACKUP_DIR/$new_BLOG_FILENAME" 2>>$BACKUP_DIR/backup_mysql.log

ret_code=$?
echo "返回值=$ret_code" >> $BACKUP_DIR/backup_mysql.log
if [ $ret_code -ne 0 ];then
    rm $BACKUP_DIR/$new_BLOG_FILENAME
    echo "[error]:因为本次运行的返回值不为0,sql文件已被删除" >> $BACKUP_DIR/backup_mysql.log
fi

# 删除7天前的备份文件
find $BACKUP_DIR -type f -name "*.sql" -mtime +3 -delete
