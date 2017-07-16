package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndTalentServicesModel implements Serializable{

    public ndTalentServices(){super();}
   /*!
    * @brief 其他规则
    */
    private String otherGuiZe;
   /*!
    * @brief 服务介绍的对象
    */
    private Map<String,Object> servicesDescriptionObj;
   /*!
    * @brief 退改规则
    */
    private String tuiGaiGuiZe;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 行程是否在黑名单
    */
    private Boolean isInBlackList;
   /*!
    * @brief 服务特色，例如；旅游跟拍，特色体验
    */
    private String specialty;
   /*!
    * @brief 服务的名字
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
    * @brief 费用说明
    */
    private String feiYongShuoMing;
   /*!
    * @brief 这个服务是否验证
    */
    private Boolean isVerified;
   /*!
    * @brief 服务顶部的第一张照片
    */
    private Map<String,Object> bannerImage;
   /*!
    * @brief 达人服务的价格
    */
    private Long price;
   /*!
    * @brief 发布行程／服务的用户
    */
    private _UserModel user;
   /*!
    * @brief 服务浏览人数，例如：100
    */
    private Long view;

  public String getOtherGuiZe(){return otherGuiZe;}

  public void setOtherGuiZe(String otherGuiZe){this.otherGuiZe=otherGuiZe;}

  public Map<String,Object> getServicesDescriptionObj(){return servicesDescriptionObj;}

  public void setServicesDescriptionObj(Map<String,Object> servicesDescriptionObj){this.servicesDescriptionObj=servicesDescriptionObj;}

  public String getTuiGaiGuiZe(){return tuiGaiGuiZe;}

  public void setTuiGaiGuiZe(String tuiGaiGuiZe){this.tuiGaiGuiZe=tuiGaiGuiZe;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Boolean getIsInBlackList(){return isInBlackList;}

  public void setIsInBlackList(Boolean isInBlackList){this.isInBlackList=isInBlackList;}

  public String getSpecialty(){return specialty;}

  public void setSpecialty(String specialty){this.specialty=specialty;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getFeiYongShuoMing(){return feiYongShuoMing;}

  public void setFeiYongShuoMing(String feiYongShuoMing){this.feiYongShuoMing=feiYongShuoMing;}

  public Boolean getIsVerified(){return isVerified;}

  public void setIsVerified(Boolean isVerified){this.isVerified=isVerified;}

  public Map<String,Object> getBannerImage(){return bannerImage;}

  public void setBannerImage(Map<String,Object> bannerImage){this.bannerImage=bannerImage;}

  public Long getPrice(){return price;}

  public void setPrice(Long price){this.price=price;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public Long getView(){return view;}

  public void setView(Long view){this.view=view;}

}