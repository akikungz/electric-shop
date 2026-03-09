import { AuthService } from "@/server/auth/application/auth-service";
import { setSessionCookie } from "@/server/auth/cookie";
import type { RegisterUserInput } from "@/server/auth/domain/user";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

function isRegisterInput(body: unknown): body is RegisterUserInput {
  if (!body || typeof body !== "object") {
    return false;
  }

  const payload = body as Record<string, unknown>;

  return (
    typeof payload.name === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.email === "string" &&
    typeof payload.password === "string"
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;

  if (!isRegisterInput(body)) {
    return fail("Invalid request body", 400);
  }

  try {
    const service = new AuthService(new SqliteAuthRepository());
    const { user, token } = service.register(body);
    const response = ok(user, 201);
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cannot register account";
    return fail(message, 400);
  }
}
