package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndDaiJinQuanModel implements Serializable{

    public ndDaiJinQuan(){super();}
   /*!
    * @brief 订单金额
    */
    private Long dingDanJinE;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 代金券对应的店铺
    */
    private ndDianPuModel dianPu;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 代金券结束时间
    */
    private MyDate endTime;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 是否包含邮费
    */
    private Boolean baoHanYouFei;
   /*!
    * @brief 代金券开始使用时间
    */
    private MyDate beginDate;
   /*!
    * @brief 满减金额
    */
    private Long manJianJinE;
   /*!
    * @brief 创建代金券的用户
    */
    private _UserModel user;

  public Long getDingDanJinE(){return dingDanJinE;}

  public void setDingDanJinE(Long dingDanJinE){this.dingDanJinE=dingDanJinE;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public ndDianPuModel getDianPu(){return dianPu;}

  public void setDianPu(ndDianPuModel dianPu){this.dianPu=dianPu;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getEndTime(){return endTime;}

  public void setEndTime(MyDate endTime){this.endTime=endTime;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Boolean getBaoHanYouFei(){return baoHanYouFei;}

  public void setBaoHanYouFei(Boolean baoHanYouFei){this.baoHanYouFei=baoHanYouFei;}

  public MyDate getBeginDate(){return beginDate;}

  public void setBeginDate(MyDate beginDate){this.beginDate=beginDate;}

  public Long getManJianJinE(){return manJianJinE;}

  public void setManJianJinE(Long manJianJinE){this.manJianJinE=manJianJinE;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}