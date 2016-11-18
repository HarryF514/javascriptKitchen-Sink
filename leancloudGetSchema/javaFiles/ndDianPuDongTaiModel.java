package com.hankkin.leancloud.model;

import android.text.TextUtils;

import com.avos.avoscloud.AVFile;

import java.io.Serializable;

import java.util.Map;

public class ndDianPuDongTaiModel implements Serializable{

    public ndDianPuDongTai(){super();}
   /*!
    * @brief 点赞的数量
    */
    private Long likeNumber;
   /*!
    * @brief 动态内容的html文件
    */
    private Map<String,Object> donTaiContent;
   /*!
    * @brief 对象更新时间
   */
    private MyDate updatedAt;
   /*!
    * @brief 店铺动态对应的店铺
    */
    private ndDianPuModel dianPu;
   /*!
    * @brief 对象数据库id
    */
    private String objectId;
    /*!
   * @brief 对象创建时间
   */
    private MyDate createdAt;
   /*!
    * @brief 点赞用户的数组
    */
    private List likeUsersArray;
   /*!
    * @brief 评论数量
    */
    private Long commentNumber;
   /*!
    * @brief user
   */
    private _UserModel user;

  public Long getLikeNumber(){return likeNumber;}

  public void setLikeNumber(Long likeNumber){this.likeNumber=likeNumber;}

  public Map<String,Object> getDonTaiContent(){return donTaiContent;}

  public void setDonTaiContent(Map<String,Object> donTaiContent){this.donTaiContent=donTaiContent;}

  public MyDate getUpdatedAt(){return updatedAt;}

  public void setUpdatedAt(MyDate updatedAt){this.updatedAt=updatedAt;}

  public ndDianPuModel getDianPu(){return dianPu;}

  public void setDianPu(ndDianPuModel dianPu){this.dianPu=dianPu;}

  public String getObjectId(){return objectId;}

  public void setObjectId(String objectId){this.objectId=objectId;}

  public MyDate getCreatedAt(){return createdAt;}

  public void setCreatedAt(MyDate createdAt){this.createdAt=createdAt;}

  public List getLikeUsersArray(){return likeUsersArray;}

  public void setLikeUsersArray(List likeUsersArray){this.likeUsersArray=likeUsersArray;}

  public Long getCommentNumber(){return commentNumber;}

  public void setCommentNumber(Long commentNumber){this.commentNumber=commentNumber;}

  public _UserModel getUser(){return user;}

  public void setUser(_UserModel user){this.user=user;}

}