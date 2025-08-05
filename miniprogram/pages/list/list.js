Page({
    data: {
      dateOptions: ['全部时间', '今天', '本周', '本月'],
      dateIndex: 0,
      typeOptions: ['全部类型', '脱口秀', '即兴喜剧', '演讲', '魔术'],
      typeIndex: 0,
      eventList: [],
      filteredList: [], // 新增：筛选后的列表
      page: 1,
      pageSize: 10,
      isLoading: false,
      noMoreData: false,
      category: ''
    },
  
    onLoad: function(options) {
        if (options.date) {
            this.setData({
              selectedDate: options.date,
              dateIndex: 0 // 重置日期筛选
            });
          }
      this.setData({
        category: options.category || ''
      }, () => {
        // 根据首页传入的category设置初始typeIndex
        if (this.data.category) {
          const typeIndex = this.data.typeOptions.findIndex(
            item => item === this.data.category
          );
          if (typeIndex > 0) {
            this.setData({ typeIndex });
          }
        }
        this.loadEvents();
      });
    },
  
    // 加载演出列表
    loadEvents: function() {
      if (this.data.isLoading || this.data.noMoreData) return;
      
      this.setData({ isLoading: true });
      
      // 模拟网络请求
      setTimeout(() => {
        // 模拟数据 - 实际项目中替换为真实API请求
        const mockData = this.getMockData();
        
        // 首次加载或刷新时，重置列表
        const newList = this.data.page === 1 
          ? mockData 
          : [...this.data.eventList, ...mockData];
        
        this.setData({
          eventList: newList,
          date: this.data.selectedDate,
          noMoreData: mockData.length < this.data.pageSize,
          isLoading: false
        }, () => {
          // 数据加载完成后执行筛选
          this.applyFilters();
        });
        
      }, 800);
    },
  
    // 应用筛选条件
    applyFilters: function() {
      const { eventList, dateIndex, typeIndex, typeOptions } = this.data;
      
      let filtered = [...eventList];
      
      // 1. 按类型筛选
      if (typeIndex > 0) {
        const selectedType = typeOptions[typeIndex];
        filtered = filtered.filter(item => item.type === selectedType);
      }
      
      // 2. 按时间筛选
      if (dateIndex > 0) {
        const now = new Date();
        let startDate, endDate;
        
        switch(dateIndex) {
          case 1: // 今天
            startDate = new Date(now.setHours(0, 0, 0, 0));
            endDate = new Date(now.setHours(23, 59, 59, 999));
            break;
          case 2: // 本周
            const day = now.getDay();
            const diff = now.getDate() - day + (day === 0 ? -6 : 1);
            startDate = new Date(now.setDate(diff));
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;
          case 3: // 本月
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        }
        
        filtered = filtered.filter(item => {
          const eventDate = new Date(item.date);
          return eventDate >= startDate && eventDate <= endDate;
        });
      }
      
      this.setData({ filteredList: filtered });
    },
  
    // 日期筛选变化
    handleDateChange: function(e) {
      this.setData({
        dateIndex: e.detail.value,
        page: 1,
        noMoreData: false
      }, () => {
        this.loadEvents(); // 重新加载数据
      });
    },
  
    // 类型筛选变化
    handleTypeChange: function(e) {
      this.setData({
        typeIndex: e.detail.value,
        page: 1,
        noMoreData: false
      }, () => {
        this.applyFilters(); // 应用筛选条件
      });
    },
  
    // 模拟数据 - 实际项目中替换为API请求
    getMockData: function() {
      const types = ['脱口秀', '即兴喜剧', '演讲', '魔术'];
      const mockData = [];
      
      for (let i = 0; i < this.data.pageSize; i++) {
        const typeIndex = Math.floor(Math.random() * types.length);
        const daysOffset = Math.floor(Math.random() * 30);
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + daysOffset);
        
        mockData.push({
          id: this.data.page * 100 + i,
          poster: `/assets/event${(i % 4) + 1}.jpg`,
          title: `${types[typeIndex]}演出-${this.data.page}-${i}`,
          type: types[typeIndex],
          date: eventDate.toISOString().split('T')[0],
          time: '19:30',
          venue: ['上海欢乐剧场', '北京即兴中心', '广州创意园'][i % 3],
          minPrice: [99, 150, 180, 80][i % 4],
          maxPrice: [299, 150, 480, 180][i % 4]
        });
      }
      
      return mockData;
    }
  });