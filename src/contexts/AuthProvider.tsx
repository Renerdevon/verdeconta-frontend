import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const token = localStorage.getItem("@verdeconta:token");

      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const response = await api.get("/me");
        if (isMounted) setUser(response.data);
      } catch {
        localStorage.removeItem("@verdeconta:token");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@verdeconta:token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    localStorage.removeItem("@verdeconta:token");
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-moss-600 font-semibold">
          A carregar VerdeConta 🌿
        </span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
