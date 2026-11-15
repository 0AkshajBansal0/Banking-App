import { useState } from "react";
import { AuthContext } from "./AuthContextValue";
import api from "../services/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = async (username, password) => {
    await api.post("/auth/login", { username, password });
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username }));
  };

  const signup = async (username, password) => {
    await api.post("/auth/signup", { username, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
