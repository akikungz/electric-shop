import { randomUUID } from "node:crypto";
import { AuthService } from "@/server/auth/application/auth-service";
import { getDb } from "@/server/shared/sqlite";
import type { UserProfile } from "@/types/domain";
import type { AuthRepository } from "../application/auth-repository";
import type { AuthUser, RegisterUserInput } from "../domain/user";

interface UserRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  address: string;
  paymentMethods: string;
  createdAt: string;
}

export class SqliteAuthRepository implements AuthRepository {
  private readonly db = getDb();

  private mapUser(row: UserRow): AuthUser & { passwordHash: string } {
    const parsedAddress = JSON.parse(row.address) as UserProfile["address"];
    const parsedPaymentMethods = JSON.parse(
      row.paymentMethods,
    ) as UserProfile["paymentMethods"];

    return {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      passwordHash: row.passwordHash,
      address: parsedAddress,
      paymentMethods: parsedPaymentMethods,
      createdAt: row.createdAt,
    };
  }

  createUser(input: RegisterUserInput, passwordHash: string): AuthUser {
    const id = `USR-${randomUUID()}`;
    const createdAt = new Date().toISOString();
    const profile = AuthService.createDefaultProfile(input);

    this.db
      .prepare(
        `INSERT INTO users (id, name, phone, email, password_hash, address, payment_methods, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        id,
        input.name,
        input.phone,
        input.email,
        passwordHash,
        JSON.stringify(profile.address),
        JSON.stringify(profile.paymentMethods),
        createdAt,
      );

    return {
      id,
      name: input.name,
      phone: input.phone,
      email: input.email,
      address: profile.address,
      paymentMethods: profile.paymentMethods,
      createdAt,
    };
  }

  findUserByIdentity(
    identity: string,
  ): (AuthUser & { passwordHash: string }) | null {
    const normalized = identity.trim().toLowerCase();
    const row = this.db
      .prepare(
        `SELECT id, name, phone, email, password_hash as passwordHash, address, payment_methods as paymentMethods, created_at as createdAt
         FROM users
         WHERE lower(email) = ? OR phone = ?
         LIMIT 1`,
      )
      .get(normalized, identity) as UserRow | undefined;

    if (!row) {
      return null;
    }

    return this.mapUser(row);
  }

  findUserBySessionToken(token: string): AuthUser | null {
    const now = new Date().toISOString();

    const row = this.db
      .prepare(
        `SELECT u.id, u.name, u.phone, u.email, u.password_hash as passwordHash, u.address, u.payment_methods as paymentMethods, u.created_at as createdAt
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         WHERE s.id = ? AND s.expires_at > ?
         LIMIT 1`,
      )
      .get(token, now) as UserRow | undefined;

    if (!row) {
      return null;
    }

    const user = this.mapUser(row);
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      paymentMethods: user.paymentMethods,
      createdAt: user.createdAt,
    };
  }

  createSession(userId: string, expiresAt: string): string {
    const token = `SES-${randomUUID()}`;
    const createdAt = new Date().toISOString();

    this.db
      .prepare(
        `INSERT INTO sessions (id, user_id, expires_at, created_at)
         VALUES (?, ?, ?, ?)`,
      )
      .run(token, userId, expiresAt, createdAt);

    return token;
  }

  deleteSession(token: string): void {
    this.db.prepare("DELETE FROM sessions WHERE id = ?").run(token);
  }

  updateUserProfile(userId: string, profile: UserProfile): AuthUser {
    this.db
      .prepare(
        `UPDATE users
         SET name = ?, phone = ?, email = ?, address = ?, payment_methods = ?
         WHERE id = ?`,
      )
      .run(
        profile.name,
        profile.phone,
        profile.email,
        JSON.stringify(profile.address),
        JSON.stringify(profile.paymentMethods),
        userId,
      );

    const row = this.db
      .prepare(
        `SELECT id, name, phone, email, password_hash as passwordHash, address, payment_methods as paymentMethods, created_at as createdAt
         FROM users
         WHERE id = ?`,
      )
      .get(userId) as UserRow | undefined;

    if (!row) {
      throw new Error("User not found");
    }

    const user = this.mapUser(row);

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      paymentMethods: user.paymentMethods,
      createdAt: user.createdAt,
    };
  }
}
