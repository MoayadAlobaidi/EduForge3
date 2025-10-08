import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function audit(
  action: string,
  details: any = {},
  level: "INFO"|"WARN"|"ERROR" = "INFO",
  actor?: string|null,
  entity?: string|null
) {
  try {
    await prisma.audit_logs.create({
      data: { action, level, details: details as Prisma.JsonObject, actor, entity } as any
    });
  } catch (e) {
    console.error("audit insert error", e);
  }
}
