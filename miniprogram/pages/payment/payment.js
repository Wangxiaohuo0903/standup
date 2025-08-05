Page({
    data: {
      paymentType: 'wechat',
      agree: true,
      countdown: '15:00',
      orderInfo: {
        id: 1,
        eventName: '爆笑脱口秀之夜',
        date: '2023-12-25',
        time: '19:30',
        venue: '上海欢乐剧场',
        ticketType: '前区座位',
        quantity: 2,
        totalPrice: 598
      },
      timer: null
    },
  
    onLoad: function(options) {
      // 实际项目中根据 orderId 获取订单信息
      console.log('订单ID:', options.orderId);
      
      // 启动倒计时
      this.startCountdown(15 * 60); // 15分钟倒计时
    },
  
    onUnload: function() {
      // 页面卸载时清除定时器
      if (this.data.timer) {
        clearInterval(this.data.timer);
      }
    },
  
    // 支付方式切换
    handlePaymentChange: function(e) {
      this.setData({
        paymentType: e.detail.value
      });
    },
  
    // 同意协议
    handleAgreeChange: function(e) {
      this.setData({
        agree: e.detail.value.includes('agree')
      });
    },
  
    // 启动倒计时
    startCountdown: function(seconds) {
      let remaining = seconds;
      
      const timer = setInterval(() => {
        if (remaining <= 0) {
          clearInterval(timer);
          wx.showToast({
            title: '订单已超时',
            icon: 'none'
          });
          wx.navigateBack();
          return;
        }
        
        remaining--;
        
        const minutes = Math.floor(remaining / 60);
        const secs = remaining % 60;
        
        this.setData({
          countdown: `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        });
      }, 1000);
      
      this.setData({ timer });
    },
  
    // 处理支付
    handlePay: function() {
      // 模拟支付过程
      wx.showLoading({
        title: '支付中...',
        mask: true
      });
      
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '支付成功',
          icon: 'success'
        });
        
        // 跳转到支付成功页
        wx.redirectTo({
          url: `/pages/payment/success?orderId=${this.data.orderInfo.id}`
        });
      }, 2000);
    }
  });