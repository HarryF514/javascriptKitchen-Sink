package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndDaiGouXuQiuModel implements Serializable{

    public ndDaiGouXuQiu(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 上传图片
    */
    private List shangChuanPhotos;
   /*!
    * @brief 商品产地
    */
    private String shangPinChanDi;
   /*!
    * @brief 卖家所在地
    */
    private String maiJiaLocation;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 商品分类
    */
    private String shangPinFenLei;
   /*!
    * @brief 备注
    */
    private String beiZhu;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 创建需求的用户
    */
    private _UserModel user;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public List getShangChuanPhotos(){return shangChuanPhotos;}

  public void setShangChuanPhotos(List shangChuanPhotos){this.shangChuanPhotos=shangChuanPhotos;}

  public String getShangPinChanDi(){return shangPinChanDi;}

  public void setShangPinChanDi(String shangPinChanDi){this.shangPinChanDi=shangPinChanDi;}

  public String getMaiJiaLocation(){return maiJiaLocation;}

  public void setMaiJiaLocation(String maiJiaLocation){this.maiJiaLocation=maiJiaLocation;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getShangPinFenLei(){return shangPinFenLei;}

  public void setShangPinFenLei(String shangPinFenLei){this.shangPinFenLei=shangPinFenLei;}

  public String getBeiZhu(){return beiZhu;}

  public void setBeiZhu(String beiZhu){this.beiZhu=beiZhu;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}