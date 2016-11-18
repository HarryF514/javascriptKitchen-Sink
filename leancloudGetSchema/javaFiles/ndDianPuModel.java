package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

public class ndDianPuModel implements Serializable{

import java.util.Map;

    public ndDianPu(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 粉丝数量
    */
    private Long fansNumber;
   /*!
    * @brief 商铺的头像
    */
    private Map<String,Object> headerImage;
   /*!
    * @brief 商铺的名字
    */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 所在城市
    */
    private String city;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 物流服务
    */
    private Long wuLiuFuWu;
   /*!
    * @brief 描述相符
    */
    private Long miaoShuXiangFu;
   /*!
    * @brief 服务态度
    */
    private Long fuWuTaiDu;
   /*!
    * @brief 所在省份
    */
    private String province;
   /*!
    * @brief 服务电话
    */
    private String fuWuPhoneNumber;
   /*!
    * @brief 店铺的拥有者用户
    */
    private _UserModel owner;
   /*!
    * @brief 开店时间
    */
    private MyDate kaiDianDate;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Long getFansNumber(){return fansNumber;}

  public void setFansNumber(Long fansNumber){this.fansNumber=fansNumber;}

  public Map<String,Object> getHeaderImage(){return headerImage;}

  public void setHeaderImage(Map<String,Object> headerImage){this.headerImage=headerImage;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getCity(){return city;}

  public void setCity(String city){this.city=city;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Long getWuLiuFuWu(){return wuLiuFuWu;}

  public void setWuLiuFuWu(Long wuLiuFuWu){this.wuLiuFuWu=wuLiuFuWu;}

  public Long getMiaoShuXiangFu(){return miaoShuXiangFu;}

  public void setMiaoShuXiangFu(Long miaoShuXiangFu){this.miaoShuXiangFu=miaoShuXiangFu;}

  public Long getFuWuTaiDu(){return fuWuTaiDu;}

  public void setFuWuTaiDu(Long fuWuTaiDu){this.fuWuTaiDu=fuWuTaiDu;}

  public String getProvince(){return province;}

  public void setProvince(String province){this.province=province;}

  public String getFuWuPhoneNumber(){return fuWuPhoneNumber;}

  public void setFuWuPhoneNumber(String fuWuPhoneNumber){this.fuWuPhoneNumber=fuWuPhoneNumber;}

  public _UserModel getOwner(){return owner;}

  public void setOwner(_UserModel owner){this.owner=owner;}

  public MyDate getKaiDianDate(){return kaiDianDate;}

  public void setKaiDianDate(MyDate kaiDianDate){this.kaiDianDate=kaiDianDate;}

}