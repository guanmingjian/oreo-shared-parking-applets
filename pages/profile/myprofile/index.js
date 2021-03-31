// pages/profile/myprofile/index.js
const api = require('../../../config/api.js')
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
    },
    columns: ['男', '女'],
    show:false,
    showNum:'',
    gender:""
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      gender:value
    })
    let that = this
    wx.request({
      url: api.userControl,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'PUT',
      data: {
        id: that.data.userInfo.id,
        gender: that.data.gender==='男'?0:1
      },
      success(res) {
        that.setData({
          gender:event.detail.value,
          'userInfo.gender': that.data.gender==='男'?0:1
        }),
        wx.setStorage({
          data: that.data.userInfo,
          key: 'userData',
        })
      }
    })
  },
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let that = this;
    let size = file.size;
    console.log('选好图片了');
    console.log(file.url);
    if(size > 1048579) {
      Notify('请上传1M以内大小的图片');
    }else {
      wx.uploadFile({
        url: api.uploadPic, 
        filePath: file.url,
        name:'multipartFile',
        success(res) {
          // 上传完成需要更新 fileList
          let resData = JSON.parse(res.data)
          console.log('上传成功了');
          console.log(resData.data);
          
          wx.request({
            url: api.userControl,
            header: {'content-type':'application/x-www-form-urlencoded'},
            method: 'PUT',
            data: {
              id: that.data.userInfo.id,
              avatarUrl: resData.data.path
            },
            success(res) {
              console.log(res);
              if(res.statusCode==200) {
                that.setData({ 
                  'userInfo.avatarUrl': resData.data.path
                });
                wx.setStorage({
                  data: that.data.userInfo,
                  key: 'userData',
                })
              }
            },
            fail(res) {
              console.log(res);
            }
          })
          //
        },
        fail(res) {
          console.log(res);
        }
      });
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let that = this;
    wx.getStorage({
      key: 'userData',
      success(res) {
        let showNum = res.data.phoneNumber
        let font = showNum.slice(0,3);
        let back = showNum.slice(7,12);
        showNum = [font,back].join('****')
        that.setData({
          loginState : true,
          userInfo:res.data,
          showNum,
        })
        if(res.data.gender == 0) {
          that.setData({
            gender:'男'
          })
        }else if (res.data.gender == 1){
          that.setData({
            gender:'女'
          })
        }
        console.log(that.data.userInfo);
      }
    });
  }

})