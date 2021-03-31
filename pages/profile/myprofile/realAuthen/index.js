// pages/profile/myprofile/realAuthen/index.js
const api = require('../../../../config/api')
import Notify from '../../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:"#0984e3",
    afterColor:"#74b9ff",
    userInfo: {
      
    },
    showInfo: {

    },
    uploading: false,
    fontUrl:'',
    backUrl:'',
    message: '点击上传身份证识别'
  },

  onLoad() {
    let that = this;
    wx.getStorage({
      key: 'userData',
      success(res) {
        that.setData({
          userInfo: res.data
        })
        if(res.data.infoCode==1) {
          console.log(res.data);
          let year = res.data.born.slice(0,4);
          let month = res.data.born.slice(4,6);
          let day = res.data.born.slice(6,8);
          let born = [year,month,day].join('-');
          let cardId = res.data.idCard.charAt(0)+'****************'+res.data.idCard.charAt(17);        
          that.setData({
            uploading: false,
            'showInfo.realName': res.data.realName,
            'showInfo.idCard':cardId,
            'showInfo.address':res.data.address,
            'showInfo.gender':res.data.gender==0?'男':'女',
            'showInfo.born':born,
            color:"#74b9ff",
            message: '实名认证成功'
          })
        }
      }
    })
  },
  fontSide() {
    let that = this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0]);
        that.setData({
          fontUrl:tempFilePaths[0],
          uploading:true
        });
        wx.uploadFile({
          url: api.orc + that.data.userInfo.id, //仅为示例，非真实的接口地址
          method: 'POST',
          filePath: that.data.fontUrl,
          name: 'multipartFile',
          success (res){
            wx.request({
              url: api.userControl,
              header: {'content-type':'application/x-www-form-urlencoded'},
              method: 'PUT',
              data: {
                id: that.data.userInfo.id,
                infoCode: 1
              }
            })
            Notify({ type: 'success', message: '认证成功', context: that, selector:'#custom-selector'});
            let data = JSON.parse(res.data)
            let year = data.data.birth.slice(0,4);
            let month = data.data.birth.slice(4,6);
            let day = data.data.birth.slice(6,8);
            let born = [year,month,day].join('-');
            let cardId = data.data.num.charAt(0)+'****************'+data.data.num.charAt(17);        
            that.setData({
              uploading: false,
              'showInfo.realName': data.data.name,
              'showInfo.idCard':cardId,
              'showInfo.address':data.data.address,
              'showInfo.gender':data.data.sex,
              'showInfo.born':born,
              'userInfo.realName': data.data.name,
              'userInfo.idCard':data.data.num,
              'userInfo.address':data.data.address,
              'userInfo.born':data.data.birth,
              color:"#74b9ff",
              message: '已上传',
              'userInfo.infoCode':1
            })
            wx.setStorage({
              data: that.data.userInfo,
              key: 'userData',
            })
          }
        });
      }
    })
  }
  // backSide() {
  //   let that = this
  //   wx.chooseImage({
  //     success (res) {
  //       const tempFilePaths = res.tempFilePaths
  //       console.log(tempFilePaths[0]);
  //       that.setData({
  //         backUrl:tempFilePaths[0]
  //       })
        
  //     }
  //   })
  // }
})