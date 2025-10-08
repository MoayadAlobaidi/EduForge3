import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE! // server-only env
);

export async function audit(action: string, details: any = {}, level: "INFO"|"WARN"|"ERROR"="INFO", actor?: string|null, entity?: string|null) {
  await supabase.from("audit_logs").insert({ action, level, details, actor: actor ?? null, entity: entity ?? null });
}
