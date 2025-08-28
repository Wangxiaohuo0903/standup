import { theme, features, homeSchema, icon as iconSrc } from "../../utils/tenant";
import { getHome, HomePayload } from "../../api/index";

Page({
  data: {
    theme,
    features,
    sections: homeSchema.sections,
    homeData: {} as HomePayload,
    loading: true,
    empty: false
  },

  onLoad() {
    console.log("tenant theme:", theme);
    console.log("home schema sections:", homeSchema.sections);

    const sections = this.data.sections.map((s: any) => {
      if (s.type === "entryRow" && Array.isArray(s.items)) {
        s.items = s.items.map((it: any) => ({ ...it, iconSrc: iconSrc(it.icon) }));
      }
      return s;
    });
    this.setData({ sections });
    this.fetch();
  },

  onPullDownRefresh(){ this.fetch().finally(() => wx.stopPullDownRefresh()); },

  async fetch() {
    try {
      this.setData({ loading: true, empty: false });
      const data = await getHome();
      console.log("home data:", data);
      this.setData({ homeData: data, empty: !((data?.banners?.length||0) + (data?.upcoming?.length||0)) });
    } catch (e) {
      wx.showToast({ title: "加载失败", icon: "none" });
      this.setData({ empty: true });
    } finally {
      this.setData({ loading: false });
    }
  }
});
