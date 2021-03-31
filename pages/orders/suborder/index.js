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
  
      imgUrls: [],  // 图片地址
      sub_id: null,

      sub_card: [],
      reserveStatus:''
      
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.sub_id = options.id
      // console.log(this.sub_id)
    },
  
    onShow(){
      this.getSubDetail(this.sub_id)
    },

    getSubDetail(sub_id){
      let that = this
      wx.request({
        url: api.subOrderDetail,
        header: {'content-type':'application/x-www-form-urlencoded'},
        method: 'GET',
        data: {
          reserveId: sub_id
        },
        success:(res) => {
          that.changeTime(res.data.data)          
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
  
    //点击图片触发事件
  
    swipclick: function(e) {
      // console.log(this.data.swiperCurrent);
      wx.switchTab({
        url: this.data.links[this.data.swiperCurrent]
      })
    },


    changeTime(arr) {
      arr.enterTime = util.iToTime(arr.enterTime)
      arr.leaveTime = util.iToTime(arr.leaveTime)
      let reserveStatus = ''
      if (arr.reserveStatus*1===1) {
        reserveStatus = '进行中'
      }else if(arr.reserveStatus*1===2) {
        reserveStatus = '已完成'
      }else if(arr.reserveStatus*1===3){
        reserveStatus = '已取消'
      }
      this.setData({
        sub_card: arr,
        imgUrls: arr.communityPhotoList,
        reserveStatus
      })
    }

  })