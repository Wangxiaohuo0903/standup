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
// API 接口实现
export async function getEventDetail(eventId) {
    // 真实接口：return request<EventDetail>(`/events/${eventId}`);
    // mock：
    return Promise.resolve({
        id: eventId,
        title: "周五秀·DT深夜场",
        poster: "https://picsum.photos/600/400?event1",
        description: "每周五晚上的经典脱口秀演出，汇集了最优秀的脱口秀演员，为您带来欢声笑语。本场演出时长约90分钟，包含3-4位演员的精彩表演。",
        city: "北京",
        venue: "DownTown脱口秀俱乐部",
        address: "朝阳区三里屯太古里南区B1-020",
        date: "2024-12-25",
        time: "22:00",
        duration: 90,
        priceOptions: [
            { id: "p1", name: "前排座位", price: 158, originalPrice: 188, remainingCount: 15, description: "距离舞台最近，最佳观演体验" },
            { id: "p2", name: "中间座位", price: 128, remainingCount: 25, description: "视野开阔，性价比最高" },
            { id: "p3", name: "后排座位", price: 88, remainingCount: 30, description: "经济实惠，同样精彩" }
        ],
        status: "onSale",
        totalSeats: 80,
        remainingSeats: 70,
        performers: ["张三", "李四", "王五", "赵六"],
        tags: ["脱口秀", "周五场", "深夜场", "热门"]
    });
}
export async function createOrder(request) {
    // 真实接口：return request<Order>("/orders", { method: "POST", body: request });
    // mock：
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const eventDetail = await getEventDetail(request.eventId);
    const priceOption = eventDetail.priceOptions.find(p => p.id === request.priceOptionId);
    return Promise.resolve({
        id: orderId,
        eventId: request.eventId,
        eventTitle: eventDetail.title,
        eventDate: eventDetail.date,
        eventTime: eventDetail.time,
        venue: eventDetail.venue,
        priceOptionId: request.priceOptionId,
        priceOptionName: priceOption.name,
        quantity: request.quantity,
        totalAmount: priceOption.price * request.quantity,
        status: "pending",
        userId: "mock_user_id",
        userName: request.userInfo.name,
        userPhone: request.userInfo.phone,
        createdAt: new Date().toISOString(),
        tickets: Array.from({ length: request.quantity }, (_, i) => ({
            id: `ticket_${orderId}_${i}`,
            orderId: orderId,
            seatNo: `A${Math.floor(Math.random() * 50) + 1}`,
            qrCode: `qr_${orderId}_${i}`,
            status: "valid"
        }))
    });
}
export async function requestPayment(request) {
    // 真实接口：return request<PaymentResult>("/payments", { method: "POST", body: request });
    // mock：模拟支付流程
    return new Promise((resolve) => {
        setTimeout(() => {
            // 90% 成功率模拟
            const success = Math.random() > 0.1;
            resolve({
                success,
                orderId: request.orderId,
                transactionId: success ? `tx_${Date.now()}` : undefined,
                message: success ? "支付成功" : "支付失败，请重试"
            });
        }, 2000);
    });
}
export async function getOrder(orderId) {
    // 真实接口：return request<Order>(`/orders/${orderId}`);
    // mock：根据订单ID返回订单详情
    return Promise.resolve({
        id: orderId,
        eventId: "event_123",
        eventTitle: "周五秀·DT深夜场",
        eventDate: "2024-12-25",
        eventTime: "22:00",
        venue: "DownTown脱口秀俱乐部",
        priceOptionId: "p2",
        priceOptionName: "中间座位",
        quantity: 2,
        totalAmount: 256,
        status: "paid",
        userId: "mock_user_id",
        userName: "张三",
        userPhone: "13800138000",
        createdAt: "2024-08-28T10:00:00Z",
        paidAt: "2024-08-28T10:05:00Z",
        tickets: [
            { id: "ticket_1", orderId, seatNo: "A15", qrCode: "qr_123_1", status: "valid" },
            { id: "ticket_2", orderId, seatNo: "A16", qrCode: "qr_123_2", status: "valid" }
        ]
    });
}
export async function getUserOrders(userId) {
    // 真实接口：return request<Order[]>(`/users/${userId}/orders`);
    // mock：返回用户订单列表
    return Promise.resolve([
        {
            id: "order_1",
            eventId: "event_123",
            eventTitle: "周五秀·DT深夜场",
            eventDate: "2024-12-25",
            eventTime: "22:00",
            venue: "DownTown脱口秀俱乐部",
            priceOptionId: "p2",
            priceOptionName: "中间座位",
            quantity: 2,
            totalAmount: 256,
            status: "paid",
            userId,
            userName: "张三",
            userPhone: "13800138000",
            createdAt: "2024-08-28T10:00:00Z",
            paidAt: "2024-08-28T10:05:00Z",
            tickets: []
        }
    ]);
}
