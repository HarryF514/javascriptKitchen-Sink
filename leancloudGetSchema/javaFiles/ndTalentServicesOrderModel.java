package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndTalentServicesOrderModel implements Serializable{

    public ndTalentServicesOrder(){super();}
   /*!
    * @brief 预定时间
    */
    private MyDate yuDingShiJian;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 联系人名字
    */
    private String contactPersonName;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 订单状态
    */
    private String orderStatus;
   /*!
    * @brief 订单对应的行程定制数组
    */
    private List orderXingChengDingZhiDetail;
   /*!
    * @brief 支付方式
    */
    private String zhiFuFangShi;
   /*!
    * @brief 订单使用的代金券
    */
    private List daiJinQuan;
   /*!
    * @brief 订单金额
    */
    private Long orderTotalJine;
   /*!
    * @brief 达人服务订单的数量
    */
    private Long orderQuantity;
   /*!
    * @brief 联系人电话
    */
    private String contactPersonPhoneNumber;
   /*!
    * @brief 订单的总价格
    */
    private Long totalCost;
   /*!
    * @brief 订单对应的达人服务
    */
    private ndTalentServicesModel talentServices;
   /*!
    * @brief 联系人留言，游客留言
    */
    private String contactPersonNote;
   /*!
    * @brief 下订单的用户
    */
    private _UserModel buyer;
   /*!
    * @brief 销售行程的达人用户
    */
    private _UserModel seller;
   /*!
    * @brief 订单自己的ID
    */
    private Long orderId;

  public MyDate getYuDingShiJian(){return yuDingShiJian;}

  public void setYuDingShiJian(MyDate yuDingShiJian){this.yuDingShiJian=yuDingShiJian;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getContactPersonName(){return contactPersonName;}

  public void setContactPersonName(String contactPersonName){this.contactPersonName=contactPersonName;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getOrderStatus(){return orderStatus;}

  public void setOrderStatus(String orderStatus){this.orderStatus=orderStatus;}

  public List getOrderXingChengDingZhiDetail(){return orderXingChengDingZhiDetail;}

  public void setOrderXingChengDingZhiDetail(List orderXingChengDingZhiDetail){this.orderXingChengDingZhiDetail=orderXingChengDingZhiDetail;}

  public String getZhiFuFangShi(){return zhiFuFangShi;}

  public void setZhiFuFangShi(String zhiFuFangShi){this.zhiFuFangShi=zhiFuFangShi;}

  public List getDaiJinQuan(){return daiJinQuan;}

  public void setDaiJinQuan(List daiJinQuan){this.daiJinQuan=daiJinQuan;}

  public Long getOrderTotalJine(){return orderTotalJine;}

  public void setOrderTotalJine(Long orderTotalJine){this.orderTotalJine=orderTotalJine;}

  public Long getOrderQuantity(){return orderQuantity;}

  public void setOrderQuantity(Long orderQuantity){this.orderQuantity=orderQuantity;}

  public String getContactPersonPhoneNumber(){return contactPersonPhoneNumber;}

  public void setContactPersonPhoneNumber(String contactPersonPhoneNumber){this.contactPersonPhoneNumber=contactPersonPhoneNumber;}

  public Long getTotalCost(){return totalCost;}

  public void setTotalCost(Long totalCost){this.totalCost=totalCost;}

  public ndTalentServicesModel getTalentServices(){return talentServices;}

  public void setTalentServices(ndTalentServicesModel talentServices){this.talentServices=talentServices;}

  public String getContactPersonNote(){return contactPersonNote;}

  public void setContactPersonNote(String contactPersonNote){this.contactPersonNote=contactPersonNote;}

  public _UserModel getBuyer(){return buyer;}

  public void setBuyer(_UserModel buyer){this.buyer=buyer;}

  public _UserModel getSeller(){return seller;}

  public void setSeller(_UserModel seller){this.seller=seller;}

  public Long getOrderId(){return orderId;}

  public void setOrderId(Long orderId){this.orderId=orderId;}

}