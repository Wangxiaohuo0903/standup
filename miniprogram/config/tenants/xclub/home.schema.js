const schema = {
    sections: [
        { type: "banner", dataSource: "home.banners" },
        {
            type: "entryRow",
            items: [
                { icon: "activity", text: "活动", link: "/pages/list/list?category=activity" },
                { icon: "special", text: "专场", link: "/pages/list/list?category=special" }
            ]
        },
        { type: "hscrollEvents", title: "为你推荐", dataKey: "recommended" },
        { type: "hscrollEvents", title: "即将开票", dataKey: "upcomingSale" }
    ]
};
export default schema;
