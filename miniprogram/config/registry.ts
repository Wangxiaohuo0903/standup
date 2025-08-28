import type { TenantConfig } from "../types/config";

// dt
import dtTheme from "./tenants/dt/theme";
import dtCopy from "./tenants/dt/copy";
import dtFeatures from "./tenants/dt/features";
import dtHome from "./tenants/dt/home.schema";

// xclub
import xcTheme from "./tenants/xclub/theme";
import xcCopy from "./tenants/xclub/copy";
import xcFeatures from "./tenants/xclub/features";
import xcHome from "./tenants/xclub/home.schema";

export const Tenants: Record<string, TenantConfig> = {
  dt: { id: "dt", theme: dtTheme, copy: dtCopy, features: dtFeatures, homeSchema: dtHome },
  xclub: { id: "xclub", theme: xcTheme, copy: xcCopy, features: xcFeatures, homeSchema: xcHome }
};
