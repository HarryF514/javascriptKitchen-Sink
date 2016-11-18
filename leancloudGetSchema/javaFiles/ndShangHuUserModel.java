package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndShangHuUserModel implements Serializable{

    public ndShangHuUser(){super();}
   /*!
    * @brief 证件图片
    */
    private Map<String,Object> zhengJianImage;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 认证方式
    */
    private String verifyMethod;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 保证金
    */
    private Long baoZhengJin;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 商户家乡
    */
    private String homeTown;
   /*!
    * @brief 所在国家
    */
    private String country;

  public Map<String,Object> getZhengJianImage(){return zhengJianImage;}

  public void setZhengJianImage(Map<String,Object> zhengJianImage){this.zhengJianImage=zhengJianImage;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getVerifyMethod(){return verifyMethod;}

  public void setVerifyMethod(String verifyMethod){this.verifyMethod=verifyMethod;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public Long getBaoZhengJin(){return baoZhengJin;}

  public void setBaoZhengJin(Long baoZhengJin){this.baoZhengJin=baoZhengJin;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getHomeTown(){return homeTown;}

  public void setHomeTown(String homeTown){this.homeTown=homeTown;}

  public String getCountry(){return country;}

  public void setCountry(String country){this.country=country;}

}