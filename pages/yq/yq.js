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
      }
    })
    if (!ycq){
      self.setData({
        ycq: app.formateDate(new Date, 'y'),
      });
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
    }
    // 计算yu'can
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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