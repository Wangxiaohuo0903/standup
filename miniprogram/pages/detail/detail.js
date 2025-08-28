const { getEventDetail, createOrder, requestPayment } = require('../../api/index');
const { theme, copy } = require('../../utils/tenant');

Page({
    data: {
      eventId: '',
      eventDetail: null,
      loading: true,
      selectedPriceOption: null,
      quantity: 1,
      showPurchaseModal: false,
      userInfo: {
        name: '',
        phone: ''
      },
      purchasing: false,
      paying: false,
      theme,
      copy
    },
  
    onLoad: function(options) {
      const eventId = options.id || options.eventId;
      if (eventId) {
        this.setData({ eventId });
        this.loadEventDetail();
      } else {
        wx.showToast({ title: '参数错误', icon: 'none' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    },

    // 加载演出详情
    async loadEventDetail() {
      try {
        this.setData({ loading: true });
        const eventDetail = await getEventDetail(this.data.eventId);
        this.setData({ 
          eventDetail,
          selectedPriceOption: eventDetail.priceOptions[0] // 默认选中第一个价格选项
        });
      } catch (error) {
        console.error('加载演出详情失败:', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        this.setData({ loading: false });
      }
    },

    // 选择价格选项
    onPriceOptionTap: function(e) {
      const priceOptionId = e.currentTarget.dataset.id;
      const priceOption = this.data.eventDetail.priceOptions.find(p => p.id === priceOptionId);
      this.setData({ selectedPriceOption: priceOption });
    },

    // 修改数量
    onQuantityChange: function(e) {
      const change = parseInt(e.currentTarget.dataset.change);
      const newQuantity = Math.max(1, Math.min(5, this.data.quantity + change));
      this.setData({ quantity: newQuantity });
    },

    // 显示购买弹窗
    onPurchaseTap: function() {
      if (this.data.eventDetail.status !== 'onSale') {
        wx.showToast({ title: '演出暂未开售', icon: 'none' });
        return;
      }
      
      if (!this.data.selectedPriceOption || this.data.selectedPriceOption.remainingCount < this.data.quantity) {
        wx.showToast({ title: '余票不足', icon: 'none' });
        return;
      }

      this.setData({ showPurchaseModal: true });
    },

    // 关闭购买弹窗
    onClosePurchaseModal: function() {
      this.setData({ showPurchaseModal: false });
    },

    // 用户信息输入
    onUserInfoInput: function(e) {
      const field = e.currentTarget.dataset.field;
      const value = e.detail.value;
      this.setData({
        [`userInfo.${field}`]: value
      });
    },

    // 确认购买
    async onConfirmPurchase() {
      const { userInfo, eventId, selectedPriceOption, quantity } = this.data;
      
      // 验证用户输入
      if (!userInfo.name.trim()) {
        wx.showToast({ title: '请输入姓名', icon: 'none' });
        return;
      }
      
      if (!/^1[3-9]\d{9}$/.test(userInfo.phone)) {
        wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
        return;
      }

      try {
        this.setData({ purchasing: true });
        
        // 创建订单
        const order = await createOrder({
          eventId,
          priceOptionId: selectedPriceOption.id,
          quantity,
          userInfo: {
            name: userInfo.name.trim(),
            phone: userInfo.phone
          }
        });

        this.setData({ 
          purchasing: false,
          showPurchaseModal: false 
        });

        // 跳转到支付页面
        wx.navigateTo({
          url: `/pages/payment/payment?orderId=${order.id}`
        });

      } catch (error) {
        console.error('创建订单失败:', error);
        wx.showToast({ title: '下单失败，请重试', icon: 'none' });
        this.setData({ purchasing: false });
      }
    },

    // 分享功能
    onShareAppMessage: function() {
      const { eventDetail } = this.data;
      return {
        title: eventDetail ? eventDetail.title : '精彩脱口秀演出',
        path: `/pages/detail/detail?id=${this.data.eventId}`,
        imageUrl: eventDetail ? eventDetail.poster : ''
      };
    },

    // 预览海报
    onPosterTap: function() {
      if (this.data.eventDetail && this.data.eventDetail.poster) {
        wx.previewImage({
          urls: [this.data.eventDetail.poster]
        });
      }
    },

    // 查看地址
    onAddressTap: function() {
      const { eventDetail } = this.data;
      if (eventDetail && eventDetail.address) {
        wx.showModal({
          title: '演出地址',
          content: `${eventDetail.venue}\n${eventDetail.address}`,
          showCancel: false,
          confirmText: '知道了'
        });
      }
    }
  });