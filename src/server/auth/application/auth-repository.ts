import type { UserProfile } from "@/types/domain";
import type { AuthUser, RegisterUserInput } from "../domain/user";

export interface AuthRepository {
  createUser(input: RegisterUserInput, passwordHash: string): AuthUser;
  findUserByIdentity(
    identity: string,
  ): (AuthUser & { passwordHash: string }) | null;
  findUserBySessionToken(token: string): AuthUser | null;
  createSession(userId: string, expiresAt: string): string;
  deleteSession(token: string): void;
  updateUserProfile(userId: string, profile: UserProfile): AuthUser;
}
