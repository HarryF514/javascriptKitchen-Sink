package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.util.Map;

import java.io.Serializable;

public class ndLvYouXuQiuModel implements Serializable{

    public ndLvYouXuQiu(){super();}
   /*!
    * @brief 返回时间
    */
    private MyDate fanHuiDate;
   /*!
    * @brief 人数
    */
    private Long renShu;
   /*!
    * @brief 游玩国家
    */
    private String youWanCountry;
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
    * @brief 备注
    */
    private String beiZhu;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 返回城市
    */
    private String fanHuiCity;
   /*!
    * @brief 出发城市
    */
    private String chuFaCity;
   /*!
    * @brief 创建需求的用户
    */
    private _UserModel user;
   /*!
    * @brief 行李件数
    */
    private Long xingLiJianShu;
   /*!
    * @brief 出发日期
    */
    private MyDate chuFaDate;

  public MyDate getFanHuiDate(){return fanHuiDate;}

  public void setFanHuiDate(MyDate fanHuiDate){this.fanHuiDate=fanHuiDate;}

  public Long getRenShu(){return renShu;}

  public void setRenShu(Long renShu){this.renShu=renShu;}

  public String getYouWanCountry(){return youWanCountry;}

  public void setYouWanCountry(String youWanCountry){this.youWanCountry=youWanCountry;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public String getDaoDaCity(){return daoDaCity;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public void setDaoDaCity(String daoDaCity){this.daoDaCity=daoDaCity;}

  public String getBeiZhu(){return beiZhu;}

  public void setBeiZhu(String beiZhu){this.beiZhu=beiZhu;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getFanHuiCity(){return fanHuiCity;}

  public void setFanHuiCity(String fanHuiCity){this.fanHuiCity=fanHuiCity;}

  public Long getXingLiJianShu(){return xingLiJianShu;}

  public void setXingLiJianShu(Long xingLiJianShu){this.xingLiJianShu=xingLiJianShu;}

  public void setChuFaCity(String chuFaCity){this.chuFaCity=chuFaCity;}

  public String getChuFaCity(){return chuFaCity;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public MyDate getChuFaDate(){return chuFaDate;}

  public void setChuFaDate(MyDate chuFaDate){this.chuFaDate=chuFaDate;}

}