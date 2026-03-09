import type { UserProfile } from "@/types/domain";

export interface AuthUser extends UserProfile {
  id: string;
  createdAt: string;
}

export interface RegisterUserInput {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginInput {
  identity: string;
  password: string;
}
