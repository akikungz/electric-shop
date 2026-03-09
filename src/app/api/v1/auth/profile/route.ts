import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { fail, ok } from "@/server/shared/http";
import type { UserProfile } from "@/types/domain";

export const runtime = "nodejs";

function isUserProfile(body: unknown): body is UserProfile {
  if (!body || typeof body !== "object") {
    return false;
  }

  const payload = body as Record<string, unknown>;
  const address = payload.address as Record<string, unknown> | undefined;

  return (
    typeof payload.name === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.email === "string" &&
    Array.isArray(payload.paymentMethods) &&
    !!address &&
    typeof address.line1 === "string" &&
    typeof address.district === "string" &&
    typeof address.province === "string" &&
    typeof address.postalCode === "string"
  );
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as unknown;
  if (!isUserProfile(body)) {
    return fail("Invalid request body", 400);
  }

  try {
    const token = getSessionTokenFromRequest(request);
    const service = new AuthService(new SqliteAuthRepository());
    const user = service.updateCurrentProfile(token, body);
    return ok(user);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cannot update profile";
    const status = message === "Unauthorized" ? 401 : 400;
    return fail(message, status);
  }
}
