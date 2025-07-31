Page({
    data: {
      event: {
        id: 1,
        poster: '/assets/event1.jpg',
        title: '爆笑脱口秀之夜',
        venue: '上海欢乐剧场'
      },
      selectedSession: {
        id: 1,
        date: '12月25日',
        time: '19:30'
      },
      ticketTypes: [
        { id: 1, name: '前区座位', price: 299, stock: 20 },
        { id: 2, name: '后区座位', price: 199, stock: 50 },
        { id: 3, name: 'VIP座位', price: 399, stock: 5 }
      ],
      ticketType: 1,
      quantity: 1,
      maxQuantity: 5
    },
  
    onLoad: function(options) {
      // 实际项目中这里会根据 options.eventId 和 options.sessionId 获取数据
      console.log('参数:', options);
    },
  
    // 选择票档
    handleTicketTypeChange: function(e) {
      this.setData({
        ticketType: parseInt(e.detail.value)
      });
    },
  
    // 减少数量
    handleDecrease: function() {
      if (this.data.quantity > 1) {
        this.setData({
          quantity: this.data.quantity - 1
        });
      }
    },
  
    // 增加数量
    handleIncrease: function() {
      if (this.data.quantity < this.data.maxQuantity) {
        this.setData({
          quantity: this.data.quantity + 1
        });
      }
    },
  
    // 计算总价
    computed: {
      totalPrice: function() {
        const selectedType = this.data.ticketTypes.find(item => item.id === this.data.ticketType);
        return selectedType ? selectedType.price * this.data.quantity : 0;
      }
    },
  
    // 提交订单
    handleSubmit: function() {
      const orderData = {
        eventId: this.data.event.id,
        sessionId: this.data.selectedSession.id,
        ticketType: this.data.ticketType,
        quantity: this.data.quantity,
        totalPrice: this.data.totalPrice
      };
      
      // 实际项目中这里会调用下单接口
      console.log('订单数据:', orderData);
      
      wx.navigateTo({
        url: `/pages/payment/payment?orderId=12345&amount=${this.data.totalPrice}`
      });
    }
  });