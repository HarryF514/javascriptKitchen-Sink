package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndMinSuXuQiuModel implements Serializable{

    public ndMinSuXuQiu(){super();}
   /*!
    * @brief 人数
    */
    private Long renShu;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 到达城市
    */
    private String daoDaCity;
   /*!
    * @brief 入住日期
    */
    private MyDate ruZhuRiQi;
   /*!
    * @brief 备注
    */
    private String beiZhu;
   /*!
    * @brief 离开日期
    */
    private MyDate liKaiRiQi;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 游玩国家
    */
    private String youWanCounry;
   /*!
    * @brief 创建需求的用户
    */
    private _UserModel user;
   /*!
    * @brief 日期
    */
    private MyDate riqi;

  public Long getRenShu(){return renShu;}

  public void setRenShu(Long renShu){this.renShu=renShu;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getDaoDaCity(){return daoDaCity;}

  public void setDaoDaCity(String daoDaCity){this.daoDaCity=daoDaCity;}

  public MyDate getRuZhuRiQi(){return ruZhuRiQi;}

  public void setRuZhuRiQi(MyDate ruZhuRiQi){this.ruZhuRiQi=ruZhuRiQi;}

  public String getBeiZhu(){return beiZhu;}

  public void setBeiZhu(String beiZhu){this.beiZhu=beiZhu;}

  public MyDate getLiKaiRiQi(){return liKaiRiQi;}

  public void setLiKaiRiQi(MyDate liKaiRiQi){this.liKaiRiQi=liKaiRiQi;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getYouWanCounry(){return youWanCounry;}

  public void setYouWanCounry(String youWanCounry){this.youWanCounry=youWanCounry;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public MyDate getRiqi(){return riqi;}

  public void setRiqi(MyDate riqi){this.riqi=riqi;}

}