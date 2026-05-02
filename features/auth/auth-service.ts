import { api, setAccessToken, clearAccessToken } from "@/lib/http";

/* ------------------------------------------------------------------ */
/*  Types (mirrored from server)                                       */
/* ------------------------------------------------------------------ */

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  role: string;
  avatarUrl?: string;
  oauthProvider?: string;
  oauthAvatarUrl?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  fullName?: string;
}

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */

export interface AuthToken {
  token: string;
  expiresAt: Date;
}

export const authService = {
  login: async (
    dto: LoginDto,
  ): Promise<{ accessToken: AuthToken; user: User }> => {
    const result = await api.post<{ accessToken: AuthToken; user: User }>(
      "/auth/login",
      dto,
    );
    setAccessToken(result.accessToken);
    return result;
  },

  register: async (dto: RegisterDto): Promise<void> => {
    await api.post<void>("/auth/register", dto);
  },

  logout: async (): Promise<void> => {
    try {
      await api.post<void>("/auth/logout");
    } finally {
      clearAccessToken();
    }
  },

  getMe: async (): Promise<User> => {
    const result = await api.get<{ user: User }>("/auth/me");
    return result.user;
  },

  updateProfile: async (dto: UpdateProfileDto): Promise<User> => {
    const result = await api.put<{ user: User }>("/auth/me", dto);
    return result.user;
  },

  refreshToken: async (): Promise<AuthToken> => {
    const result = await api.post<{ accessToken: AuthToken }>(
      "/auth/refresh-token",
    );
    setAccessToken(result.accessToken);
    return result.accessToken;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await api.get<void>(`/auth/verify?token=${encodeURIComponent(token)}`);
  },
};
