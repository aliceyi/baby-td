Page({

  /**
   * 页面的初始数据
   */
  data: {
    acount:0,
    real_acount: 0,
    start_time:'',
    count_down:'',
    end_time:'',
    de_count:3600, // 倒计时默认值，单位s
    flag:false, // 记录是否开始倒计时
  },
  /**
   * 倒计时
   */
  countDown: function () {
    var self = this;
    var d = self.data;
    if (!d.flag) {
      self.setData({
        flag: true,
      })
      // 启动倒计时
      var hours = parseInt(d.de_count / 3600);
      var mins = parseInt(d.de_count / 60);
      var seconds = d.de_count % 60;

      console.log(hours, mins, seconds);
      
    }
    
    
  },
  /**
   * 点击胎动，开始记录
   */
  shark: function () {
    var self = this;
    self.countDown();
      //开始倒计时，
      //记录开始时间，
      //修改有效次数和点击次数
    
      //点击结束保存数据

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