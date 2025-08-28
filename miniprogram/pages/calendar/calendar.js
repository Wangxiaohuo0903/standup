const { getCalendarEvents } = require('../../api/index');
const { theme, copy } = require('../../utils/tenant');

Page({
    data: {
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentSwiperIndex: 1, // 当前显示中间的swiper-item
      calendarData: [
        { year: 0, month: 0, days: [] }, // 上个月
        { year: 0, month: 0, days: [] }, // 当前月
        { year: 0, month: 0, days: [] }  // 下个月
      ],
      eventsData: {}, // 存储所有演出数据
      selectedDate: '', // 选中的日期
      selectedEvents: [], // 选中日期的演出列表
      loading: false,
      theme, // 租户主题配置
      copy // 租户文案配置
    },
  
    onLoad: function() {
      this.initCalendar();
    },
  
    // 初始化日历数据
    initCalendar: function() {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      
      // 设置三个月的日历数据
      this.setData({
        currentYear,
        currentMonth
      }, () => {
        this.loadCalendarData();
      });
    },

    // 加载日历数据
    async loadCalendarData() {
      this.setData({ loading: true });
      
      try {
        const { currentYear, currentMonth } = this.data;
        const prevMonth = this.getPrevMonth(currentYear, currentMonth);
        const nextMonth = this.getNextMonth(currentYear, currentMonth);
        
        // 并行加载三个月的演出数据
        const [prevEvents, currentEvents, nextEvents] = await Promise.all([
          getCalendarEvents(prevMonth.year, prevMonth.month),
          getCalendarEvents(currentYear, currentMonth), 
          getCalendarEvents(nextMonth.year, nextMonth.month)
        ]);
        
        // 合并所有演出数据
        const allEvents = { ...prevEvents, ...currentEvents, ...nextEvents };
        
        this.setData({
          eventsData: allEvents
        }, () => {
          this.generateCalendarData();
        });
        
      } catch (error) {
        console.error('加载日历数据失败:', error);
        wx.showToast({ title: '加载失败', icon: 'none' });
        this.generateCalendarData(); // 即使失败也生成基础日历
      } finally {
        this.setData({ loading: false });
      }
    },
  
    // 生成三个月的日历数据
    generateCalendarData: function() {
      const { currentYear, currentMonth } = this.data;
      
      // 计算上个月和下个月
      const prevMonth = this.getPrevMonth(currentYear, currentMonth);
      const nextMonth = this.getNextMonth(currentYear, currentMonth);
      
      // 生成三个月的数据
      const calendarData = [
        this.generateMonthData(prevMonth.year, prevMonth.month),
        this.generateMonthData(currentYear, currentMonth),
        this.generateMonthData(nextMonth.year, nextMonth.month)
      ];
      
      this.setData({ calendarData });
    },
  
    // 生成单个月的日历数据
    generateMonthData: function(year, month) {
      // 获取该月第一天是星期几（0-6，0代表星期日）
      const firstDay = new Date(year, month - 1, 1).getDay();
      // 获取该月总天数
      const daysInMonth = new Date(year, month, 0).getDate();
      
      const days = [];
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      
      // 添加上个月的日期
      const prevMonthDays = firstDay;
      const prevMonth = this.getPrevMonth(year, month);
      const daysInPrevMonth = new Date(prevMonth.year, prevMonth.month, 0).getDate();
      
      for (let i = 0; i < prevMonthDays; i++) {
        const day = daysInPrevMonth - prevMonthDays + i + 1;
        const date = `${prevMonth.year}-${prevMonth.month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const hasEvents = this.data.eventsData[date] && this.data.eventsData[date].length > 0;
        
        days.push({
          day: day,
          date: date,
          isCurrentMonth: false,
          hasShow: hasEvents,
          isToday: false,
          eventsCount: hasEvents ? this.data.eventsData[date].length : 0
        });
      }
      
      // 添加本月的日期
      for (let i = 1; i <= daysInMonth; i++) {
        const date = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const hasEvents = this.data.eventsData[date] && this.data.eventsData[date].length > 0;
        
        days.push({
          day: i,
          date: date,
          isCurrentMonth: true,
          hasShow: hasEvents,
          isToday: date === todayStr,
          eventsCount: hasEvents ? this.data.eventsData[date].length : 0
        });
      }
      
      // 添加下个月的日期（补齐6行）
      const nextMonthDays = 42 - days.length; // 6行 * 7列 = 42个格子
      const nextMonth = this.getNextMonth(year, month);
      
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = `${nextMonth.year}-${nextMonth.month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const hasEvents = this.data.eventsData[date] && this.data.eventsData[date].length > 0;
        
        days.push({
          day: i,
          date: date,
          isCurrentMonth: false,
          hasShow: hasEvents,
          isToday: false,
          eventsCount: hasEvents ? this.data.eventsData[date].length : 0
        });
      }
      
      return {
        year: year,
        month: month,
        days: days
      };
    },
  
    // 获取上个月的年月
    getPrevMonth: function(year, month) {
      if (month === 1) {
        return { year: year - 1, month: 12 };
      } else {
        return { year: year, month: month - 1 };
      }
    },
  
    // 获取下个月的年月
    getNextMonth: function(year, month) {
      if (month === 12) {
        return { year: year + 1, month: 1 };
      } else {
        return { year: year, month: month + 1 };
      }
    },
  
    // 处理swiper切换
    handleSwiperChange: function(e) {
      const current = e.detail.current;
      const { currentYear, currentMonth } = this.data;
      
      if (current === 0) {
        // 向左滑动：显示上个月
        const prevMonth = this.getPrevMonth(currentYear, currentMonth);
        this.setData({
          currentYear: prevMonth.year,
          currentMonth: prevMonth.month,
          currentSwiperIndex: 1,
          selectedDate: '',
          selectedEvents: []
        }, () => {
          this.loadCalendarData();
        });
      } else if (current === 2) {
        // 向右滑动：显示下个月
        const nextMonth = this.getNextMonth(currentYear, currentMonth);
        this.setData({
          currentYear: nextMonth.year,
          currentMonth: nextMonth.month,
          currentSwiperIndex: 1,
          selectedDate: '',
          selectedEvents: []
        }, () => {
          this.loadCalendarData();
        });
      }
    },
  
    // 切换到上个月
    handlePrevMonth: function() {
      const prevMonth = this.getPrevMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: prevMonth.year,
        currentMonth: prevMonth.month,
        selectedDate: '',
        selectedEvents: []
      }, () => {
        this.loadCalendarData();
      });
    },
  
    // 切换到下个月
    handleNextMonth: function() {
      const nextMonth = this.getNextMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: nextMonth.year,
        currentMonth: nextMonth.month,
        selectedDate: '',
        selectedEvents: []
      }, () => {
        this.loadCalendarData();
      });
    },
  
    // 处理日期点击
    handleDayTap: function(e) {
      const date = e.currentTarget.dataset.date;
      const eventsForDate = this.data.eventsData[date] || [];
      
      // 更新选中状态
      this.setData({
        selectedDate: date,
        selectedEvents: eventsForDate
      });
      
      // 如果该日期有演出，显示在日历下方；否则可选择跳转到列表页
      if (eventsForDate.length === 0) {
        const parts = date.split('-');
        const formattedDate = `${parts[0]}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
        
        wx.showModal({
          title: '提示',
          content: `${formattedDate}暂无演出，是否查看所有演出？`,
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: `/pages/list/list`
              });
            }
          }
        });
      }
    },

    // 点击演出卡片跳转到详情
    handleEventTap: function(e) {
      const eventId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/detail/detail?id=${eventId}`
      });
    },

    // 查看当日所有演出
    handleViewAllEvents: function() {
      const { selectedDate } = this.data;
      if (selectedDate) {
        const parts = selectedDate.split('-');
        const formattedDate = `${parts[0]}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
        
        wx.navigateTo({
          url: `/pages/list/list?date=${selectedDate}&title=${encodeURIComponent(formattedDate)}`
        });
      }
    }
  });