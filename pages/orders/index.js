const api = require('../../config/api.js')

Page({

  // 页面初始化数据
  data: {
    active: 0,
    time: 18 * 100000,
    flag: 1,
    ordercarts:[ ],
    subcarts:[],
    finshcards: [],
    userInfo:{}
  },

  onShow() {
    let userInfo = wx.getStorageSync('userData');
    this.setData({userInfo});
    // console.log(this.data.userInfo.id);
   
    // 参数暂时固定，有用户后修改
    this.getOrder(1, userInfo.id)
    this.getSub(userInfo.id)
    this.getAllOrder(userInfo.id)
  },

   // 获取停车订单请求
  getOrder(orderStatus,userId){
    let that = this;
    wx.request({
      url: api.orderList,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'GET',
      data: {
        orderStatus: orderStatus,
        userId: userId
      },
      success:(res) => {
        // console.log('成功了');
        that.setData({
          ordercarts: res.data.data
        })
        // console.log(that.data.ordercarts);
      }
    })
    // console.log(this.data.ordercarts)
  },
  // 获取预约订单请求
  getSub(UserId){
    let that = this;
    wx.request({
      url: api.suborderList,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'GET',
      data: {
        UserId: UserId
      },
      success:(res) => {
        that.setData({
          subcarts: res.data.data
        })
      }
    })
    // console.log(this.data.subcarts)
  },

  // 获取全部订单请求
  getAllOrder(id){
    let that = this;
    wx.request({
      url: api.orderList,
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'GET',
      data: {
        userId: id
      },
      success:(res) => {
        // console.log('成功了');
        that.setData({
          finshcards: res.data.data
        })
        // console.log(that.data.ordercarts);
      }
    })
  },

  // 跳转到停车订单详情页
  goOdt(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/orders/orderdetail/index?id='+id })
  },
  // 跳转到预约订单详情页
  goSub(event) {
    // console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/orders/suborder/index?id='+id })
  },
  cancel(){
      
  },
  onSearch(event){
    console.log(event.detail);
    wx.navigateTo({ url: '/pages/orders/search/index?title='+ event.detail })
  },
  finished(){
    this.setData({
      flag:2,
      time:0
      })
  },
  onChange(event) {
  },

});