export const BASE_URL = ""; // 先留空=走mock；接后端后填合法域名

export function request<T>(url: string, options: Partial<WechatMiniprogram.RequestOption> = {}): Promise<T> {
  if (!BASE_URL) return Promise.reject(new Error("NO_BASE_URL"));
  return new Promise((resolve, reject) => {
    wx.request({
      url: url.startsWith("http") ? url : BASE_URL + url,
      method: options.method || "GET",
      data: options.data || {},
      header: { "Content-Type": "application/json", ...(options.header || {}) },
      success: (res) => (res.statusCode >= 200 && res.statusCode < 300 ? resolve(res.data as T) : reject(res.data)),
      fail: reject
    });
  });
}
