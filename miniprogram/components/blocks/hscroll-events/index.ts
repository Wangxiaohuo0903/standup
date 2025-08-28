import type { EventCard } from "../../../api/index";

Component({
  properties: {
    title: { type: String as unknown as StringConstructor, value: "" },
    items: { type: Array as unknown as ArrayConstructor, value: [] as EventCard[] }
  },
  methods: {
    open(e: WechatMiniprogram.TouchEvent) {
      const id = (e.currentTarget.dataset.id as string) || "";
      if (id) wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
    },
    more() {
      wx.navigateTo({ url: "/pages/list/list" });
    }
  }
});
