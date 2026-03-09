import { AuthService } from "@/server/auth/application/auth-service";
import {
  clearSessionCookie,
  getSessionTokenFromRequest,
} from "@/server/auth/cookie";
import { SqliteAuthRepository } from "@/server/auth/infrastructure/sqlite-auth-repository";
import { ok } from "@/server/shared/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const service = new AuthService(new SqliteAuthRepository());
  const token = getSessionTokenFromRequest(request);
  service.logout(token);

  const response = ok({ loggedOut: true });
  clearSessionCookie(response);
  return response;
}
