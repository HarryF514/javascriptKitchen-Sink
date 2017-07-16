package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

import java.util.Map;

public class _RoleModel implements Serializable{

    public _Role(){super();}
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
   /*!
    * @brief name
   */
    private String name;

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

}