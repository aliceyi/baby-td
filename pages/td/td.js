Page({

  /**
   * 页面的初始数据
   */
  data: {
    acount:0, // 点击次数
    real_acount: 0, // 有效点击次数
    date: '', // 日期保存
    real_time:'', // 上一个有效点击的时间
    start_time:'',// 开始时间
    count_down:'',// 倒计时时间
    end_time:'',// 结束时间
    real_step: 1, // 默认有效胎动间隔 min
    countdown_time: 3600, // 倒计时默认值，单位s
    de_count:0, // 倒计时，计算值
    flag:false, // 记录是否开始倒计时
    timmer: '', // 保存倒计时定时器
    btn_text: '点击开始', // 按钮文案
    historyData: [
      // {
      //   start_time: '',
      //   end_time: '',
      //   real_acount: '',
      //   acount: 0,
      //   date: '',
      // }
    ], // 历史记录保存
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
        btn_text: '动一下'
      })
    }
    if (d.de_count === 0) {
      self.setData({
        de_count: self.data.countdown_time - 1,
      })
    }
    // 启动倒计时
    var timmer = '';
    var time = self.data.de_count ;
    var hours = parseInt(time / 3600);
    var mins = parseInt(time / 60);
    var seconds = time % 60;
    if(hours >1){
      self.setData({
        count_down: hours + ":" + mins + ":" + seconds,
      });
    } else if (mins > 0) {
      self.setData({
        count_down: mins + ":" + (seconds >= 10 ? seconds : '0' + seconds),
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
      timmer =  setTimeout(self.countDown, 1000);
      self.setData({
        timmer: timmer
      })
    }
    
  },
  formateDate: function(date,type) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (type === 'h') {
      return (hour > 10 ? hour : `0${hour}`) + ':' + (minute >= 10 ? minute : `0${minute}`) ;
    }
    if (type === 'y') {
      return year + '/' + month + '/' +day;
    }
    return year + '/' + month + '/' + day +' '+ (hour > 10 ?  hour :  `0${hour}`) + ':' + (minute >= 10 ? minute : `0${minute}`)  ;
  },
  resetData: function() {
    this.setData({
      acount: 0, // 点击次数
      real_acount: 0, // 有效点击次数
      real_time: '', // 上一个有效点击的时间
      start_time: '',// 开始时间
      count_down: '',// 倒计时时间
      end_time: '',// 结束时间
      de_count: 0, // 倒计时，计算值
      timmer: '', // 保存倒计时定时器
    });
  },
  /**
   * 点击胎动，开始记录
   */
  shark: function () {
      var self = this, downTime='';
      if (self.data.flag) {
        //修改有效次数和点击次数
        self.setData({
          acount: self.data.acount + 1,
        });
        downTime = Date.now();
      }
      // 修改有效时间和有效次数
      if (self.data.real_time === '' && self.data.flag) {
        self.setData({
          real_time: downTime,
          real_acount: self.data.real_acount + 1,
        });
      } else if (downTime - self.data.real_time >= self.data.real_step * 60 * 1000) {// 记录有效次数和有效时间
        self.setData({
          real_time: downTime,
          real_acount: self.data.real_acount + 1,
        });
      }
      //开始倒计时，
      if (!self.data.flag) {
        // 记录当天日期
        self.setData({
          date: new Date,
        })
        // 重新开始
        if (self.data.end_time !== ''){
          self.resetData();
        } 
        self.countDown();
      }
      //记录开始时间，
      self.setData({
        start_time: self.formateDate(new Date,'h'),
      });
  },
  /**
 * 点击胎动，开始记录
 */
  end: function () {
    var self = this;
    //记录结束时间，
    self.setData({
      end_time: self.formateDate(new Date, 'h'),
    });
    // 停止倒计时
    clearTimeout(self.data.timmer);
    // 文案修改 和 设置倒计时状态
    self.setData({
      btn_text: "重新开始",
      flag: false,
    });
    var d = self.data;
    
    if( d.acount >0) {
      // 保存数据

      var history = '';
      var getHistory = wx.getStorage({
        key: 'history',
        success: function (res) {
          if(res.data) {
            self.setData({
              historyData: res.data,
            });
          }
          history = self.data.historyData.concat(
            {
              start_time: d.start_time,
              end_time: d.end_time,
              real_acount: d.end_time,
              acount: d.acount,
              date: d.date,
            }
          )
          wx.setStorage({
            key: "history",
            data: history,
          })
        }
      })
      if (!getHistory) {
        history = [
          {
            start_time: d.start_time,
            end_time: d.end_time,
            real_acount: d.end_time,
            acount: d.acount,
            date: d.date,
          }
        ]
        wx.setStorage({
          key: "history",
          data: history,
        })
      }
    }
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