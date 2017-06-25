#dump remote server database to local
mongodump --host 139.59.252.180:27017

#copy remote folders to local
scp -rp root@huoreport.com:dump .

#check disk space
df -H

#upload bson
scp ArticleParser.bson root@huoreport.com:ArticleParser.bson
