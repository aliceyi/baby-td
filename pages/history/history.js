const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      // {
      //   date: '2018-01-04',
      //   status: '正常',
      //   ts_count: 23,
      //   child: [
      //     {
      //       start_time: '23:54',
      //       end_time: '00:54',
      //       real_acount: 2,
      //       acount: 2
      //     },
      //     {
      //       start_time: '23:54',
      //       end_time: '00:54',
      //       real_acount: 2,
      //       acount: 2
      //     }
      //   ]
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var getHistory = wx.getStorage({
      key: 'history',
      success: function (res) {
        console.log(res.data.length, res.data);
        if (res.data) {
          let items = [];
          let item = [];
          res.data.reverse().map((n,i) => {
            const dn = app.formateDate(new Date(n.date), 'y');
            const child = {
              start_time: n.start_time,
              end_time: n.end_time,
              real_acount: n.real_acount,
              acount: n.acount
            }
            if (!item[dn]) {
              item[dn] = [
                child
              ]
            } else {
              item[dn].push(child);
            }
          })
          for (var i in item) {
            let count = item[i][0].real_acount * 12;
            if( item[i].length > 3) {
              const r1 = item[i][0].real_acount;
              const r2 = item[i][1].real_acount;
              const r3 = item[i][2].real_acount;
              count = (r1 + r2 + r3) * 4;
            }
            items.push({
              date: i,
              status: count > 20 ? '正常' : '异常',
              ts_count: count,
              child: item[i]
            })
          }
          self.setData({
            items: items,
          });
        }
      }
    })
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