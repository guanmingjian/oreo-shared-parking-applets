const api = require("../../config/api");

// pages/login/index.js
Page({
  data: {
    phoneNumber: '',
    captcha: '',
    title: '欢迎登录账号',
    isShow: true,
    codeBtn: {
      text: '发送验证码',
      waitingCode: false,
      count: 120,
      color: '#000'
    },
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleTel(e) {
    this.setData({
      phoneNumber: e.detail.value
    })    
  },
  handleCaptcha(e) {
    this.setData({
      captcha: e.detail.value
    })    
  },
  handlePass(e) {
    this.setData({
      password: e.detail.value
    }) 
  },
  changeLogin(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  sendCode() {
    if(!(/^1[34578]\d{9}$/.test(this.data.phoneNumber))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon:'none'
      });
    }else {
      var inter = setInterval(function() {
        this.setData({
          ['codeBtn.waitingCode']: true,
          ['codeBtn.text']: this.data.codeBtn.count + 's',
          ['codeBtn.count']: this.data.codeBtn.count - 1,
          ['codeBtn.color']: '#cccccc'
        });
        
        if (this.data.codeBtn.count < 0) {
          clearInterval(inter)
          this.setData({
            ['codeBtn.text']: '重新发送',
            ['codeBtn.count']: 120,
            ['codeBtn.waitingCode']: false,
            ['codeBtn.color']: '#000'
          });
        }
      }.bind(this), 1000);
      //发验证码
      wx.request({
        url: api.sendCode + this.data.phoneNumber,
        method: 'POST',
        header: {'content-type':'application/x-www-form-urlencoded'},
        success: (result) => {
          console.log(result);
        },
        fail: (err) => {
          console.log("失败了");
        }
      });
    }
  },
  passLogin() {
    wx.request({
      url: api.passLogin,
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data: {
        phoneNumber: this.data.phoneNumber,
        password: this.data.password
      },
      success: (result) => {
        console.log(result.data);          
        if(result.data.code == '200'||result.data.code == '201') {
          wx.showToast({
            title: '登录成功',
            duration: 2000,
            icon:'none'
          });
          wx.setStorage({
            data: result.data.data,
            key: 'userData',
          });
          wx.setStorage({
            data: true,
            key: 'loginState',
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else if(result.data.code == '400') {
          wx.showToast({
            title: result.data.message,
            duration: 2000,
            icon:'none'
          });
        }else {
          wx.showToast({
            title: '验证码不存在或已过期，请重新登录',
            duration: 2000,
            icon:'none'
          });
        }
      },
      fail: (err) => {
        console.log("失败了");
      }
    });
  },

  goLogin() {
    if(this.data.captcha == '') {
      
    }else if(this.data.captcha.length != 6){
      wx.showToast({
        title: '验证码有误',
        duration: 2000,
        icon:'none'
      });
    }else {
      //验证
      wx.request({
        url: api.captchaLogin,
        method: 'POST',
        header: {'content-type':'application/x-www-form-urlencoded'},
        data: {
          phoneNumber: this.data.phoneNumber,
          captcha: this.data.captcha
        },
        success: (result) => {
          console.log(result.data);          
          if(result.data.code == '200') {
            wx.showToast({
              title: '登录成功',
              duration: 2000,
              icon:'none'
            });
            wx.setStorage({
              data: result.data.data,
              key: 'userData',
            });
            wx.setStorage({
              data: true,
              key: 'loginState',
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
          }else if(result.data.code == '201') {
            wx.showToast({
              title: '这个是新用户，注册且登录',
              duration: 2000,
              icon:'none'
            });
          }else {
            wx.showToast({
              title: '验证码不存在或已过期，请重新登录',
              duration: 2000,
              icon:'none'
            });
          }
        },
        fail: (err) => {
          console.log("失败了");
        }
      });
      
    }
  }
})