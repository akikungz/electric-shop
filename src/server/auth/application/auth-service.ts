import type { UserProfile } from "@/types/domain";
import type { LoginInput, RegisterUserInput } from "../domain/user";
import type { AuthRepository } from "./auth-repository";
import { hashPassword, verifyPassword } from "./password";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const defaultAddress: UserProfile["address"] = {
  line1: "",
  district: "",
  province: "",
  postalCode: "",
};

const defaultPaymentMethods: UserProfile["paymentMethods"] = [
  "credit-card",
  "qr-code",
  "cod",
];

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  register(input: RegisterUserInput) {
    if (!input.name.trim() || !input.phone.trim() || !input.email.trim()) {
      throw new Error("Name, phone, and email are required.");
    }

    if (input.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const normalizedEmail = input.email.trim().toLowerCase();
    const normalizedPhone = input.phone.trim();

    if (this.repository.findUserByIdentity(normalizedEmail)) {
      throw new Error("Email is already registered.");
    }

    if (this.repository.findUserByIdentity(normalizedPhone)) {
      throw new Error("Phone is already registered.");
    }

    const passwordHash = hashPassword(input.password);
    const user = this.repository.createUser(
      {
        ...input,
        email: normalizedEmail,
        phone: normalizedPhone,
      },
      passwordHash,
    );

    const token = this.repository.createSession(
      user.id,
      new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    );

    return { user, token };
  }

  login(input: LoginInput) {
    const identity = input.identity.trim().toLowerCase();
    const account = this.repository.findUserByIdentity(identity);

    if (!account || !verifyPassword(input.password, account.passwordHash)) {
      throw new Error("Invalid credentials.");
    }

    const token = this.repository.createSession(
      account.id,
      new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    );

    return {
      token,
      user: {
        id: account.id,
        name: account.name,
        phone: account.phone,
        email: account.email,
        address: account.address,
        paymentMethods: account.paymentMethods,
        createdAt: account.createdAt,
      },
    };
  }

  getCurrentUser(sessionToken: string | null) {
    if (!sessionToken) {
      return null;
    }

    return this.repository.findUserBySessionToken(sessionToken);
  }

  updateCurrentProfile(sessionToken: string | null, profile: UserProfile) {
    const user = this.getCurrentUser(sessionToken);
    if (!user) {
      throw new Error("Unauthorized");
    }

    return this.repository.updateUserProfile(user.id, {
      name: profile.name.trim(),
      phone: profile.phone.trim(),
      email: profile.email.trim().toLowerCase(),
      address: {
        line1: profile.address.line1.trim(),
        district: profile.address.district.trim(),
        province: profile.address.province.trim(),
        postalCode: profile.address.postalCode.trim(),
      },
      paymentMethods:
        profile.paymentMethods.length > 0
          ? profile.paymentMethods
          : defaultPaymentMethods,
    });
  }

  logout(sessionToken: string | null) {
    if (!sessionToken) {
      return;
    }
    this.repository.deleteSession(sessionToken);
  }

  static createDefaultProfile(user: {
    name: string;
    phone: string;
    email: string;
  }): UserProfile {
    return {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: defaultAddress,
      paymentMethods: defaultPaymentMethods,
    };
  }
}
