package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class _ConversationModel implements Serializable{

    public _Conversation(){super();}
   /*!
    * @brief unique
   */
    private Boolean unique;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief m
   */
    private List m;
   /*!
    * @brief tr
   */
    private Boolean tr;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief lm
   */
    private MyDate lm;
   /*!
    * @brief uniqueId
   */
    private String uniqueId;
   /*!
    * @brief mu
   */
    private List mu;
   /*!
    * @brief sys
   */
    private Boolean sys;

  public Boolean getUnique(){return unique;}

  public void setUnique(Boolean unique){this.unique=unique;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public List getM(){return m;}

  public void setM(List m){this.m=m;}

  public Boolean getTr(){return tr;}

  public void setTr(Boolean tr){this.tr=tr;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public MyDate getLm(){return lm;}

  public void setLm(MyDate lm){this.lm=lm;}

  public String getUniqueId(){return uniqueId;}

  public void setUniqueId(String uniqueId){this.uniqueId=uniqueId;}

  public List getMu(){return mu;}

  public void setMu(List mu){this.mu=mu;}

  public Boolean getSys(){return sys;}

  public void setSys(Boolean sys){this.sys=sys;}

}