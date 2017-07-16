package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndMomentCommentModel implements Serializable{

    public ndMomentComment(){super();}
   /*!
    * @brief 被评论的moment
    */
    private ndNaDouQuanMomentModel moment;
   /*!
    * @brief 评论的用户
    */
    private _UserModel user;
   /*!
    * @brief moment评论的内容
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

  public ndNaDouQuanMomentModel getMoment(){return moment;}

  public void setMoment(ndNaDouQuanMomentModel moment){this.moment=moment;}

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