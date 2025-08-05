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
      // 模拟有演出的日期数据（实际应从后端获取）
      showDates: [
        '2023-10-15', '2023-10-18', '2023-10-20', 
        '2023-10-22', '2023-10-25', '2023-10-28',
        '2023-11-02', '2023-11-05', '2023-11-08',
        '2023-11-12', '2023-11-15', '2023-11-18',
        '2023-11-20', '2023-11-25', '2023-11-28',
        '2023-12-01', '2023-12-05', '2023-12-10',
        '2023-12-15', '2023-12-20', '2023-12-25'
      ]
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
        this.generateCalendarData();
      });
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
      const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      
      // 添加上个月的日期
      const prevMonthDays = firstDay;
      const prevMonth = this.getPrevMonth(year, month);
      const daysInPrevMonth = new Date(prevMonth.year, prevMonth.month, 0).getDate();
      
      for (let i = 0; i < prevMonthDays; i++) {
        const day = daysInPrevMonth - prevMonthDays + i + 1;
        const date = `${prevMonth.year}-${prevMonth.month}-${day}`;
        days.push({
          day: day,
          date: date,
          isCurrentMonth: false,
          hasShow: this.data.showDates.includes(date),
          isToday: false
        });
      }
      
      // 添加本月的日期
      for (let i = 1; i <= daysInMonth; i++) {
        const date = `${year}-${month}-${i}`;
        days.push({
          day: i,
          date: date,
          isCurrentMonth: true,
          hasShow: this.data.showDates.includes(date),
          isToday: date === todayStr
        });
      }
      
      // 添加下个月的日期（补齐6行）
      const nextMonthDays = 42 - days.length; // 6行 * 7列 = 42个格子
      const nextMonth = this.getNextMonth(year, month);
      
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = `${nextMonth.year}-${nextMonth.month}-${i}`;
        days.push({
          day: i,
          date: date,
          isCurrentMonth: false,
          hasShow: this.data.showDates.includes(date),
          isToday: false
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
          currentSwiperIndex: 1
        }, () => {
          this.generateCalendarData();
        });
      } else if (current === 2) {
        // 向右滑动：显示下个月
        const nextMonth = this.getNextMonth(currentYear, currentMonth);
        this.setData({
          currentYear: nextMonth.year,
          currentMonth: nextMonth.month,
          currentSwiperIndex: 1
        }, () => {
          this.generateCalendarData();
        });
      }
    },
  
    // 切换到上个月
    handlePrevMonth: function() {
      const prevMonth = this.getPrevMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: prevMonth.year,
        currentMonth: prevMonth.month
      }, () => {
        this.generateCalendarData();
      });
    },
  
    // 切换到下个月
    handleNextMonth: function() {
      const nextMonth = this.getNextMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: nextMonth.year,
        currentMonth: nextMonth.month
      }, () => {
        this.generateCalendarData();
      });
    },
  
    // 处理日期点击
    handleDayTap: function(e) {
      const date = e.currentTarget.dataset.date;
      const parts = date.split('-');
      const formattedDate = `${parts[0]}年${parts[1]}月${parts[2]}日`;
      
      // 跳转到当日演出列表页
      wx.navigateTo({
        url: `/pages/list/list?date=${date}&title=${encodeURIComponent(formattedDate)}`
      });
    }
  });