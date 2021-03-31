// pages/profile/myPark/index.js
const api = require('../../../config/api.js')
const util= require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    activeNames: ['1'],
  },
  onChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否开启车位？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ checked: !this.data.checked });
        }
      },
    });
  },
  onChange1(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goUpload() {
    wx.navigateTo({
      url: 'publishPark/index',
    })
  }
})