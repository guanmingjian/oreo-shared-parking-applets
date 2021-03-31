import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginState:false,
    userInfo:{},
    showNum:''
  },
  goWallet() {
    let {userName} = this.data.userInfo;
    if(userName) {
      wx.navigateTo({
        url: '/pages/profile/wallet/index',
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
  toMyProfile(){
    wx.navigateTo({
      url: '/pages/profile/myprofile/index',
    })
  },
  goLogin() {
    wx.navigateTo({ url: '/pages/login/index' })
  },
  goOrder() {
    let {userName} = this.data.userInfo;
    if(userName) {
      wx.switchTab({
        url: '/pages/orders/index',
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
  goUserInfo() {
    let {userName} = this.data.userInfo;
    if(userName) {
      wx.navigateTo({
        url: '/pages/profile/myprofile/index',
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
  goMyCar() {
    let {userName,id} = this.data.userInfo;
    if(userName) {
      wx.navigateTo({
        url: '/pages/profile/mycar/index?id='+ id,
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
  onShow: function (options) {
    let that = this;
    wx.getStorage({
      key: 'userData',
      success(res) {
        that.setData({userInfo:res.data})
        if (res.data.userName!==undefined) {
          let showNum = res.data.phoneNumber
          let font = showNum.slice(0,3);
          let back = showNum.slice(7,12);
          showNum = [font,back].join('****')
          that.setData({
            loginState : true,
            userInfo:res.data,
            showNum
          })
        }
      }
    });
    wx.getStorage({
      key: 'loginState',
      success(res) {
        that.setData({
          loginState : res.data,
        })
      }
    });
  },

  onLoad: function () {
    
  }
  
})