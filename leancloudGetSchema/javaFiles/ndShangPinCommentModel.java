package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndShangPinCommentModel implements Serializable{

    public ndShangPinComment(){super();}
   /*!
    * @brief 评论对应的商品
    */
    private ndShangPinModel shangPin;
   /*!
    * @brief 评论的内容
    */
    private String content;
   /*!
    * @brief 发起评论的用户
    */
    private _UserModel user;
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

  public ndShangPinModel getShangPin(){return shangPin;}

  public void setShangPin(ndShangPinModel shangPin){this.shangPin=shangPin;}

  public String getContent(){return content;}

  public void setContent(String content){this.content=content;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}