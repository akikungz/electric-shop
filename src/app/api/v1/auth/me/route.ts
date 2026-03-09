import { AuthService } from "@/server/auth/application/auth-service";
import { getSessionTokenFromRequest } from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { fail, ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const service = new AuthService(new SqliteAuthRepository());
  const token = getSessionTokenFromRequest(request);
  const user = service.getCurrentUser(token);

  if (!user) {
    return fail("Unauthorized", 401);
  }

  return ok(user);
}
