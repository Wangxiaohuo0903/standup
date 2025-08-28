const { getOrder, requestPayment } = require('../../api/index');
const { theme, copy } = require('../../utils/tenant');

Page({
    data: {
      orderId: '',
      order: null,
      loading: true,
      paying: false,
      countDown: 900, // 15分钟倒计时
      countDownInterval: null,
      theme,
      copy
    },
  
    onLoad: function(options) {
      const orderId = options.orderId;
      if (orderId) {
        this.setData({ orderId });
        this.loadOrder();
        this.startCountDown();
      } else {
        wx.showToast({ title: '订单参数错误', icon: 'none' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    },

    onUnload: function() {
      // 清除倒计时
      if (this.data.countDownInterval) {
        clearInterval(this.data.countDownInterval);
      }
    },

    // 加载订单详情
    async loadOrder() {
      try {
        this.setData({ loading: true });
        const order = await getOrder(this.data.orderId);
        this.setData({ order });
        
        // 如果订单已支付，跳转到订单详情页
        if (order.status === 'paid') {
          wx.showToast({ title: '订单已支付', icon: 'success' });
          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/order/list`
            });
          }, 1500);
        }
      } catch (error) {
        console.error('加载订单失败:', error);
        wx.showToast({ title: '加载订单失败', icon: 'none' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      } finally {
        this.setData({ loading: false });
      }
    },

    // 开始倒计时
    startCountDown() {
      this.data.countDownInterval = setInterval(() => {
        const countDown = this.data.countDown - 1;
        if (countDown <= 0) {
          clearInterval(this.data.countDownInterval);
          wx.showModal({
            title: '订单已过期',
            content: '支付时间已超时，请重新下单',
            showCancel: false,
            success: () => {
              wx.navigateBack();
            }
          });
        } else {
          this.setData({ countDown });
        }
      }, 1000);
    },

    // 格式化倒计时显示
    formatCountDown(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // 发起微信支付
    async handleWechatPay() {
      if (this.data.paying) return;
      
      try {
        this.setData({ paying: true });
        
        // 请求支付
        const paymentResult = await requestPayment({
          orderId: this.data.orderId
        });

        if (paymentResult.success) {
          // 模拟微信支付API调用
          const paymentParams = {
            timeStamp: Date.now().toString(),
            nonceStr: Math.random().toString(36).substr(2, 15),
            package: `prepay_id=${paymentResult.transactionId}`,
            signType: 'MD5',
            paySign: 'mock_pay_sign'
          };

          // 调用微信支付
          wx.requestPayment({
            ...paymentParams,
            success: (res) => {
              wx.showToast({ title: '支付成功', icon: 'success' });
              setTimeout(() => {
                wx.redirectTo({
                  url: `/pages/order/list`
                });
              }, 1500);
            },
            fail: (err) => {
              if (err.errMsg === 'requestPayment:fail cancel') {
                wx.showToast({ title: '支付已取消', icon: 'none' });
              } else {
                wx.showToast({ title: '支付失败，请重试', icon: 'none' });
              }
            }
          });
        } else {
          wx.showToast({ 
            title: paymentResult.message || '支付失败，请重试', 
            icon: 'none' 
          });
        }
      } catch (error) {
        console.error('支付失败:', error);
        wx.showToast({ title: '支付失败，请重试', icon: 'none' });
      } finally {
        this.setData({ paying: false });
      }
    },

    // 复制订单号
    onCopyOrderId() {
      wx.setClipboardData({
        data: this.data.order.id,
        success: () => {
          wx.showToast({ title: '订单号已复制', icon: 'success' });
        }
      });
    },

    // 查看票务详情
    onViewTickets() {
      const { order } = this.data;
      if (order && order.tickets.length > 0) {
        const ticketInfo = order.tickets.map((ticket, index) => 
          `票券${index + 1}: ${ticket.seatNo || '无座位号'}`
        ).join('\n');
        
        wx.showModal({
          title: '票券信息',
          content: ticketInfo,
          showCancel: false,
          confirmText: '知道了'
        });
      }
    },

    // 联系客服
    onContactService() {
      wx.showModal({
        title: '联系客服',
        content: '如有支付问题，请联系客服电话：400-123-4567',
        showCancel: false,
        confirmText: '知道了'
      });
    }
  });