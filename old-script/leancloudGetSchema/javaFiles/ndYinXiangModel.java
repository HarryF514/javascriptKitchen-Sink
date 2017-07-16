package com.hankkin.leancloud.model;

import com.avos.avoscloud.AVFile;

import android.text.TextUtils;

import java.io.Serializable;

import java.util.Map;

public class ndYinXiangModel implements Serializable{

    public ndYinXiang(){super();}
   /*!
    * @brief 印象点赞的数量
    */
    private Long likeNumber;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 印象的对象
    */
    private Map<String,Object> content;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 知否推荐到首页
    */
    private Boolean isRecommandYinXiang;
   /*!
    * @brief likeUsersArray
   */
    private List likeUsersArray;
   /*!
    * @brief title
   */
    private String title;
   /*!
    * @brief commentNumber
   */
    private Long commentNumber;
   /*!
    * @brief location
   */
    private String location;
   /*!
    * @brief 发布印象的用户
    */
    private _UserModel user;

  public Long getLikeNumber(){return likeNumber;}

  public void setLikeNumber(Long likeNumber){this.likeNumber=likeNumber;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Map<String,Object> getContent(){return content;}

  public void setContent(Map<String,Object> content){this.content=content;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Boolean getIsRecommandYinXiang(){return isRecommandYinXiang;}

  public void setIsRecommandYinXiang(Boolean isRecommandYinXiang){this.isRecommandYinXiang=isRecommandYinXiang;}

  public List getLikeUsersArray(){return likeUsersArray;}

  public void setLikeUsersArray(List likeUsersArray){this.likeUsersArray=likeUsersArray;}

  public String getTitle(){return title;}

  public void setTitle(String title){this.title=title;}

  public Long getCommentNumber(){return commentNumber;}

  public void setCommentNumber(Long commentNumber){this.commentNumber=commentNumber;}

  public String getLocation(){return location;}

  public void setLocation(String location){this.location=location;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}