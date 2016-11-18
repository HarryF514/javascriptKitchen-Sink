package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndShunFengCheXuQiuModel implements Serializable{

    public ndShunFengCheXuQiu(){super();}
   /*!
    * @brief 日期
    */
    private MyDate riQi;
   /*!
    * @brief 人数
    */
    private Long renShu;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 国家
    */
    private String guoJia;
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
    * @brief 行李件数
    */
    private Long xingLiJianShu;
   /*!
    * @brief 出发城市
    */
    private String chuFaCity;
   /*!
    * @brief user
   */
    private _UserModel user;

  public MyDate getRiQi(){return riQi;}

  public void setRiQi(MyDate riQi){this.riQi=riQi;}

  public Long getRenShu(){return renShu;}

  public void setRenShu(Long renShu){this.renShu=renShu;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getGuoJia(){return guoJia;}

  public void setGuoJia(String guoJia){this.guoJia=guoJia;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getDaoDaCity(){return daoDaCity;}

  public void setDaoDaCity(String daoDaCity){this.daoDaCity=daoDaCity;}

  public String getBeiZhu(){return beiZhu;}

  public void setBeiZhu(String beiZhu){this.beiZhu=beiZhu;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Long getXingLiJianShu(){return xingLiJianShu;}

  public void setXingLiJianShu(Long xingLiJianShu){this.xingLiJianShu=xingLiJianShu;}

  public String getChuFaCity(){return chuFaCity;}

  public void setChuFaCity(String chuFaCity){this.chuFaCity=chuFaCity;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}