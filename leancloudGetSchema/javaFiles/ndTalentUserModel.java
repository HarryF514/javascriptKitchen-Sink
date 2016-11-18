package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

import java.util.Map;

public class ndTalentUserModel implements Serializable{

    public ndTalentUser(){super();}
   /*!
    * @brief 例如：［美食，购物，韩文，户外］
    */
    private List talentTags;
   /*!
    * @brief 目前身份
    */
    private String muQianShenFen;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 所在专业
    */
    private String fieldOfStudy;
   /*!
    * @brief 居住的城市
    */
    private String livingCity;
   /*!
    * @brief 达人的认证方式
    */
    private String verifyMethod;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 保证金
    */
    private String baoZhengJin;
   /*!
    * @brief 达人年份
    */
    private Long yearOfTalent;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 类型，个人或者企业
    */
    private String type;
   /*!
    * @brief 其他语言
    */
    private String otherLanguage;
   /*!
    * @brief 最高学历
    */
    private String zuiGaoXueLi;
   /*!
    * @brief isHaiTaoOpen
   */
    private Boolean isHaiTaoOpen;
   /*!
    * @brief 达人的星际，例如：5
    */
    private Long starNumber;
   /*!
    * @brief 达人浏览量，例如：2636
    */
    private Long viewNumber;
   /*!
    * @brief 认证时间，例如：2016-01-25
    */
    private MyDate verifyDate;
   /*!
    * @brief 达人的自我介绍
    */
    private String talentDescription;
   /*!
    * @brief 达人的正面头像照片
    */
    private Map<String,Object> talentHeaderImages;
   /*!
    * @brief 达人的个人介绍视频
    */
    private Map<String,Object> talentVideoIntro;
   /*!
    * @brief 毕业学校
    */
    private String graduatedSchool;
   /*!
    * @brief 家乡，例如：沈阳
    */
    private String homeTown;
   /*!
    * @brief 是否有车，例如：否
    */
    private Boolean hasCar;
   /*!
    * @brief 是否会开车
    */
    private Boolean canDrive;
   /*!
    * @brief 达人被评论的数量
    */
    private Long commentNumber;
   /*!
    * @brief 达人的封面照片
    */
    private Map<String,Object> fengMianZhaoPic;
   /*!
    * @brief 手机号，好像没用到（待删除）
    */
    private Long phoneNumber;
   /*!
    * @brief 达人等级
    */
    private Long talentLevel;
   /*!
    * @brief 达人的国家，例如：日本
    */
    private String country;
   /*!
    * @brief 工作状态
    */
    private String workStatus;
   /*!
    * @brief 语言熟练程度
    */
    private String yuYanShuLianChengDu;

  public List getTalentTags(){return talentTags;}

  public void setTalentTags(List talentTags){this.talentTags=talentTags;}

  public String getMuQianShenFen(){return muQianShenFen;}

  public void setMuQianShenFen(String muQianShenFen){this.muQianShenFen=muQianShenFen;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getFieldOfStudy(){return fieldOfStudy;}

  public void setFieldOfStudy(String fieldOfStudy){this.fieldOfStudy=fieldOfStudy;}

  public String getLivingCity(){return livingCity;}

  public void setLivingCity(String livingCity){this.livingCity=livingCity;}

  public String getVerifyMethod(){return verifyMethod;}

  public void setVerifyMethod(String verifyMethod){this.verifyMethod=verifyMethod;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public String getBaoZhengJin(){return baoZhengJin;}

  public void setBaoZhengJin(String baoZhengJin){this.baoZhengJin=baoZhengJin;}

  public Long getYearOfTalent(){return yearOfTalent;}

  public void setYearOfTalent(Long yearOfTalent){this.yearOfTalent=yearOfTalent;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public MyDate getCreatedAt(){return createdAt;}

  public String getType(){return type;}

  public void setType(String type){this.type=type;}

  public String getOtherLanguage(){return otherLanguage;}

  public void setOtherLanguage(String otherLanguage){this.otherLanguage=otherLanguage;}

  public String getZuiGaoXueLi(){return zuiGaoXueLi;}

  public void setZuiGaoXueLi(String zuiGaoXueLi){this.zuiGaoXueLi=zuiGaoXueLi;}

  public Boolean getIsHaiTaoOpen(){return isHaiTaoOpen;}

  public void setIsHaiTaoOpen(Boolean isHaiTaoOpen){this.isHaiTaoOpen=isHaiTaoOpen;}

  public Long getStarNumber(){return starNumber;}

  public void setStarNumber(Long starNumber){this.starNumber=starNumber;}

  public Long getViewNumber(){return viewNumber;}

  public void setViewNumber(Long viewNumber){this.viewNumber=viewNumber;}

  public MyDate getVerifyDate(){return verifyDate;}

  public void setVerifyDate(MyDate verifyDate){this.verifyDate=verifyDate;}

  public String getTalentDescription(){return talentDescription;}

  public void setTalentDescription(String talentDescription){this.talentDescription=talentDescription;}

  public Map<String,Object> getTalentHeaderImages(){return talentHeaderImages;}

  public void setTalentHeaderImages(Map<String,Object> talentHeaderImages){this.talentHeaderImages=talentHeaderImages;}

  public Map<String,Object> getTalentVideoIntro(){return talentVideoIntro;}

  public void setTalentVideoIntro(Map<String,Object> talentVideoIntro){this.talentVideoIntro=talentVideoIntro;}

  public String getGraduatedSchool(){return graduatedSchool;}

  public void setGraduatedSchool(String graduatedSchool){this.graduatedSchool=graduatedSchool;}

  public String getHomeTown(){return homeTown;}

  public void setHomeTown(String homeTown){this.homeTown=homeTown;}

  public Boolean getHasCar(){return hasCar;}

  public void setHasCar(Boolean hasCar){this.hasCar=hasCar;}

  public Boolean getCanDrive(){return canDrive;}

  public void setCanDrive(Boolean canDrive){this.canDrive=canDrive;}

  public Long getCommentNumber(){return commentNumber;}

  public void setCommentNumber(Long commentNumber){this.commentNumber=commentNumber;}

  public Map<String,Object> getFengMianZhaoPic(){return fengMianZhaoPic;}

  public void setFengMianZhaoPic(Map<String,Object> fengMianZhaoPic){this.fengMianZhaoPic=fengMianZhaoPic;}

  public Long getPhoneNumber(){return phoneNumber;}

  public void setPhoneNumber(Long phoneNumber){this.phoneNumber=phoneNumber;}

  public Long getTalentLevel(){return talentLevel;}

  public void setTalentLevel(Long talentLevel){this.talentLevel=talentLevel;}

  public String getCountry(){return country;}

  public void setCountry(String country){this.country=country;}

  public String getWorkStatus(){return workStatus;}

  public void setWorkStatus(String workStatus){this.workStatus=workStatus;}

  public String getYuYanShuLianChengDu(){return yuYanShuLianChengDu;}

  public void setYuYanShuLianChengDu(String yuYanShuLianChengDu){this.yuYanShuLianChengDu=yuYanShuLianChengDu;}

}