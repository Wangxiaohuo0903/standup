Page({
    data: {
      event: {
        id: 1,
        poster: '/assets/event1.jpg',
        title: '爆笑脱口秀之夜',
        date: '2023-12-25',
        time: '19:30-21:00',
        venue: '上海欢乐剧场',
        minPrice: 99,
        maxPrice: 299,
        detailImage: '/assets/detail1.jpg',
        sessions: [
          { id: 1, date: '12月25日', time: '19:30' },
          { id: 2, date: '12月26日', time: '19:30' },
          { id: 3, date: '12月27日', time: '20:00' }
        ]
      },
      activeSession: 1
    },
  
    onLoad: function(options) {
      // 实际项目中这里会根据 options.id 获取详情数据
      console.log('演出ID:', options.id);
    },
  
    // 选择场次
    handleSessionTap: function(e) {
      this.setData({
        activeSession: e.currentTarget.dataset.id
      });
    },
  
    // 图片加载失败
    handleImageError: function() {
      wx.showToast({
        title: '图片加载失败',
        icon: 'none'
      });
    },
  
    // 购票按钮点击
    handleBuyClick: function() {
      wx.navigateTo({
        url: `/pages/order/order?eventId=${this.data.event.id}&sessionId=${this.data.activeSession}`
      });
    }
  });