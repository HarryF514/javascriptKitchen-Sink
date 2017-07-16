package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndTalentCommentModel implements Serializable{

    public ndTalentComment(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 被评论的达人
    */
    private _UserModel talent;
   /*!
    * @brief 评论的内容
    */
    private String content;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 评论的人的时候的标星
    */
    private Long starNumber;
   /*!
    * @brief 评论附带的照片
    */
    private List imageArray;
   /*!
    * @brief 发起评论的用户
    */
    private _UserModel user;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public _UserModel getTalent(){return talent;}

  public void setTalent(_UserModel talent){this.talent=talent;}

  public String getContent(){return content;}

  public void setContent(String content){this.content=content;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Long getStarNumber(){return starNumber;}

  public void setStarNumber(Long starNumber){this.starNumber=starNumber;}

  public List getImageArray(){return imageArray;}

  public void setImageArray(List imageArray){this.imageArray=imageArray;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}