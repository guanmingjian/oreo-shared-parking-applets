const AreaList = require('../../../utils/AreaList')
const api = require('../../../config/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:AreaList.default,
    area:'',
    value:'',
    getList:''
  },
  TimeId: -1,
  onShow() {
    console.log(this.data.areaList);
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
    console.log(event.detail);
    this.onClose();
    this.setData({area:event.detail.values})
  },
  onCancel() {
    this.setData({value:''})
  },
  onSearch() {
    let {value,area} = this.data;
    let that = this;
    area = area[2].name;
    wx.request({
      url: 'http://api.map.baidu.com/place/v2/search?query='+value+'&region='+area+'&ak=r8WySoXUYyEZ7yHHS9QOdzInnuRzHzaA&output=json',
      method:"GET",
      success:(res)=>{
        if (res.statusCode!==200) {
          wx.showToast({
            title: '没有搜索结果',
            icon:'none'
          })
        }else {
          console.log(res.data.results);
          that.setData({getList:res.data.results})
          wx.request({
            url: api.getCommunity,
            method:'POST',
            header: {'content-type':'application/x-www-form-urlencoded'},
            data: {
              area: "天河区",
              city: "广州市",
              latitude: "23.165843",
              longitude: "113.333697",
              province: "广东省"
            },
            success: (res)=> {
              console.log(res);
              console.log(res.data.data);
              wx.setStorageSync('parkingList', res.data.data)
            }
          })
        }
      }
    })
  },
  areaCancel() {
    this.setData({area:''})
    this.onClose();
  },
  onChange(event) {
    let that = this;
    let {area} = this.data;
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      console.log(event.detail);
      that.setData({value:event.detail})
    }, 500);
  },
  onClick() {
    let {area} = this.data
    console.log('click');
    if (area!=='') {
      this.onSearch();
    }else {
      wx.showToast({
        title: '请先选择地区',
        icon:'none'
      })
    }
  },
  toIndex(e) {
    console.log(e.currentTarget.dataset);
    let {lat, lng, currentname} = e.currentTarget.dataset;
    wx.setStorageSync('lat', lat)
    wx.setStorageSync('lng', lng)
    wx.setStorageSync('currentName', currentname)
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})