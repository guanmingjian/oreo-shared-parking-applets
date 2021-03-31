import api from '../../config/api';
// pages/basics/index.js
// 引入SDK核心类
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const util= require('../../utils/util.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'N3RBZ-LZYHR-2ZVWQ-WFRPO-BJWX6-M7BRB' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    areaList:[
      {
        id: 0,
        title: '幸福小区',
        name: '幸福小区幸福小区幸福小区幸福小区幸福小区幸福小区',
        parkNum: 100,
      },
      {
        id: 1,
        title: '幸福小区',
        name: '幸福小区幸福小区',
        parkNum: 120,
      },
      {
        id: 2,
        title: '幸福小区',
        name: '幸福小区幸福小区',
        parkNum: 122,
      },
      {
        id: 3,
        title: '幸福小区',
        name: '幸福小区幸福小区幸福小区幸福小区幸福小区幸福小区',
        parkNum: 100,
      },
      {
        id: 4,
        title: '幸福小区',
        name: '幸福小区幸福小区幸福小区幸福小区幸福小区幸福小区',
        parkNum: 100,
      }
    ],
    markers: [], //地图参数：
    firstList:[],
    longitude: "", //经度
    latitude: "", //纬度,
    popupShow:true,
    communityShow:'',
    showStartTimePicker:false,
    showEndTimePicker:false,
    currentDate: '',
    minEndHour: '',
    startTime:0,
    endTime:0,
    reserveStartTime:0,
    reserveEndTime:0,
    minHour: '',
    maxHour: 23,
    lat:'',
    lng:'',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }
      return options;
    },
  },
  bindcallouttap(e){
    console.log(e);
  },
  markertap(e) {
    console.log(e);
  },
  goSearch() {
    wx.navigateTo({
      url: 'search/index',
    })
  },
  navigate() {
    let plugin = requirePlugin('routePlan');
    let key = 'N3RBZ-LZYHR-2ZVWQ-WFRPO-BJWX6-M7BRB';  //使用在腾讯位置服务申请的key
    let referer = '共享小区平台-小程序';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
        'name': '金坤花园',
        'latitude': 23.155818,
        'longitude': 113.333729
    });
    wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
    });
  },
  areaPopClose(){
    this.setData({communityShow:false})
  },
  timePickerClose() {
    let {popupShow} = this.data;
    this.setData({popupShow:!popupShow})
  },
  handleStartTimePickerShow(){
    this.setData({showStartTimePicker: true})
  },
  onStartTimePickerClose() {
    this.setData({ showStartTimePicker: false });
  },
  onStartTimePickerConfirm(event) {
    const { currentDate } = this.data;
    let minEndHour =currentDate.slice(0,2);
    let reserveStartTime = util.timeToi(currentDate)
    console.log('开始值：'+reserveStartTime);
    this.setData({startTime:currentDate, minEndHour, reserveStartTime})
    this.onStartTimePickerClose();
  },
  onStartTimePickerCancel() {
    console.log('开始值取消');
    this.setData({startTime:0, reserveStartTime:0})
    this.onStartTimePickerClose();
  },
  onStartInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    console.log(this.data.currentDate);
  },

  handleEndTimePickerShow(){
    this.setData({showEndTimePicker: true})
  },
  onEndTimePickerClose() {
    this.setData({ showEndTimePicker: false });
  },
  onEndTimePickerConfirm(event) {
    const { currentDate, popupShow,communityShow } = this.data;
    let reserveEndTime = util.timeToi(currentDate)
    console.log('结束值：'+reserveEndTime);
    this.setData({endTime:currentDate, reserveEndTime})
    this.onEndTimePickerClose();
    
    if (this.data.startTime!==this.data.endTime) {
      if(this.data.startTime!==0) {
        this.setData({popupShow:!popupShow,communityShow:!communityShow})
      }
    }else {
      Toast.fail('时间不能一致');
      this.setData({endTime:0, reserveEndTime:0})
    }
    
  },
  onEndTimePickerCancel() {
    console.log('结束值取消');
    this.setData({endTime:0, reserveEndTime:0})
    this.onEndTimePickerClose();
  },
  onEndInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    console.log(this.data.currentDate);
  },
  handlePopupShow() {
    let {popupShow,communityShow} = this.data
    this.setData({popupShow:!popupShow,communityShow:!communityShow})
  },
  goReserve(e) {
    let {userid, communityid, reservestarttime, reserveendtime, communityaddress, communityname} = e.target.dataset
    wx.navigateTo({
      url: 'reserve/index?communityId='+communityid+'&userId='+userid+'&reServestartTime='+reservestarttime+'&reServeEndtime='+reserveendtime+'&communityAddress='+communityaddress+'&communityName='+communityname,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentLocation()
  },
  onShow: function () {
    let hour = new Date();
    let userInfo = wx.getStorageSync('userData') || ''
    this.setData({
      currentDate: hour.getHours()+':00',
      minEndHour: hour.getHours(),
      minHour: hour.getHours(),
      communityShow: false,
      userInfo,
    })
    this.showCommunity()
  },
  showCommunity() {
    let markers =[]
    let areaList = []
    let firstList = []
    let lat = wx.getStorageSync('lat')|| ''
    let lng = wx.getStorageSync('lng')|| ''
    let currentName = wx.getStorageSync('currentName')|| ''
    let parkingList = wx.getStorageSync('parkingList') || ''
    let width= 25
    let height= 25
    let callout = {
          color:'#000',
          content: currentName,
          fontSize:16,
          borderRadius:5,
          bgColor:'#fff',
          padding:5,
          textAlign:'center',
          display:"ALWAYS"
        }
    // markers.push({latitude:lat,longitude:lng,width,height,callout})

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
        firstList = res.data.data
        for (let i = 0; i < firstList.length; i++) {
          const id = firstList[i].id*1;
          const latitude = firstList[i].latitude;
          const longitude = firstList[i].longitude;
          const width = 35;
          const height = 35;
          const iconPath = '/images/park.png';
          const title = firstList[i].name;
          const address = firstList[i].province+firstList[i].area+firstList[i].city+firstList[i].address;
          const callout = {
            color:'#000',
            content: firstList[i].name,
            fontSize:16,
            borderRadius:5,
            bgColor:'#fff',
            padding:5,
            textAlign:'center',
            display:"BYCLICK"
          }
          markers.push({id,latitude,longitude,width,height,callout,iconPath})
          areaList.push({id,name:address,title,parkNum:100})
        }
        this.setData({areaList,markers,communityShow:true})
      }
    })

    if (callout.content!=='') {
      markers.push({id:0,latitude:23.161727,longitude:113.339424,width,height,callout})
    }else {
      markers.push({id:0,latitude:23.161727,longitude:113.339424,width,height})
    }
    // if (parkingList!=='') {
    if (parkingList.length!=0) {
      for (let i = 0; i < parkingList.length; i++) {
        const id = parkingList[i].id;
        const latitude = parkingList[i].latitude;
        const longitude = parkingList[i].longitude;
        const width = 35;
        const height = 35;
        const iconPath = '/images/park.png';
        const title = parkingList[i].name;
        const address = parkingList[i].province+parkingList[i].area+parkingList[i].city+parkingList[i].address;
        const callout = {
          color:'#000',
          content: parkingList[i].name,
          fontSize:16,
          borderRadius:5,
          bgColor:'#fff',
          padding:5,
          textAlign:'center',
          display:"BYCLICK"
        }
        markers.push({id,latitude,longitude,width,height,callout,iconPath})
        areaList.push({id,name:address,title,parkNum:100})
      }
      this.setData({areaList})
    }
    this.setData({
      lat:23.161727, //test
      lng:113.339424, //
      markers
    })
    
    wx.removeStorageSync('lat')
    wx.removeStorageSync('lng')
    wx.removeStorageSync('currentName')
  },
  //获得地图
  getCurrentLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log("latitude:" + res.latitude)
        // console.log("longitude:" + res.longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
          // latitude: 22.938455,
          // longitude: 113.393732
        })
        // console.log("更新的latitude:" + that.data.latitude)
        // console.log("更新的longitude:" + that.data.longitude)
      }
    })
  },


  // 附近地点搜索
  nearby_search: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: 'kfc', //搜索关键词
      location: '39.980014,116.313972', //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/location.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})