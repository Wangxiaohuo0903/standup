import { icon as iconPath } from "../../../utils/tenant";
Component({
    properties: { items: { type: Array, value: [] } },
    lifetimes: {
        attached() {
            const items = (this.data.items || []).map((it) => ({ ...it, iconSrc: it.iconSrc || iconPath(it.icon) }));
            this.setData({ items });
        }
    },
    methods: { go(e) { wx.navigateTo({ url: e.currentTarget.dataset.link }); } }
});
