package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndJiFenHaoLiModel implements Serializable{

    public ndJiFenHaoLi(){super();}
   /*!
    * @brief 礼物兑换需要的积分
    */
    private Long xuYaoJiFen;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 礼物的图片文件
    */
    private Map<String,Object> headerImage;
   /*!
    * @brief 礼物的名字
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
    * @brief 积分礼物的描述
    */
    private String liWuDescription;
   /*!
    * @brief 礼物的价格
    */
    private Long price;

  public Long getXuYaoJiFen(){return xuYaoJiFen;}

  public void setXuYaoJiFen(Long xuYaoJiFen){this.xuYaoJiFen=xuYaoJiFen;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Map<String,Object> getHeaderImage(){return headerImage;}

  public void setHeaderImage(Map<String,Object> headerImage){this.headerImage=headerImage;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getLiWuDescription(){return liWuDescription;}

  public void setLiWuDescription(String liWuDescription){this.liWuDescription=liWuDescription;}

  public Long getPrice(){return price;}

  public void setPrice(Long price){this.price=price;}

}