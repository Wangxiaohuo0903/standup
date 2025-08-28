export async function getHome() {
    // 真实接口：return request<HomePayload>("/home");
    // mock：
    return Promise.resolve({
        banners: [
            { id: "b1", img: "https://picsum.photos/900/360?1", link: "/pages/detail/detail?id=1001" },
            { id: "b2", img: "https://picsum.photos/900/360?2", link: "/pages/list/list" }
        ],
        upcoming: [
            { id: "1001", title: "周五秀·DT深夜场", poster: "https://picsum.photos/400/260?e1", city: "北京", venue: "DownTown", date: "08-01", time: "22:00", priceFrom: 88, status: "onSale" },
            { id: "1002", title: "拿大顶剧社#040", poster: "https://picsum.photos/400/260?e2", city: "北京", venue: "DownTown", date: "08-01", time: "19:30", priceFrom: 150, status: "upcoming" }
        ],
        recommended: [
            { id: "1003", title: "主打秀·彩虹厂", poster: "https://picsum.photos/400/260?e3", city: "深圳", venue: "彩虹厂", date: "08-03", time: "20:00", priceFrom: 199, status: "onSale" }
        ],
        upcomingSale: [
            { id: "1004", title: "城市巡演·北京站", poster: "https://picsum.photos/400/260?e4", city: "北京", venue: "剧场A", date: "08-06", time: "19:30", priceFrom: 299, status: "upcoming" }
        ],
        merch: [
            { id: "m1", title: "在现场·冰箱贴", img: "https://picsum.photos/300/300?m1", price: 29 },
            { id: "m2", title: "限定徽章", img: "https://picsum.photos/300/300?m2", price: 49 }
        ]
    });
}
export async function getCalendarEvents(year, month) {
    // 真实接口：return request<CalendarPayload>(`/calendar/${year}/${month}`);
    // mock：生成当月的演出数据
    const events = {};
    // 生成一些模拟数据
    const mockEvents = [
        { id: "c1", title: "周五秀·DT深夜场", poster: "https://picsum.photos/400/260?c1", city: "北京", venue: "DownTown", time: "22:00", priceFrom: 88, status: "onSale" },
        { id: "c2", title: "拿大顶剧社#040", poster: "https://picsum.photos/400/260?c2", city: "北京", venue: "DownTown", time: "19:30", priceFrom: 150, status: "upcoming" },
        { id: "c3", title: "主打秀·彩虹厂", poster: "https://picsum.photos/400/260?c3", city: "深圳", venue: "彩虹厂", time: "20:00", priceFrom: 199, status: "onSale" },
        { id: "c4", title: "城市巡演·北京站", poster: "https://picsum.photos/400/260?c4", city: "北京", venue: "剧场A", time: "19:30", priceFrom: 299, status: "upcoming" },
        { id: "c5", title: "即兴喜剧之夜", poster: "https://picsum.photos/400/260?c5", city: "上海", venue: "笑果工厂", time: "21:00", priceFrom: 120, status: "onSale" },
        { id: "c6", title: "脱口秀新人专场", poster: "https://picsum.photos/400/260?c6", city: "广州", venue: "TT脱口秀", time: "20:30", priceFrom: 68, status: "onSale" }
    ];
    // 随机分配到这个月的不同日期
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const eventDate = new Date(year, month - 1, day);
        // 只为今天及未来的日期生成演出数据
        if (eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            // 30% 的概率有演出
            if (Math.random() < 0.3) {
                // 随机选择1-2个演出
                const eventCount = Math.random() < 0.7 ? 1 : 2;
                const selectedEvents = [];
                for (let i = 0; i < eventCount; i++) {
                    const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
                    selectedEvents.push({
                        ...randomEvent,
                        id: `${randomEvent.id}_${date}_${i}`,
                        date: date
                    });
                }
                events[date] = selectedEvents;
            }
        }
    }
    return Promise.resolve(events);
}
