import { icon as iconPath } from "../../../utils/tenant";
type Item = { icon: string; iconSrc?: string; text: string; link: string };
Component({
  properties: { items: { type: Array as unknown as ArrayConstructor, value: [] as Item[] } },
  lifetimes: {
    attached() {
      const items = (this.data.items || []).map((it: Item) => ({ ...it, iconSrc: it.iconSrc || iconPath(it.icon) }));
      this.setData({ items });
    }
  },
  methods: { go(e: any) { wx.navigateTo({ url: e.currentTarget.dataset.link }); } }
});
