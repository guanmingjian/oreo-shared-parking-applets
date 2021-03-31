const API_BASE_URL = 'http://8.129.237.80:8301';

module.exports = {
    orc: API_BASE_URL + '/service/orc/idCard/font/', //身份证认证
    uploadPic: API_BASE_URL + '/service/oss/upload', //上传照片
    userControl: API_BASE_URL + '/user/user', //操作用户信息
    sendCode: API_BASE_URL + '/service/send/captcha/', //发送验证码
    captchaLogin: API_BASE_URL + '/user/login/captcha',//验证验证码
    passLogin: API_BASE_URL + '/user/login/password',
    drivingCard: API_BASE_URL + '/service/orcDriving/drivingLicense/font/',//行驶证正面
    carList: API_BASE_URL  + '/user/car/query/',
    deleteCarList: API_BASE_URL  + '/user/car/delete/',
    orderList: API_BASE_URL + '/order/list',
    suborderList: API_BASE_URL + '/order/reserve',
    orderDetailList: API_BASE_URL + '/order/detail',
    subOrderDetail: API_BASE_URL + '/order/reserve/detail',
    orderSearch: API_BASE_URL + '/order/search',
    goOrder: API_BASE_URL + '/order/reserve/commit',
    getCommunity: API_BASE_URL + '/parking/community/query',
    yezhuCommunity: API_BASE_URL + '/user/community/search',
    getParking: API_BASE_URL + '/parking/community/query'
}