const api = require('../../../config/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

        ordercarts: [],
        userId: null,
        title: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.title = options.title
        console.log(this.title)
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        // 获取用户id
        let userInfo = wx.getStorageSync('userData');
        this.setData({userId:userInfo.id});

        // 调用搜索数据方法
        this.getSearchData(1,this.title)
    },

    getSearchData(userId,title){
        let that = this;
        wx.request({
          url: api.orderSearch,
          header: {'content-type':'application/x-www-form-urlencoded'},
          method: 'GET',
          data: {
            communityName: title,
            userId: userId
          },
          success:(res) => {
            console.log('成功了');
            that.setData({
              ordercarts: res.data.data
            })
            console.log(that.data.ordercarts);
          }
        })
    },
     // 跳转到停车订单详情页
  goOdt(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/orders/orderdetail/index?id='+id })
  },
})