package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndCityModel implements Serializable{

    public ndCity(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief name
   */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief longitude
    */
    private Long longitude;
   /*!
    * @brief latitude
    */
    private Long latitude;
   /*!
    * @brief country
   */
    private ndCountryModel country;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Long getLongitude(){return longitude;}

  public void setLongitude(Long longitude){this.longitude=longitude;}

  public Long getLatitude(){return latitude;}

  public void setLatitude(Long latitude){this.latitude=latitude;}

  public ndCountryModel getCountry(){return country;}

  public void setCountry(ndCountryModel country){this.country=country;}

}