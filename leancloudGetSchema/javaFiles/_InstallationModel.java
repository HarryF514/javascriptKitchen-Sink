package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class _InstallationModel implements Serializable{

    public _Installation(){super();}
   /*!
    * @brief valid
   */
    private Boolean valid;
   /*!
    * @brief vendor
   */
    private String vendor;
   /*!
    * @brief timeZone
   */
    private String timeZone;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief channels
   */
    private List channels;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief deviceToken
   */
    private String deviceToken;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief deviceType
   */
    private String deviceType;
   /*!
    * @brief installationId
   */
    private String installationId;
   /*!
    * @brief badge
   */
    private Long badge;

  public Boolean getValid(){return valid;}

  public void setValid(Boolean valid){this.valid=valid;}

  public String getVendor(){return vendor;}

  public void setVendor(String vendor){this.vendor=vendor;}

  public String getTimeZone(){return timeZone;}

  public void setTimeZone(String timeZone){this.timeZone=timeZone;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public List getChannels(){return channels;}

  public void setChannels(List channels){this.channels=channels;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getDeviceToken(){return deviceToken;}

  public void setDeviceToken(String deviceToken){this.deviceToken=deviceToken;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getDeviceType(){return deviceType;}

  public void setDeviceType(String deviceType){this.deviceType=deviceType;}

  public String getInstallationId(){return installationId;}

  public void setInstallationId(String installationId){this.installationId=installationId;}

  public Long getBadge(){return badge;}

  public void setBadge(Long badge){this.badge=badge;}

}