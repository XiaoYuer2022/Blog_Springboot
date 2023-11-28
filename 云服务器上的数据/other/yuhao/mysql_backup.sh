#!/bin/bash

# 定义备份目录和文件名
BACKUP_DIR="/home/ubuntu/backups/mysql"
FILENAME="mysql-$(date +\%Y-\%m-\%d_\%H-\%M-\%S).sql"
NBLOG_FILENAME="mysql_nblog-$(date +\%Y-\%m-\%d_\%H-\%M-\%S).sql"

echo "[`date`]:备份状态为：" >> $BACKUP_DIR/backup_mysql.log
# 使用 mysqldump 命令备份所有数据库
mysqldump --opt --extended-insert=false -u backupuser -p'18323984605.Yh' --all-databases  --hex-blob > "$BACKUP_DIR/$FILENAME" 2>> $BACKUP_DIR/backup_mysql.log
mysqldump  --opt --extended-insert=false -u backupuser -p'18323984605.Yh' --databases nblog  --hex-blob > "$BACKUP_DIR/$NBLOG_FILENAME" 2>> $BACKUP_DIR/backup_mysql.log
echo "返回值=$?" >> $BACKUP_DIR/backup_mysql.log

# 删除7天前的备份文件
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -delete

