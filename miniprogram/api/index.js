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
