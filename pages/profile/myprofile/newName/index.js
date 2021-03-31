// pages/profile/myprofile/newName/index.js
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';
const api = require('../../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    userInfo:{}
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value:event.detail
    })
  },
  doneChange() {
    console.log(this.data.value);
    let that = this;
    if(this.data.value != '') {
      wx.request({
        url: api.userControl,
        header: {'content-type':'application/x-www-form-urlencoded'},
        method: 'PUT',
        data: {
          id: that.data.id,
          userName: that.data.value
        },
        success(res) {
          that.setData({
            'userInfo.userName': that.data.value
          })
          wx.setStorage({
            data: that.data.userInfo,
            key: 'userData',
          })
          Toast('修改成功');
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },2000)
        },
        fail(res) {
          console.log('失败了');
        }
      })
    }
  },
  onLoad(options) {
    this.setData({
      id:options.id
    });
    let that = this;
    wx.getStorage({
      key: 'userData',
      success(res) {
        that.setData({
          userInfo:res.data,
        })
      }
    });
  }
})