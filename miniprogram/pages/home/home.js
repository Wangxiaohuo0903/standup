Page({
    data: {
      banners: [
        { id: 1, imageUrl: '/assets/banner1.jpg', link: '' },
        { id: 2, imageUrl: '/assets/banner2.jpg', link: '' },
        { id: 3, imageUrl: '/assets/banner3.jpg', link: '' }
      ],
      categories: [
        { id: 'all', name: '全部' },
        { id: 'standup', name: '脱口秀' },
        { id: 'improv', name: '即兴喜剧' },
        { id: 'talk', name: '演讲' },
        { id: 'magic', name: '魔术' }
      ],
      activeCategory: 'all',
      recommendEvents: []
    },
  
    onLoad: function() {
      this.loadRecommendEvents();
    },
  
    // 加载推荐演出
    loadRecommendEvents: function() {
      // 模拟网络请求
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            poster: '/assets/event1.jpg',
            title: '爆笑脱口秀之夜',
            date: '2023-12-25',
            time: '19:30',
            venue: '上海欢乐剧场',
            minPrice: 99,
            maxPrice: 299,
            tags: ['热门', '折扣']
          },
          {
            id: 2,
            poster: '/assets/event2.jpg',
            title: '即兴喜剧工作坊',
            date: '2023-12-26',
            time: '14:00',
            venue: '北京即兴中心',
            minPrice: 150,
            maxPrice: 150,
            tags: ['互动性强']
          }
        ];
        this.setData({
          recommendEvents: mockData
        });
      }, 500);
    },
  
    // 分类切换
    handleCategoryTap: function(e) {
        const categoryId = e.currentTarget.dataset.id;
        let categoryName = '';
        
        // 将categoryId映射为中文名称
        const categoryMap = {
          'standup': '脱口秀',
          'improv': '即兴喜剧',
          'talk': '演讲',
          'magic': '魔术'
        };
        
        if (categoryId !== 'all') {
          categoryName = categoryMap[categoryId];
        }
        
        this.setData({ activeCategory: categoryId });
        
        wx.navigateTo({
          url: `/pages/list/list?category=${encodeURIComponent(categoryName)}`
        });
      }
  });