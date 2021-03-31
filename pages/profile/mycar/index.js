// pages/profile/mycar/index.js
const api = require("../../../config/api");
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    show: false,
    actions: [
      {
        name: '解除绑定',
        color: '#00a8ff'
      }
    ],
    currentIndex:'',
    id:''
  },


  cancel() {
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    let that = this;
    let index = that.data.currentIndex;
    let newArr = that.data.carList;
    Dialog.confirm({
      message: '确认解绑',
    }).then(()=>{
      wx.request({
        url: api.deleteCarList + that.data.id+'/'+that.data.carList[index].carNumber,
        method: 'DELETE',
        success: (res)=> {
          newArr.splice(index, 1);
          that.setData({
            carList: newArr
          });
          Notify({ type: 'success', message: '解绑成功' });
        }
      })
    }).catch(() => {
      // on cancel
    });
    
  },

  remove(event) {
    this.setData({ 
      show: true,
      currentIndex: event.currentTarget.dataset['index']
    });
  },

  add() {
    let that = this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0]);
        wx.uploadFile({
          filePath: tempFilePaths[0],
          method: 'POST',
          name: 'multipartFile',
          url: api.drivingCard+that.data.id,
          success: (res)=> {
            console.log();
            if(JSON.parse(res.data).message != '车主这台车已经录入到系统中了哦~~~') {
              Notify({ type: 'success', message: '成功了' });
              that.getCarList();
            }else {
              Notify(JSON.parse(res.data).message);
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id})
    this.getCarList();
  },

  getCarList() {
    let that = this;
    wx.request({
      url: api.carList+that.data.id,
      method: 'GET',
      success: (res)=> {
        console.log(res.data);
        that.setData({
          carList:res.data.data
        })
      }
    })
  }


})