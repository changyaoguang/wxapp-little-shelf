// pages/login/tologin.js
const app = getApp();
const api = require('../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    showModal: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  bindGetUserInfo: function (e) {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (infoRes) {
              console.log('getUserInfo');
              //console.log("小程序res")
              //console.log(res)
              /*   var userInfo = res.userInfo;
                 //console.log("用户信息")
                 //console.log(userInfo)
                 var timeStamp = Date.parse(new Date()) / 1000;
                 var nickName = userInfo.nickName;
                 var gender = userInfo.gender;
                 var avatarUrl = userInfo.avatarUrl;
                 var country = userInfo.country;
                 var province = userInfo.province;
                 var city = userInfo.city;
                 var param = { code: code, nickname: nickName, logo: avatarUrl }
                 var paramsToSign = "appId=101605&param=" + JSON.stringify(param) + "&version=1.0.0&timeStamp=" + timeStamp + "&key=b0bb9ac9bfcfd46d3ec19acb63118e9b";
                 var sign = md5(paramsToSign).toLocaleUpperCase();*/
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: api.loginUrl,//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: loginRes.code,                    // 临时登录凭证
                  rawData: infoRes.rawData,               // 用户非敏感信息
                  signature: infoRes.signature,           // 签名
                  encryptedData: infoRes.encryptedData,   // 用户敏感信息
                  iv: infoRes.iv                          // 解密算法的向量
                },

                //  data: { appId: "101605", version: "1.0.0", timeStamp: timeStamp, param: JSON.stringify(param), sign: sign },
                success: function (res11) {
                  console.log('login success',res11,res11.result);
                  res11 = res11.data;

                  if (res11.result == 0) {
                    that.globalData.userInfo = res11.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res11.userInfo));
                    wx.setStorageSync('loginFlag', res11.skey);
                    callback();
                  } else {
                    that.showInfo(res11.errmsg);
                  }
                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
              //获取用户信息失败后。请跳转授权页面
              wx.showModal({
                title: '警告',
                content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '../tologin/tologin',
                    })
                  }
                }
              })
            }
          })
        }
      }

    })

    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },

  // 登录动作
  doLoginNew: function (callback = () => {}) {
    var that = this;
    console.log("doLoginNew")
    wx.login({
      success: function (loginRes) {
        console.log('code>>>' ,loginRes.code)
        if (loginRes.code) {
          /*
           * @desc: 获取用户信息 期望数据如下
           *
           * @param: userInfo       [Object]
           * @param: rawData        [String]
           * @param: signature      [String]
           * @param: encryptedData  [String]
           * @param: iv             [String]
           **/
          wx.getUserInfo({

            //withCredentials: true, // 非必填, 默认为true

            success: function (infoRes) {
              console.log(infoRes,'>>> infoRes')
              // 请求服务端的登录接口
              wx.request({
                url: api.loginUrl,

                data: {
                  code: loginRes.code,                    // 临时登录凭证
                  rawData: infoRes.rawData,               // 用户非敏感信息
                  signature: infoRes.signature,           // 签名
                  encryptedData: infoRes.encryptedData,   // 用户敏感信息
                  iv: infoRes.iv                          // 解密算法的向量
                },

                success: function (res) {
                  console.log('login success');
                  console.log(res);
                  res = res.data;

                  if (res.result == 0) {
                    app.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', JSON.stringify(res.userInfo));
                    wx.setStorageSync('loginFlag', res.skey);
                    // callback();
                  } else {
                    that.showInfo(res.errmsg);
                  }
                },

                fail: function (error) {
                  // 调用服务端登录接口失败
                  that.showInfo('调用接口失败');
                  console.log(error);
                }
              });
            },

            fail: function (error) {
              // 获取 userInfo 失败，去检查是否未开启权限
              wx.hideLoading();
              that.checkUserInfoPermission();
            }
          });

        } else {
          // 获取 code 失败
          that.showInfo('登录失败');
          console.log('调用wx.login获取code失败');
        }
      },

      fail: function (error) {
        // 调用 wx.login 接口失败
        that.showInfo('接口调用失败');
        console.log(error);
      }
    });

    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },

// 封装 wx.showToast 方法
  showInfo: function (info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})