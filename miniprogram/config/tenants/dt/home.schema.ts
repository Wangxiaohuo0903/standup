import type { HomeSchema } from "../../../types/config";

    const schema: HomeSchema = {
      sections: [
        { type: "banner", dataSource: "home.banners" },
        {
          type: "entryRow",
          items: [
            { icon: "activity", text: "活动", link: "/pages/list/list?category=activity" },
            { icon: "special", text: "专场", link: "/pages/list/list?category=special" },
            { icon: "pin", text: "拼盘", link: "/pages/list/list?category=pin" }
          ]
        },
        { type: "hscrollEvents", title: "即将开售", dataKey: "upcoming" },
        { type: "hscrollMerch", title: "在现场 · 周边", dataKey: "merch" }
      ]
    };
    export default schema;
    