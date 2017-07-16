package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.util.Map;

import java.io.Serializable;

public class ndXinXiDongTaiModel implements Serializable{

    public ndXinXiDongTai(){super();}
   /*!
    * @brief 信息动态的标题
    */
    private String messageTitle;
   /*!
    * @brief 创建信息动态的用户
    */
    private _UserModel user;
   /*!
    * @brief 信息动态内容
    */
    private String content;
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

  public String getMessageTitle(){return messageTitle;}

  public void setMessageTitle(String messageTitle){this.messageTitle=messageTitle;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public String getContent(){return content;}

  public void setContent(String content){this.content=content;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}