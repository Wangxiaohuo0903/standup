Component({
    properties: { banners: { type: Array, value: [] } },
    methods: {
        tap(e) {
            const link = e.currentTarget.dataset.link;
            if (!link)
                return;
            if (link.startsWith("/"))
                wx.navigateTo({ url: link });
            else
                wx.setClipboardData({ data: link });
        }
    }
});
export {};
