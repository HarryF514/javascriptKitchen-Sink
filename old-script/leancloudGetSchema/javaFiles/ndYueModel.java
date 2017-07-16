package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndYueModel implements Serializable{

    public ndYue(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 约是否被拉黑
    */
    private Boolean isInBlackList;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief city
   */
    private String city;
   /*!
    * @brief 约的开始时间
    */
    private MyDate startDate;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 约的类型，约游，约玩
    */
    private String type;
   /*!
    * @brief 约的标题
    */
    private String title;
   /*!
    * @brief 约的描述
    */
    private String yueDescription;
   /*!
    * @brief 约的女生数量
    */
    private Long girlCount;
   /*!
    * @brief 约的男生数量
    */
    private Long boyCount;
   /*!
    * @brief totalNumberOfLimit
   */
    private Long totalNumberOfLimit;
   /*!
    * @brief 约的地址
    */
    private String location;
   /*!
    * @brief 约的价格
    */
    private Long price;
   /*!
    * @brief 发起约的用户
    */
    private _UserModel user;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Boolean getIsInBlackList(){return isInBlackList;}

  public void setIsInBlackList(Boolean isInBlackList){this.isInBlackList=isInBlackList;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getCity(){return city;}

  public void setCity(String city){this.city=city;}

  public MyDate getStartDate(){return startDate;}

  public void setStartDate(MyDate startDate){this.startDate=startDate;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getType(){return type;}

  public void setType(String type){this.type=type;}

  public String getTitle(){return title;}

  public void setTitle(String title){this.title=title;}

  public String getYueDescription(){return yueDescription;}

  public void setYueDescription(String yueDescription){this.yueDescription=yueDescription;}

  public Long getGirlCount(){return girlCount;}

  public void setGirlCount(Long girlCount){this.girlCount=girlCount;}

  public Long getBoyCount(){return boyCount;}

  public void setBoyCount(Long boyCount){this.boyCount=boyCount;}

  public Long getTotalNumberOfLimit(){return totalNumberOfLimit;}

  public void setTotalNumberOfLimit(Long totalNumberOfLimit){this.totalNumberOfLimit=totalNumberOfLimit;}

  public String getLocation(){return location;}

  public void setLocation(String location){this.location=location;}

  public Long getPrice(){return price;}

  public void setPrice(Long price){this.price=price;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}