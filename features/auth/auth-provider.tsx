"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  authService,
  User,
  LoginDto,
  RegisterDto,
  UpdateProfileDto,
} from "./auth-service";

/* ------------------------------------------------------------------ */
/*  Context & Types                                                    */
/* ------------------------------------------------------------------ */

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (dto: UpdateProfileDto) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  /* ---- restore session on mount ---------------------------------- */
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const me = await authService.getMe();
        if (!cancelled) setUser(me);
      } catch {
        // 401 is expected when not logged in
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- actions ---------------------------------------------------- */
  const login = async (dto: LoginDto) => {
    const { user: u } = await authService.login(dto);
    setUser(u);
  };

  const register = async (dto: RegisterDto) => {
    await authService.register(dto);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (dto: UpdateProfileDto) => {
    const u = await authService.updateProfile(dto);
    setUser(u);
  };

  const verifyEmail = async (token: string) => {
    await authService.verifyEmail(token);
  };

  const refetchUser = async () => {
    const u = await authService.getMe();
    setUser(u);
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    verifyEmail,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
