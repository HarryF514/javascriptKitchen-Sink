package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

import java.util.Map;

public class ndShangPinOrderModel implements Serializable{

    public ndShangPinOrder(){super();}
   /*!
    * @brief 成交时间
    */
    private MyDate closeDealDate;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 订单对应的店铺
    */
    private ndDianPuModel dianPu;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 快递信息
    */
    private List deliveryInfo;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 支付宝
    */
    private String zhifubaoTransactionId;
   /*!
    * @brief 订单的状态
    */
    private String orderStatus;
   /*!
    * @brief 收件人，例如：啊鋒
    */
    private String consignee;
   /*!
    * @brief 发货时间
    */
    private MyDate startDeliverDate;
   /*!
    * @brief 商品退货
    */
    private Map<String,Object> tuiHuo;
   /*!
    * @brief 支付日起，例如：2016-07-23
    */
    private MyDate paymentDate;
   /*!
    * @brief 收件人地址
    */
    private String consigneeAddress;
   /*!
    * @brief 物流信息
    */
    private Map<String,Object> wuLiuXinXi;
   /*!
    * @brief 订单的商店，商店里面的商品
    */
    private Map<String,Object> orderGoodsDetail;
   /*!
    * @brief 订单的总金额
    */
    private Long totalCost;
   /*!
    * @brief 所有商品的数量，例如：10
    */
    private Long totalQuantity;
   /*!
    * @brief 下订单的用户
    */
    private _UserModel user;
   /*!
    * @brief 商品订单的自增的orderId
    */
    private Long orderId;

  public MyDate getCloseDealDate(){return closeDealDate;}

  public void setCloseDealDate(MyDate closeDealDate){this.closeDealDate=closeDealDate;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public ndDianPuModel getDianPu(){return dianPu;}

  public void setDianPu(ndDianPuModel dianPu){this.dianPu=dianPu;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public List getDeliveryInfo(){return deliveryInfo;}

  public void setDeliveryInfo(List deliveryInfo){this.deliveryInfo=deliveryInfo;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getZhifubaoTransactionId(){return zhifubaoTransactionId;}

  public void setZhifubaoTransactionId(String zhifubaoTransactionId){this.zhifubaoTransactionId=zhifubaoTransactionId;}

  public String getOrderStatus(){return orderStatus;}

  public void setOrderStatus(String orderStatus){this.orderStatus=orderStatus;}

  public String getConsignee(){return consignee;}

  public void setConsignee(String consignee){this.consignee=consignee;}

  public MyDate getStartDeliverDate(){return startDeliverDate;}

  public void setStartDeliverDate(MyDate startDeliverDate){this.startDeliverDate=startDeliverDate;}

  public Map<String,Object> getTuiHuo(){return tuiHuo;}

  public void setTuiHuo(Map<String,Object> tuiHuo){this.tuiHuo=tuiHuo;}

  public MyDate getPaymentDate(){return paymentDate;}

  public void setPaymentDate(MyDate paymentDate){this.paymentDate=paymentDate;}

  public String getConsigneeAddress(){return consigneeAddress;}

  public void setConsigneeAddress(String consigneeAddress){this.consigneeAddress=consigneeAddress;}

  public Map<String,Object> getWuLiuXinXi(){return wuLiuXinXi;}

  public void setWuLiuXinXi(Map<String,Object> wuLiuXinXi){this.wuLiuXinXi=wuLiuXinXi;}

  public Map<String,Object> getOrderGoodsDetail(){return orderGoodsDetail;}

  public void setOrderGoodsDetail(Map<String,Object> orderGoodsDetail){this.orderGoodsDetail=orderGoodsDetail;}

  public Long getTotalCost(){return totalCost;}

  public void setTotalCost(Long totalCost){this.totalCost=totalCost;}

  public Long getTotalQuantity(){return totalQuantity;}

  public void setTotalQuantity(Long totalQuantity){this.totalQuantity=totalQuantity;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public Long getOrderId(){return orderId;}

  public void setOrderId(Long orderId){this.orderId=orderId;}

}