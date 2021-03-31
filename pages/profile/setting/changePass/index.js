const api = require("../../../../config/api");
import Toast from '../../../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    pass:"",
    repass:""
  },
  TimeId:-1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  onChangePass(e){
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.setData({
        pass:e.detail
      })
      console.log(e.detail);
    }, 400);
  },

  onChangeRepass(e){
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.setData({
        repass:e.detail
      })
      console.log(e.detail);
    }, 400);
  },

  submitPass() {
    let {repass,pass,id} = this.data;
    console.log(repass);
    if (pass!=="" && repass!=="") {
      if (repass==pass) {
        wx.request({
          url: api.userControl,
          method:'PUT',
          header: {'content-type':'application/x-www-form-urlencoded'},
          data:{
            id,
            password:repass
          },
          success: (res)=> {
            if (res.statusCode===200) {
              Toast.success('修改成功');
              setTimeout(()=>{wx.navigateBack({
                delta: 2,
              })}, 2000)
            }
          }
        })
      }else {
        wx.showToast({
          title: '两次密码不一致！',
          icon: 'none',
        })
      }
    }else {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
      })
    }
  }
})