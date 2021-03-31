export const request=(params)=>{

  // 定义公共的url
  const baseUrl="http://8.129.237.80:8301";
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
     url:baseUrl+params.url,
     success:(result)=>{
       resolve(result.data);
     },
     fail:(err)=>{
       reject(err);
     }
    });
  })
}