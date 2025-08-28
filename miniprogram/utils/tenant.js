import { Tenants } from "../config/registry";
import env from "../env/tenant";
const fallbackId = "dt";
const tenantId = env?.id || fallbackId;
const tenant = (Tenants[tenantId] || Tenants[fallbackId]);
export const currentTenantId = tenant.id;
export const theme = tenant.theme;
export const copy = tenant.copy;
export const features = tenant.features;
export const homeSchema = tenant.homeSchema;
export function icon(name) {
    return theme.icons?.[name] || "";
}
