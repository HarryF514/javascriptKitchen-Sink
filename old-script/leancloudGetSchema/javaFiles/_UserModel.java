package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class _UserModel implements Serializable{

    public _User(){super();}
   /*!
    * @brief salt
   */
    private String salt;
   /*!
    * @brief 用户的角色，达人，商户，超级管理员
    */
    private String role;
   /*!
    * @brief 评价的数量
    */
    private Long pingJiaNumber;
   /*!
    * @brief 待付款的数量
    */
    private Long daiFuKuanNumber;
   /*!
    * @brief 收藏的数量
    */
    private Long shouCangNumber;
   /*!
    * @brief email
   */
    private String email;
   /*!
    * @brief sessionToken
   */
    private String sessionToken;
   /*!
    * @brief 退货售后的数量
    */
    private Long tuiHuoShouHouNumber;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 用户是否在黑名单
    */
    private Boolean isInBlackList;
   /*!
    * @brief password
   */
    private String password;
   /*!
    * @brief 待发货的数量
    */
    private Long daiFaHuoNumber;
   /*!
    * @brief 用户的头像
    */
    private Map<String,Object> headerImage;
   /*!
    * @brief 用户的职业
    */
    private String occupation;
   /*!
    * @brief 用户的名字
    */
    private String name;
   /*!
    * @brief 关注的人的数量
    */
    private Long followeeNumber;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 我关注的人的数组
    */
    private List followeeArray;
   /*!
    * @brief 用户所在城市
    */
    private String city;
   /*!
    * @brief username
   */
    private String username;
   /*!
    * @brief 是否推荐的人到首页
    */
    private Boolean isRecommandTalent;
   /*!
    * @brief 用户的生日
    */
    private MyDate birthday;
   /*!
    * @brief 融云的token
    */
    private String RCToken;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 证件图片
    */
    private Map<String,Object> zhengjianImage;
   /*!
    * @brief 待评价的数量
    */
    private Long daiPingJiaNumber;
   /*!
    * @brief 角色数组
    */
    private List roleArray;
   /*!
    * @brief QQ号码
    */
    private Long qqnumber;
   /*!
    * @brief 用户的粉丝数量
    */
    private Long followerNumber;
   /*!
    * @brief 我的板块的封面照片
    */
    private Map<String,Object> fengMianZhaoPian;
   /*!
    * @brief 代金券，代金券对象和状态
    */
    private List daiJinQuan;
   /*!
    * @brief emailVerified
   */
    private Boolean emailVerified;
   /*!
    * @brief 积分
    */
    private Long jiFen;
   /*!
    * @brief talentUser
   */
    private ndTalentUserModel talentUser;
   /*!
    * @brief weiboAccount
   */
    private String weiboAccount;
   /*!
    * @brief 查看个人资料的前三张图片
    */
    private List naDouQuanSampleImages;
   /*!
    * @brief 微信账号
    */
    private String weixinaccount;
   /*!
    * @brief mobilePhoneNumber
   */
    private String mobilePhoneNumber;
   /*!
    * @brief 达人或者商户可以服务的城市
    */
    private List servingCity;
   /*!
    * @brief 待确认的数量
    */
    private Long daiQueRenNumber;
   /*!
    * @brief 个人介绍
    */
    private String personalDescription;
   /*!
    * @brief 用户我们可以看到的密码
    */
    private String actualPassword;
   /*!
    * @brief 身份证正面照片
    */
    private Map<String,Object> shenFenZhengPics;
   /*!
    * @brief 认证方式
    */
    private String renZhengFangShi;
   /*!
    * @brief 用户的性别
    */
    private String gender;
   /*!
    * @brief 用户所在省份
    */
    private String province;
   /*!
    * @brief shangHuUser
   */
    private ndShangHuUserModel shangHuUser;
   /*!
    * @brief authData
   */
    private Map<String,Object> authData;
   /*!
    * @brief mobilePhoneVerified
   */
    private Boolean mobilePhoneVerified;

  public String getSalt(){return salt;}

  public void setSalt(String salt){this.salt=salt;}

  public String getRole(){return role;}

  public void setRole(String role){this.role=role;}

  public Long getPingJiaNumber(){return pingJiaNumber;}

  public void setPingJiaNumber(Long pingJiaNumber){this.pingJiaNumber=pingJiaNumber;}

  public Long getDaiFuKuanNumber(){return daiFuKuanNumber;}

  public void setDaiFuKuanNumber(Long daiFuKuanNumber){this.daiFuKuanNumber=daiFuKuanNumber;}

  public Long getShouCangNumber(){return shouCangNumber;}

  public void setShouCangNumber(Long shouCangNumber){this.shouCangNumber=shouCangNumber;}

  public String getEmail(){return email;}

  public void setEmail(String email){this.email=email;}

  public String getSessionToken(){return sessionToken;}

  public void setSessionToken(String sessionToken){this.sessionToken=sessionToken;}

  public Long getTuiHuoShouHouNumber(){return tuiHuoShouHouNumber;}

  public void setTuiHuoShouHouNumber(Long tuiHuoShouHouNumber){this.tuiHuoShouHouNumber=tuiHuoShouHouNumber;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Boolean getIsInBlackList(){return isInBlackList;}

  public void setIsInBlackList(Boolean isInBlackList){this.isInBlackList=isInBlackList;}

  public String getPassword(){return password;}

  public void setPassword(String password){this.password=password;}

  public Long getDaiFaHuoNumber(){return daiFaHuoNumber;}

  public void setDaiFaHuoNumber(Long daiFaHuoNumber){this.daiFaHuoNumber=daiFaHuoNumber;}

  public Map<String,Object> getHeaderImage(){return headerImage;}

  public void setHeaderImage(Map<String,Object> headerImage){this.headerImage=headerImage;}

  public String getOccupation(){return occupation;}

  public void setOccupation(String occupation){this.occupation=occupation;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public Long getFolloweeNumber(){return followeeNumber;}

  public void setFolloweeNumber(Long followeeNumber){this.followeeNumber=followeeNumber;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public List getFolloweeArray(){return followeeArray;}

  public void setFolloweeArray(List followeeArray){this.followeeArray=followeeArray;}

  public String getCity(){return city;}

  public void setCity(String city){this.city=city;}

  public String getUsername(){return username;}

  public void setUsername(String username){this.username=username;}

  public Boolean getIsRecommandTalent(){return isRecommandTalent;}

  public void setIsRecommandTalent(Boolean isRecommandTalent){this.isRecommandTalent=isRecommandTalent;}

  public MyDate getBirthday(){return birthday;}

  public void setBirthday(MyDate birthday){this.birthday=birthday;}

  public String getRCToken(){return RCToken;}

  public void setRCToken(String RCToken){this.RCToken=RCToken;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Map<String,Object> getZhengjianImage(){return zhengjianImage;}

  public void setZhengjianImage(Map<String,Object> zhengjianImage){this.zhengjianImage=zhengjianImage;}

  public Long getDaiPingJiaNumber(){return daiPingJiaNumber;}

  public void setDaiPingJiaNumber(Long daiPingJiaNumber){this.daiPingJiaNumber=daiPingJiaNumber;}

  public List getRoleArray(){return roleArray;}

  public void setRoleArray(List roleArray){this.roleArray=roleArray;}

  public Long getQqnumber(){return qqnumber;}

  public void setQqnumber(Long qqnumber){this.qqnumber=qqnumber;}

  public Long getFollowerNumber(){return followerNumber;}

  public void setFollowerNumber(Long followerNumber){this.followerNumber=followerNumber;}

  public Map<String,Object> getFengMianZhaoPian(){return fengMianZhaoPian;}

  public void setFengMianZhaoPian(Map<String,Object> fengMianZhaoPian){this.fengMianZhaoPian=fengMianZhaoPian;}

  public List getDaiJinQuan(){return daiJinQuan;}

  public void setDaiJinQuan(List daiJinQuan){this.daiJinQuan=daiJinQuan;}

  public Boolean getEmailVerified(){return emailVerified;}

  public void setEmailVerified(Boolean emailVerified){this.emailVerified=emailVerified;}

  public Long getJiFen(){return jiFen;}

  public void setJiFen(Long jiFen){this.jiFen=jiFen;}

  public ndTalentUserModel getTalentUser(){return talentUser;}

  public void setTalentUser(ndTalentUserModel talentUser){this.talentUser=talentUser;}

  public String getWeiboAccount(){return weiboAccount;}

  public void setWeiboAccount(String weiboAccount){this.weiboAccount=weiboAccount;}

  public List getNaDouQuanSampleImages(){return naDouQuanSampleImages;}

  public void setNaDouQuanSampleImages(List naDouQuanSampleImages){this.naDouQuanSampleImages=naDouQuanSampleImages;}

  public String getWeixinaccount(){return weixinaccount;}

  public void setWeixinaccount(String weixinaccount){this.weixinaccount=weixinaccount;}

  public String getMobilePhoneNumber(){return mobilePhoneNumber;}

  public void setMobilePhoneNumber(String mobilePhoneNumber){this.mobilePhoneNumber=mobilePhoneNumber;}

  public List getServingCity(){return servingCity;}

  public void setServingCity(List servingCity){this.servingCity=servingCity;}

  public Long getDaiQueRenNumber(){return daiQueRenNumber;}

  public void setDaiQueRenNumber(Long daiQueRenNumber){this.daiQueRenNumber=daiQueRenNumber;}

  public String getPersonalDescription(){return personalDescription;}

  public void setPersonalDescription(String personalDescription){this.personalDescription=personalDescription;}

  public String getActualPassword(){return actualPassword;}

  public void setActualPassword(String actualPassword){this.actualPassword=actualPassword;}

  public Map<String,Object> getShenFenZhengPics(){return shenFenZhengPics;}

  public void setShenFenZhengPics(Map<String,Object> shenFenZhengPics){this.shenFenZhengPics=shenFenZhengPics;}

  public String getRenZhengFangShi(){return renZhengFangShi;}

  public void setRenZhengFangShi(String renZhengFangShi){this.renZhengFangShi=renZhengFangShi;}

  public String getGender(){return gender;}

  public void setGender(String gender){this.gender=gender;}

  public String getProvince(){return province;}

  public void setProvince(String province){this.province=province;}

  public ndShangHuUserModel getShangHuUser(){return shangHuUser;}

  public void setShangHuUser(ndShangHuUserModel shangHuUser){this.shangHuUser=shangHuUser;}

  public Map<String,Object> getAuthData(){return authData;}

  public void setAuthData(Map<String,Object> authData){this.authData=authData;}

  public Boolean getMobilePhoneVerified(){return mobilePhoneVerified;}

  public void setMobilePhoneVerified(Boolean mobilePhoneVerified){this.mobilePhoneVerified=mobilePhoneVerified;}

}