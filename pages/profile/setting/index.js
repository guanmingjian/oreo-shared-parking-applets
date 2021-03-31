import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  unLogin() {
    wx.setStorageSync('userData', [])
    wx.setStorage({
      data: false,
      key: 'loginState',
      success(res) {
        console.log(res);
        wx.switchTab({
          url: '/pages/profile/index',
        })
      }
    });
  },

  changePass() {
    let {userInfo} = this.data;
    if(userInfo.userName) {
      wx.navigateTo({
        url: '/pages/profile/setting/changePass/index?id=' + userInfo.id,
      })
    }else {
      Toast('请先登录后再操作');
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }, 1500);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userData') || [];
    this.setData({userInfo});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'loginState',
      success(res) {
        console.log(res);
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})