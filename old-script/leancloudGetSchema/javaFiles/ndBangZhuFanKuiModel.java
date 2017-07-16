package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndBangZhuFanKuiModel implements Serializable{

    public ndBangZhuFanKui(){super();}
   /*!
    * @brief 提供帮助反馈的用户
    */
    private _UserModel user;
   /*!
    * @brief 提供的截图
    */
    private List imageArray;
   /*!
    * @brief 问题和意见
    */
    private String problemDescription;
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

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public List getImageArray(){return imageArray;}

  public void setImageArray(List imageArray){this.imageArray=imageArray;}

  public String getProblemDescription(){return problemDescription;}

  public void setProblemDescription(String problemDescription){this.problemDescription=problemDescription;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}