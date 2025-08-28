import type { TenantConfig } from "../types/config";
import { Tenants } from "../config/registry";
import env from "../env/tenant";

const fallbackId = "dt";
const tenantId = (env?.id as string) || fallbackId;
const tenant = (Tenants[tenantId] || Tenants[fallbackId]) as TenantConfig;

export const currentTenantId = tenant.id;
export const theme = tenant.theme;
export const copy = tenant.copy;
export const features = tenant.features;
export const homeSchema = tenant.homeSchema;

export function icon(name: string): string {
  return theme.icons?.[name] || "";
}
