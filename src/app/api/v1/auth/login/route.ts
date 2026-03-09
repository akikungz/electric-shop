import { AuthService } from "@/server/auth/application/auth-service";
import { setSessionCookie } from "@/server/auth/cookie";
import type { LoginInput } from "@/server/auth/domain/user";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

function isLoginInput(body: unknown): body is LoginInput {
  if (!body || typeof body !== "object") {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    typeof payload.identity === "string" && typeof payload.password === "string"
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;

  if (!isLoginInput(body)) {
    return fail("Invalid request body", 400);
  }

  try {
    const service = new AuthService(new SqliteAuthRepository());
    const { user, token } = service.login(body);
    const response = ok(user);
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cannot login";
    return fail(message, 401);
  }
}
