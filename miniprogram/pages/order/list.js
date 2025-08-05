Page({
    data: {
      currentStatus: 0,
      orderStatus: [
        { id: 0, name: '全部' },
        { id: 1, name: '待支付' },
        { id: 2, name: '已支付' },
        { id: 3, name: '已完成' },
        { id: 4, name: '已退款' }
      ],
      orders: []
    },
  
    onLoad: function(options) {
      if (options.status) {
        this.setData({
          currentStatus: parseInt(options.status)
        });
      }
      this.loadOrders();
    },
  
    // 加载订单
    loadOrders: function() {
      // 模拟订单数据
      const mockOrders = [
        {
          id: 1,
          orderNo: 'DD20231015001',
          eventId: 1,
          eventName: '爆笑脱口秀之夜',
          poster: '/assets/event1.jpg',
          date: '2023-12-25',
          time: '19:30',
          ticketType: '前区座位',
          quantity: 2,
          totalPrice: 598,
          status: 1,
          statusText: '待支付',
          createTime: '2023-10-15 14:30:22'
        },
        {
          id: 2,
          orderNo: 'DD20231014005',
          eventId: 2,
          eventName: '即兴喜剧工作坊',
          poster: '/assets/event2.jpg',
          date: '2023-12-26',
          time: '14:00',
          ticketType: '普通票',
          quantity: 1,
          totalPrice: 150,
          status: 2,
          statusText: '已支付',
          createTime: '2023-10-14 10:15:45'
        }
      ];
      
      // 根据状态筛选
      let filteredOrders = mockOrders;
      if (this.data.currentStatus > 0) {
        filteredOrders = mockOrders.filter(
          order => order.status === this.data.currentStatus
        );
      }
      
      this.setData({ orders: filteredOrders });
    },
  
    // 切换订单状态
    changeStatus: function(e) {
      const status = e.currentTarget.dataset.id;
      this.setData({
        currentStatus: status
      }, () => {
        this.loadOrders();
      });
    },
  
    // 取消订单
    cancelOrder: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.showModal({
        title: '确认取消订单',
        content: '确定要取消此订单吗？',
        success: (res) => {
          if (res.confirm) {
            // 实际项目中调用取消订单API
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            });
            this.loadOrders();
          }
        }
      });
    },
  
    // 支付订单
    payOrder: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/payment/payment?orderId=${id}`
      });
    },
  
    // 查看票券
    viewTicket: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/ticket/ticket?orderId=${id}`
      });
    },
  
    // 返回首页
    goHome: function() {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  });