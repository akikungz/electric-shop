import { ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET() {
  return ok({
    service: "electric-shop-api",
    status: "ok",
    time: new Date().toISOString(),
  });
}
