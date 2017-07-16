package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndLuiXueXuQiuModel implements Serializable{

    public ndLuiXueXuQiu(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 所在地
    */
    private String suoZaiDi;
   /*!
    * @brief 姓名
    */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief 生日
    */
    private MyDate birthday;
   /*!
    * @brief 备注
    */
    private String beiZhu;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 学历
    */
    private String xueLi;
   /*!
    * @brief 性别
    */
    private String gender;
   /*!
    * @brief user
   */
    private _UserModel user;
   /*!
    * @brief 留学学校
    */
    private String liuXueXueXiao;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public String getSuoZaiDi(){return suoZaiDi;}

  public void setSuoZaiDi(String suoZaiDi){this.suoZaiDi=suoZaiDi;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getBirthday(){return birthday;}

  public void setBirthday(MyDate birthday){this.birthday=birthday;}

  public String getBeiZhu(){return beiZhu;}

  public void setBeiZhu(String beiZhu){this.beiZhu=beiZhu;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public String getXueLi(){return xueLi;}

  public void setXueLi(String xueLi){this.xueLi=xueLi;}

  public String getGender(){return gender;}

  public void setGender(String gender){this.gender=gender;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public String getLiuXueXueXiao(){return liuXueXueXiao;}

  public void setLiuXueXueXiao(String liuXueXueXiao){this.liuXueXueXiao=liuXueXueXiao;}

}