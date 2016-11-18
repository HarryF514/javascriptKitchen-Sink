package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndGuestShoppingCartModel implements Serializable{

    public ndGuestShoppingCart(){super();}
   /*!
    * @brief 商品详情
    */
    private Map<String,Object> goodsDetail;
   /*!
    * @brief 兑换记录
    */
    private List duiHuanJiLu;
   /*!
    * @brief 积分
    */
    private Long jiFen;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;

  public Map<String,Object> getGoodsDetail(){return goodsDetail;}

  public void setGoodsDetail(Map<String,Object> goodsDetail){this.goodsDetail=goodsDetail;}

  public List getDuiHuanJiLu(){return duiHuanJiLu;}

  public void setDuiHuanJiLu(List duiHuanJiLu){this.duiHuanJiLu=duiHuanJiLu;}

  public Long getJiFen(){return jiFen;}

  public void setJiFen(Long jiFen){this.jiFen=jiFen;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

}