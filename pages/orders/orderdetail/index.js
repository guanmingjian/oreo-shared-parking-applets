// pages/orders/orderdetail/index.js
const api = require('../../../config/api.js')
const util= require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        /*
          步骤条
          text: '步骤一',
          */
        desc: '预约中',
        inactiveIcon: 'location-o',
        activeIcon: 'success',
      },
      {
        desc: '预约成功',
        inactiveIcon: 'like-o',
        activeIcon: 'plus',
      },
      {
        desc: '入库成功',
        inactiveIcon: 'star-o',
        activeIcon: 'cross',
      },
      {
        desc: '订单完成',
        inactiveIcon: 'phone-o',
        activeIcon: 'fail',
      },
    ],
    current: 0,  //当前所在页面的 index

    indicatorDots: true, //是否显示面板指示点

    autoplay: true, //是否自动切换

    interval: 3000, //自动切换时间间隔

    duration: 800, //滑动动画时长

    circular: true, //是否采用衔接滑动

    imgUrls: [],    // 图片地址
    order_id: null,
    order_detail: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.order_id = options.id
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail(this.order_id)
  },
  //轮播图的切换事件

  getOrderDetail(order_id){
    let that = this
    wx.request({
      url: api.orderDetailList,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'GET',
      data: {
        orderId: order_id
      },
      success:(res) => {
        this.changeTime(res.data.data)
      }
    })    
  },
  swiperChange: function(e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  changeTime(arr) {
    arr.enterTime = util.iToTime(arr.enterTime)
    arr.leaveTime = util.iToTime(arr.leaveTime)
    this.setData({
      order_detail: arr,
      imgUrls: arr.communityPhotoList
    })
  }
})