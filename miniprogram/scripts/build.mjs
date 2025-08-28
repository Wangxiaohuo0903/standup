import fs from "node:fs";
import path from "node:path";

const arg = process.argv.find(a => a.startsWith("--tenant="));
const tenant = arg ? arg.split("=")[1] : "dt";

const envDir = path.join(process.cwd(), "env");
fs.mkdirSync(envDir, { recursive: true });

const ts = `const env = { id: "${tenant}" } as const;
export default env;`;
fs.writeFileSync(path.join(envDir, "tenant.ts"), ts, "utf-8");

console.log(`[build] tenant set to: ${tenant} -> env/tenant.ts`);
