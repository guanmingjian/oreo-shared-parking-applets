const AreaList = require('../../../../utils/AreaList')
const api = require('../../../../config/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:AreaList.default,
    area:'',
    value:'',
    getList:[],
    listShow:false,
    communityName:'',
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
    let {value,listShow} = this.data;
    let that = this;
    wx.request({
      url: api.yezhuCommunity,
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data: {
        area: "天河区",
        city:'广州市',
        communityName: value,
        isNeedDetail: true,
        province: '广东省'
      },
      success: (res)=> {
        that.setData({getList:res.data.data,listShow:!listShow})
      }
    })
  },
  choose(e){
    let {listShow} = this.data;
    this.setData({listShow:!listShow,communityName:e.currentTarget.dataset.name})
  },
  areaCancel() {
    this.onClose();
  },
  onChange(event) {
    let that = this;
    clearTimeout(this.TimeId);
      this.TimeId=setTimeout(() => {
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
      this.setData({value:''})
    }
  }
})