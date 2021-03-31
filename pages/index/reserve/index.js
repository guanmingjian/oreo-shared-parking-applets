const util= require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    show: false,
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '描述信息',
        openType: 'share',
      },
    ],
    communityId:0,
    communityName:"",
    communityAddress:"",
    reServestartTime:"",
    reServeEndtime:"",
    userId:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let {communityId, communityName, communityAddress, reServestartTime, reServeEndtime, userId} = options;
    reServestartTime = util.iToTime(reServestartTime)
    reServeEndtime = util.iToTime(reServeEndtime)
    this.setData({communityId, communityName, communityAddress, reServestartTime, reServeEndtime, userId})
    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
  },
  onSubmit() {
    wx.request({
      url: api.goOrder,
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data: {
        carId:'1351728993219760129',
        carNumber:'粤K37G68',
        communityAddress:'幸福小区幸福小区2',
        communityId:'1334096605736968193',
        communityName:'幸福小区2',
        reserveEndTime:'27',
        reserveStartTime:'26',
        userId:'1323460350756311041'
      },
      success: (res)=> {
        console.log(res);
      }
    })
  }
})