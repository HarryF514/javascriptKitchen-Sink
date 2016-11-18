package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndShouHuoDiZhiModel implements Serializable{

    public ndShouHuoDiZhi(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 联系方式
    */
    private String contactMethod;
   /*!
    * @brief 详细地址
    */
    private String addressDetail;
   /*!
    * @brief 所在地区
    */
    private String area;
   /*!
    * @brief user
   */
    private _UserModel user;
   /*!
    * @brief 收货人名字
    */
    private String consigneeName;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getContactMethod(){return contactMethod;}

  public void setContactMethod(String contactMethod){this.contactMethod=contactMethod;}

  public String getAddressDetail(){return addressDetail;}

  public void setAddressDetail(String addressDetail){this.addressDetail=addressDetail;}

  public String getArea(){return area;}

  public void setArea(String area){this.area=area;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public String getConsigneeName(){return consigneeName;}

  public void setConsigneeName(String consigneeName){this.consigneeName=consigneeName;}

}