package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndLanguageModel implements Serializable{

    public ndLanguage(){super();}
   /*!
    * @brief 语言的名字
    */
    private String name;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}