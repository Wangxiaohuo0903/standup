Component({
    properties: {
        title: { type: String, value: "" },
        items: { type: Array, value: [] }
    },
    methods: {
        open(e) {
            const id = e.currentTarget.dataset.id || "";
            if (id)
                wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
        },
        more() {
            wx.navigateTo({ url: "/pages/list/list" });
        }
    }
});
export {};
