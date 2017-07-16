package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

import java.util.Map;

public class ndTalentServicesCommentModel implements Serializable{

    public ndTalentServicesComment(){super();}
   /*!
    * @brief 评论对应的达人服务
    */
    private ndTalentServicesModel talentServices;
   /*!
    * @brief 发起评论的用户
    */
    private _UserModel user;
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
    * @brief 对象更新时间
   */
    private MyDate updatedAt;

  public ndTalentServicesModel getTalentServices(){return talentServices;}

  public void setTalentServices(ndTalentServicesModel talentServices){this.talentServices=talentServices;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public String getContent(){return content;}

  public void setContent(String content){this.content=content;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

}