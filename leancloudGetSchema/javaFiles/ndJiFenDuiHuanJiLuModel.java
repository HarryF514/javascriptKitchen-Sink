package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndJiFenDuiHuanJiLuModel implements Serializable{

    public ndJiFenDuiHuanJiLu(){super();}
   /*!
    * @brief 记录对应的礼物
    */
    private ndJiFenHaoLiModel jiFenHaoLi;
   /*!
    * @brief 兑换的用户
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

  public ndJiFenHaoLiModel getJiFenHaoLi(){return jiFenHaoLi;}

  public void setJiFenHaoLi(ndJiFenHaoLiModel jiFenHaoLi){this.jiFenHaoLi=jiFenHaoLi;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}