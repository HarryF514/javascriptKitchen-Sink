package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndShangPinModel implements Serializable{

    public ndShangPin(){super();}
   /*!
    * @brief 生产国家，例如：日本
    */
    private String productionCountry;
   /*!
    * @brief likeNumber
   */
    private Long likeNumber;
   /*!
    * @brief 运费
    */
    private Long transportFee;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief dianPu
   */
    private ndDianPuModel dianPu;
   /*!
    * @brief 商品是否在黑名单
    */
    private Boolean isInBlackList;
   /*!
    * @brief 库存，例如：288
    */
    private Long numberOfStocks;
   /*!
    * @brief 服务说明，四个选项对应1~4
    */
    private List fuWuShuoMing;
   /*!
    * @brief 商品的图片
    */
    private Map<String,Object> shangPinImage;
   /*!
    * @brief 商品的名字
    */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 可付款方式，例如：现，券
    */
    private String payType;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 包邮活动，都不包邮，满包邮
    */
    private String transportFeeCondistion;
   /*!
    * @brief 价格，例如：389
    */
    private Long currentPrice;
   /*!
    * @brief likeUsersArray
   */
    private List likeUsersArray;
   /*!
    * @brief 付款人数，例如：1231
    */
    private Long numberOfBuyer;
   /*!
    * @brief 免邮条件，例如：满200免运费
    */
    private String freeShippingCondition;
   /*!
    * @brief 原价，例如：999
    */
    private Long originalPrice;
   /*!
    * @brief 生产城市，例如：东京
    */
    private String productionCity;
   /*!
    * @brief commentNumber
   */
    private Long commentNumber;
   /*!
    * @brief 创建商品的用户
    */
    private _UserModel user;
   /*!
    * @brief 推荐商品的index
    */
    private Long recommendIndex;
   /*!
    * @brief 类型，例如：［牛奶味，香蕉味，辣味］
    */
    private List goodsType;

  public String getProductionCountry(){return productionCountry;}

  public void setProductionCountry(String productionCountry){this.productionCountry=productionCountry;}

  public Long getLikeNumber(){return likeNumber;}

  public void setLikeNumber(Long likeNumber){this.likeNumber=likeNumber;}

  public Long getTransportFee(){return transportFee;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setTransportFee(Long transportFee){this.transportFee=transportFee;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public ndDianPuModel getDianPu(){return dianPu;}

  public void setDianPu(ndDianPuModel dianPu){this.dianPu=dianPu;}

  public Boolean getIsInBlackList(){return isInBlackList;}

  public void setIsInBlackList(Boolean isInBlackList){this.isInBlackList=isInBlackList;}

  public Long getNumberOfStocks(){return numberOfStocks;}

  public void setNumberOfStocks(Long numberOfStocks){this.numberOfStocks=numberOfStocks;}

  public List getFuWuShuoMing(){return fuWuShuoMing;}

  public void setFuWuShuoMing(List fuWuShuoMing){this.fuWuShuoMing=fuWuShuoMing;}

  public Map<String,Object> getShangPinImage(){return shangPinImage;}

  public void setShangPinImage(Map<String,Object> shangPinImage){this.shangPinImage=shangPinImage;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getPayType(){return payType;}

  public void setPayType(String payType){this.payType=payType;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getTransportFeeCondistion(){return transportFeeCondistion;}

  public void setTransportFeeCondistion(String transportFeeCondistion){this.transportFeeCondistion=transportFeeCondistion;}

  public Long getCurrentPrice(){return currentPrice;}

  public void setCurrentPrice(Long currentPrice){this.currentPrice=currentPrice;}

  public List getLikeUsersArray(){return likeUsersArray;}

  public void setLikeUsersArray(List likeUsersArray){this.likeUsersArray=likeUsersArray;}

  public Long getNumberOfBuyer(){return numberOfBuyer;}

  public void setNumberOfBuyer(Long numberOfBuyer){this.numberOfBuyer=numberOfBuyer;}

  public String getFreeShippingCondition(){return freeShippingCondition;}

  public void setFreeShippingCondition(String freeShippingCondition){this.freeShippingCondition=freeShippingCondition;}

  public Long getOriginalPrice(){return originalPrice;}

  public void setOriginalPrice(Long originalPrice){this.originalPrice=originalPrice;}

  public String getProductionCity(){return productionCity;}

  public void setProductionCity(String productionCity){this.productionCity=productionCity;}

  public Long getCommentNumber(){return commentNumber;}

  public void setCommentNumber(Long commentNumber){this.commentNumber=commentNumber;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public Long getRecommendIndex(){return recommendIndex;}

  public void setRecommendIndex(Long recommendIndex){this.recommendIndex=recommendIndex;}

  public List getGoodsType(){return goodsType;}

  public void setGoodsType(List goodsType){this.goodsType=goodsType;}

}