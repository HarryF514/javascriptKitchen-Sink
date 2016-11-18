package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

import java.util.Map;

public class ndShunFengCheModel implements Serializable{

    public ndShunFengChe(){super();}
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
    * @brief 车型
    */
    private String carType;
   /*!
    * @brief 目的地详细地址
    */
    private String muDiDiDetail;
   /*!
    * @brief 星级数量
    */
    private Long starNumber;
   /*!
    * @brief 目的地
    */
    private String muDiDi;
   /*!
    * @brief 顺风车的顶部图片
    */
    private Map<String,Object> bannerImage;
   /*!
    * @brief 最多乘客人数
    */
    private Long maxTraveller;
   /*!
    * @brief 日期
    */
    private MyDate travelDate;
   /*!
    * @brief 价格
    */
    private Long price;
   /*!
    * @brief 出发地
    */
    private String chuFaDi;
   /*!
    * @brief 发布顺风车的用户
    */
    private _UserModel user;
   /*!
    * @brief 最多行李件数
    */
    private Long maxXingLi;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getCarType(){return carType;}

  public void setCarType(String carType){this.carType=carType;}

  public String getMuDiDiDetail(){return muDiDiDetail;}

  public void setMuDiDiDetail(String muDiDiDetail){this.muDiDiDetail=muDiDiDetail;}

  public Long getStarNumber(){return starNumber;}

  public void setStarNumber(Long starNumber){this.starNumber=starNumber;}

  public String getMuDiDi(){return muDiDi;}

  public void setMuDiDi(String muDiDi){this.muDiDi=muDiDi;}

  public Map<String,Object> getBannerImage(){return bannerImage;}

  public void setBannerImage(Map<String,Object> bannerImage){this.bannerImage=bannerImage;}

  public Long getMaxTraveller(){return maxTraveller;}

  public void setMaxTraveller(Long maxTraveller){this.maxTraveller=maxTraveller;}

  public MyDate getTravelDate(){return travelDate;}

  public void setTravelDate(MyDate travelDate){this.travelDate=travelDate;}

  public Long getPrice(){return price;}

  public void setPrice(Long price){this.price=price;}

  public String getChuFaDi(){return chuFaDi;}

  public void setChuFaDi(String chuFaDi){this.chuFaDi=chuFaDi;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public Long getMaxXingLi(){return maxXingLi;}

  public void setMaxXingLi(Long maxXingLi){this.maxXingLi=maxXingLi;}

}