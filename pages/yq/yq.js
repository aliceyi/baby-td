const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ycq: '',
    last_ycq: '',
    yweek: 0,
    yday:0,
    last_days: 0,
    totalDays: 280,
    astro: '',
    userInfo: {
      nickName: 'nickName'
    },
  },
  init: function(){
    const self = this; 
    // 初始化，今天日期， 若是设置过，显示设置过的数据
    const ycq = wx.getStorage({
      key: 'ycq',
      success: function (res) {
        if (res.data) {
          self.setData({
            ycq: res.data,
          });
        }
        // 计算预产期
        self.computeWeek();
        // 计算距离预产期的天数
        self.computeYcq();
        // 计算星座
        self.computeAstro();
      }
    })
    if (self.data.ycq === ''){
      self.setData({
        ycq: app.formateDate(new Date, 'y'),
      });
      // 计算预产期
      self.computeWeek();
      // 计算距离预产期的天数
      self.computeYcq();
      // 计算星座
      self.computeAstro();
    }
  },
  computeAstro: function () {
    var self = this;
    if (self.data.last_ycq) {
      const ld = new Date(self.data.last_ycq);
      self.setData({
        astro: self.getAstro(ld.getMonth() + 1, ld.getDate()) + '座'
      })
    }
  },
  computeYcq: function(){
    // 计算预产期 280 days
    const self = this;
    const ycqt = (new Date(self.data.ycq)).getTime();
    const last_ycq = ycqt + self.data.totalDays * 24 * 60 * 60 * 1000;
    const date = app.formateDate(new Date(last_ycq), 'y');
    self.setData({
      last_ycq: date,
    })
  },
  computeWeek: function(){
    //计算孕期
    const self = this;
    const ycqt = (new Date(self.data.ycq)).getTime();
    console.log(self.data.ycq, ycqt)
    const currt = (new Date()).getTime();
    console.log(new Date(), currt)
    const diff = app.formateDuring(currt - ycqt);
    console.log(diff, currt - ycqt);
    self.setData({
      yweek: parseInt(diff.days / 7),
      yday: diff.days % 7,
      last_days: self.data.totalDays - diff.days,
    })
  },
  bindDateChange: function(e){
    // 若是改变则，修改页面值并且保存
    const self = this;
    const bycq = e.detail.value.replace(/-/ig, '/');
    if (self.data.ycq !== bycq) {
      self.setData({
        ycq: bycq,
      });
      wx.setStorage({
        key: "ycq",
        data: self.data.ycq,
      });
      // 计算预产期
      self.computeWeek();
      // 计算距离预产期的天数
      self.computeYcq();
      // 计算星座
      self.computeAstro();
    }
    // 计算yu'can
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 获取星座
   */
  getAstro: function(m, d) {  
    return "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m * 2 - (d < "102223444433".charAt(m - 1) - -19) * 2, 2);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.init();
    this.getUserInfo();
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