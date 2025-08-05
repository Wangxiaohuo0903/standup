Page({
    data: {
      userInfo: {},
      orderStats: {
        waitPay: 2,
        paid: 5,
        completed: 10,
        refund: 1
      }
    },
  
    onLoad: function() {
      // 尝试从本地缓存获取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo });
      }
    },
  
    // 处理登录
    handleLogin: function() {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const userInfo = res.userInfo;
          this.setData({ userInfo });
          wx.setStorageSync('userInfo', userInfo);
          
          // 登录成功后获取手机号
          this.getPhoneNumber();
        },
        fail: (err) => {
          console.log('用户拒绝授权', err);
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none'
          });
        }
      });
    },
  
    // 获取手机号
    getPhoneNumber: function() {
      wx.login({
        success: (res) => {
          // 实际项目中这里会发送code到后端换取手机号
          // 模拟获取手机号
          setTimeout(() => {
            const userInfo = this.data.userInfo;
            userInfo.phone = '138****1234';
            this.setData({ userInfo });
            wx.setStorageSync('userInfo', userInfo);
          }, 1000);
        }
      });
    }
  });