package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndNaDouQuanMomentModel implements Serializable{

    public ndNaDouQuanMoment(){super();}
   /*!
    * @brief 点赞的数量
    */
    private Long likeNumber;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 是否拉黑纳豆圈信息
    */
    private Boolean isInBlackList;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 纳豆圈内容的对象
    */
    private Map<String,Object> momentContent;
   /*!
    * @brief 评论的数量
    */
    private Long commentNumber;
   /*!
    * @brief 发布moment的用户
    */
    private _UserModel user;
   /*!
    * @brief 点赞的用户数组
    */
    private List likeUserArray;

  public Long getLikeNumber(){return likeNumber;}

  public void setLikeNumber(Long likeNumber){this.likeNumber=likeNumber;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public Boolean getIsInBlackList(){return isInBlackList;}

  public void setIsInBlackList(Boolean isInBlackList){this.isInBlackList=isInBlackList;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public Map<String,Object> getMomentContent(){return momentContent;}

  public void setMomentContent(Map<String,Object> momentContent){this.momentContent=momentContent;}

  public Long getCommentNumber(){return commentNumber;}

  public void setCommentNumber(Long commentNumber){this.commentNumber=commentNumber;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

  public void setLikeUserArray(List likeUserArray){this.likeUserArray=likeUserArray;}

  public List getLikeUserArray(){return likeUserArray;}

}