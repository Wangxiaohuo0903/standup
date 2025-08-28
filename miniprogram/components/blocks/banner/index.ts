import type { Banner } from "../../../api/index";
Component({
  properties: { banners: { type: Array as unknown as ArrayConstructor, value: [] as Banner[] }},
  methods: {
    tap(e: WechatMiniprogram.TouchEvent) {
      const link = e.currentTarget.dataset.link as string | undefined;
      if (!link) return;
      if (link.startsWith("/")) wx.navigateTo({ url: link });
      else wx.setClipboardData({ data: link });
    }
  }
});
