Component({
    properties: {
      event: {
        type: Object,
        value: {
          id: '',
          poster: '',
          title: '',
          date: '',
          time: '',
          venue: '',
          minPrice: 0,
          maxPrice: 0,
          tags: []
        }
      }
    },
  
    methods: {
      // 点击卡片跳转到详情页
      handleCardTap: function() {
        const event = this.properties.event;
        wx.navigateTo({
          url: `/pages/detail/detail?id=${event.id}&title=${encodeURIComponent(event.title)}`
        });
      }
    }
  });