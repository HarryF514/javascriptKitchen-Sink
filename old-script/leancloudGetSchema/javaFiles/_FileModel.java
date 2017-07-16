package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class _FileModel implements Serializable{

    public _File(){super();}
   /*!
    * @brief mime_type
   */
    private String mime_type;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief key
   */
    private String key;
   /*!
    * @brief name
   */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief __type
   */
    private String __type;
   /*!
    * @brief url
   */
    private String url;
   /*!
    * @brief metaData
   */
    private Map<String,Object> metaData;
   /*!
    * @brief bucket
   */
    private String bucket;

  public String getMime_type(){return mime_type;}

  public void setMime_type(String mime_type){this.mime_type=mime_type;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getKey(){return key;}

  public void setKey(String key){this.key=key;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String get__type(){return __type;}

  public void set__type(String __type){this.__type=__type;}

  public String getUrl(){return url;}

  public void setUrl(String url){this.url=url;}

  public Map<String,Object> getMetaData(){return metaData;}

  public void setMetaData(Map<String,Object> metaData){this.metaData=metaData;}

  public String getBucket(){return bucket;}

  public void setBucket(String bucket){this.bucket=bucket;}

}