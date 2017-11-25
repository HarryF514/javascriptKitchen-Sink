#dump remote server database to local
mongodump --host 139.59.252.180:27017

#copy remote folders to local
scp -rp root@huoreport.com:dump .

#check disk space
df -H

#upload bson
scp ArticleParser.bson root@huoreport.com:ArticleParser.bson

#restore mongodb for a specific collection
mongorestore -d articledb -c Url Url.bson 

#comment mongo queyr
db.Url.count({id:{$exists:false}})

#dump one collection
mongodump --db=<old_db_name> --collection=<collection_name>

#remove a field from a collection
db.ArticleParser.update({},{$unset: {createdAt:1}},{multi: true});

#find exist
db.ArticleParser.count({createdAt:{$exists:true}});

#create unique index
db.ArticleParser.createIndex({title:1},{ unique: true })

#update many
db.Url.updateMany({qualityPercentage:{$lt:0.1}},{$set:{"isArticle": true}})
db.Url.updateMany({urlDomain:"e.dangdang.com"},{$set:{"isQueue": true}})

#commond query
db.Url.count({qualityPercentage:-1})
