package com.hankkin.leancloud.model;

import android.text.TextUtils;

import java.util.Map;

import java.io.Serializable;

import com.avos.avoscloud.AVFile;

public class ndTalentXiangCeModel implements Serializable{

    public ndTalentXiangCe(){super();}
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 展示相册的第一张图片
    */
    private Map<String,Object> firstPhoto;
   /*!
    * @brief 相册的名字
    */
    private String name;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
   /*!
    * @brief photos的照片数据，方便读取
    */
    private List photoObjectArray;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 图片的数量
    */
    private Long photoCount;
   /*!
    * @brief 发布相册的用户
    */
    private _UserModel user;

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Map<String,Object> getFirstPhoto(){return firstPhoto;}

  public void setFirstPhoto(Map<String,Object> firstPhoto){this.firstPhoto=firstPhoto;}

  public String getName(){return name;}

  public void setName(String name){this.name=name;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public List getPhotoObjectArray(){return photoObjectArray;}

  public void setPhotoObjectArray(List photoObjectArray){this.photoObjectArray=photoObjectArray;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Long getPhotoCount(){return photoCount;}

  public void setPhotoCount(Long photoCount){this.photoCount=photoCount;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}