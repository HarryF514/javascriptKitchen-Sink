package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndLvLiXuQiuModel implements Serializable{

    public ndLvLiXuQiu(){super();}
   /*!
    * @brief 当游客发布旅游需求的时候
    */
    private ndLvYouXuQiuModel lvYouXuQiu;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 当用户发布留学需求的时候
    */
    private ndLuiXueXuQiuModel luiXueXuQiu;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 当游客发布代购需求的时候
    */
    private ndDaiGouXuQiuModel daiGouXuQiu;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 当游客发布民宿需求的时候
    */
    private ndMinSuXuQiuModel minSuXuQiu;
   /*!
    * @brief 当游客发布顺风车需求的时候
    */
    private ndShunFengCheXuQiuModel shunFengCheXuQiu;
   /*!
    * @brief 履历的状态
    */
    private String status;
   /*!
    * @brief 履历需求描述
    */
    private String lvLiDescription;
   /*!
    * @brief 添加的附件图片
    */
    private List attachImage;
   /*!
    * @brief 创建需求的用户
    */
    private _UserModel user;

  public ndLvYouXuQiuModel getLvYouXuQiu(){return lvYouXuQiu;}

  public void setLvYouXuQiu(ndLvYouXuQiuModel lvYouXuQiu){this.lvYouXuQiu=lvYouXuQiu;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public ndLuiXueXuQiuModel getLuiXueXuQiu(){return luiXueXuQiu;}

  public void setLuiXueXuQiu(ndLuiXueXuQiuModel luiXueXuQiu){this.luiXueXuQiu=luiXueXuQiu;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public ndDaiGouXuQiuModel getDaiGouXuQiu(){return daiGouXuQiu;}

  public void setDaiGouXuQiu(ndDaiGouXuQiuModel daiGouXuQiu){this.daiGouXuQiu=daiGouXuQiu;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public ndMinSuXuQiuModel getMinSuXuQiu(){return minSuXuQiu;}

  public void setMinSuXuQiu(ndMinSuXuQiuModel minSuXuQiu){this.minSuXuQiu=minSuXuQiu;}

  public ndShunFengCheXuQiuModel getShunFengCheXuQiu(){return shunFengCheXuQiu;}

  public void setShunFengCheXuQiu(ndShunFengCheXuQiuModel shunFengCheXuQiu){this.shunFengCheXuQiu=shunFengCheXuQiu;}

  public String getStatus(){return status;}

  public void setStatus(String status){this.status=status;}

  public String getLvLiDescription(){return lvLiDescription;}

  public void setLvLiDescription(String lvLiDescription){this.lvLiDescription=lvLiDescription;}

  public List getAttachImage(){return attachImage;}

  public void setAttachImage(List attachImage){this.attachImage=attachImage;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}