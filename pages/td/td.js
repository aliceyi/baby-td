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
    de_count:10, // 倒计时默认值，单位s
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
    }
    // 启动倒计时
    var time = self.data.de_count-1;
    var hours = parseInt(time / 3600);
    var mins = parseInt(time / 60);
    var seconds = time % 60;
    if(hours >1){
      self.setData({
        count_down: hours + ":" + mins + ":" + seconds,
      });
    } else if (mins > 0) {
      self.setData({
        count_down: mins + ":" + (seconds > 10 ?    seconds : '0' + seconds),
      });
    } else {
      self.setData({
        count_down: seconds > 10 ? seconds : '0' + seconds,
      });
    }
    if (time > 0) {
      self.setData({
        de_count: time - 1,
      });
      setTimeout(self.countDown, 1000);
    } else {
      // 结束后逻辑
    }
    
  },
  formateDate: function(date,type) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (type === 'h') {
      return hour + ':' + minute ;
    }
    if (type === 'y') {
      return year + '/' + month + '/' +day;
    }
    return year + '/' + month + '/' + day + hour + ':' + minute ;
  },
  /**
   * 点击胎动，开始记录
   */
  shark: function () {
    var self = this;
      //开始倒计时，
      if (!self.data.flag) self.countDown();
      //记录开始时间，
      self.setData({
        start_time: self.formateDate(new Date,'h'),
      });
      //修改有效次数和点击次数
      self.setData({
        acount: self.data.acount + 1,
        real_acount: self.data.acount + 1,
      });

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