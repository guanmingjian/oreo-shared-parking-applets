// pages/test/index.js
import http from '../../request/index'
const api = require('../../config/api')
http://api.map.baidu.com/place/v2/search?query=小区&region=天河区&ak=r8WySoXUYyEZ7yHHS9QOdzInnuRzHzaA&output=json

const time = {
  '0': ['00', '30'],'1': ['00', '30'],'2': ['00', '30'],'3': ['00', '30'],'4': ['00', '30'],
  '5': ['00', '30'],'6': ['00', '30'],'7': ['00', '30'],'8': ['00', '30'],'9': ['00', '30'],
  '10': ['00', '30'],'11': ['00', '30'],'12': ['00', '30'],'13': ['00', '30'],'14': ['00', '30'],
  '15': ['00', '30'],'16': ['00', '30'],'17': ['00', '30'],'18': ['00', '30'],'19': ['00', '30'],
  '20': ['00', '30'],'21': ['00', '30'],'22': ['00', '30'],'23': ['00', '30']
};

Page({
  data: {
    label:{
      content: '金水区绿地原盛国际1号楼A座9楼',  //文本
      color: '#FF0202',  //文本颜色
      borderRadius: 3,  //边框圆角
      borderWidth: 1,  //边框宽度
      borderColor: '#FF0202',  //边框颜色
      bgColor: '#ffffff',  //背景色
      padding: 5,  //文本边缘留白
      textAlign: 'center'  //文本对齐方式。有效值: left, right, center
    },
    markers: [{
      id: 0,
      latitude: 22.35430,
      longitude: 110.9480,
      width: 25,
      height: 25,
      callout:[{
        color:'#000',
        content:'气泡内容',
        fontSize:16,
        borderRadius:5,
        bgColor:'#FF0000',
        padding:20,
        textAlign:'center',
        display:"ALWAYS"
      }]
    },
    {
      id: 1,
      latitude: 22.35450,
      longitude: 110.9482,
      width: 25,
      height: 25,
      callout:[{
        color:'#ffffff',
        content:'气泡内容',
        fontSize:16,
        borderRadius:5,
        bgColor:'#FF0000',
        padding:20,
        textAlign:'center',
        display:"ALWAYS"
      }]
    }],
    phoneNum: "",
    columns: [
      {
        values: Object.keys(time),
        className: 'column1',
      },
      {
        values: time['0'],
        className: 'column2',
        defaultIndex: 0,
      },
    ],
    show: false,
    currentDate: '',
    minHour: '',
    maxHour: 23,
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }
      return options;
    },
  },
  onLoad() {
    wx.request({
      url: 'http://api.map.baidu.com/place/v2/search?page_size=20&query=花园&location=23.165843,113.333697&radius=2000&ak=r8WySoXUYyEZ7yHHS9QOdzInnuRzHzaA&output=json',
      method:"GET",
      success: (res) => {
        console.log(res.data.results);
        let arr = res.data.results;
        for (let i = 0; i < arr.length; i++) {
          const name = arr[i].name;
          const longitude = arr[i].location.lng+'';
          const latitude = arr[i].location.lat+'';
          const address = arr[i].address;
          const province = arr[i].province;
          const city = arr[i].city;
          const area = arr[i].area;
          console.log(longitude,latitude,area,address);
          wx.request({
            url: 'http://8.129.237.80:8301/parking/community/insert/'+name+'/'+longitude+'/'+latitude+'/'+address+'/'+province+'/'+city+'/'+area,
            method:"GET",
            success:(res)=> {
              console.log(res);
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let hour = new Date();
    this.setData({
      currentDate: hour.getHours()+':00',
      minHour: hour.getHours()
    }),
    
    console.log(this.data.currentDate);
  },

  onConfirm(event) {
    const { currentDate } = this.data;
    console.log('当前值：'+currentDate);
    this.onClose();
  },

  onCancel() {
    console.log('取消');
    this.onClose();
  },
  
  // handleinput(e) {
  //   this.setData({
  //     phoneNum: e.detail.value
  //   })
  // },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    console.log(this.data.currentDate);
  },
  getApi() {
    console.log(this.data.phoneNum);

    //发验证码
    // wx.request({
    //   url: `http://47.115.52.155:8301/service/send/captcha/${this.data.phoneNum}`,
    //   method: 'POST',
    //   header: {'content-type':'application/x-www-form-urlencoded'},
    //   data: {
    //    
    //   },
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: (err) => {
    //     console.log("失败了");
    //   }
    // });
    
    //验证
    // wx.request({
    //   url: 'http://47.115.52.155:8301/user/login/captcha',
    //   method: 'POST',
    //   header: {'content-type':'application/x-www-form-urlencoded'},
    //   data: {
    //     phoneNumber: "18802547507",
    //     captcha: "897075"
    //   },
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: (err) => {
    //     console.log("失败了");
    //   }
    // });

  },
  handleShow(){
    this.setData({show: true})
  },

  onClose() {
    this.setData({ show: false });
  },
  
})
