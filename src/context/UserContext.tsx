import { createContext, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/types";
import useAxiosInstance from "../hooks/useAxiosInstance";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  refreshToken: () => Promise<string | null>;
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

  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, user?.token]);

  function login(userData: User) {
    setUser(userData);
    navigate("/");
  }

  async function refreshToken() {
    if (!user) {
      return;
    }

    const response = await axiosInstance.get("/refresh-token");
    const { token: newToken } = response.data;

    if (newToken) {
      const newUser: User = { ...user, token: newToken };

      setUser(newUser);
      return newToken;
    }

    return null;
  }

  function logout() {
    setUser(null);
    navigate("/login");
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, login, refreshToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
