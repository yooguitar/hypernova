import { useState, useEffect, createContext } from "react";

// 전역에서 사용(공유)할 객체를 만들어 주자
export const AuthContext = createContext();

// Provider는 Context를 전달해주는 역할
export const AuthProvider = ({ children }) => {
  // session.setAttribute("auth", 객체); 비슷한 느낌? get으로 값을 뽑아서 사용하면 된다
  const [auth, setAuth] = useState({
    username: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    if (accessToken && refreshToken && username) {
      setAuth({
        username,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username, accessToken, refreshToken) => {
    setAuth({
      username,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth({
      username: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
