import type { MerchCard } from "../../../api/index";

Component({
  properties: {
    title: { type: String as unknown as StringConstructor, value: "" },
    items: { type: Array as unknown as ArrayConstructor, value: [] as MerchCard[] }
  }
});
