import { createContext, useEffect, useState } from "react";
import { User } from "../types/types";

interface UserContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  function login(userData: User) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
