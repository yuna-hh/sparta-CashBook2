import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();
const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userInfo, setUserInfo] = useState(null);
  const login = async (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    await fetchUserInfo(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  ////

  const fetchUserInfo = async (accessToken) => {
    const { data } = await axios.get(
      "https://moneyfulpublicpolicy.co.kr/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setUserInfo(data);
  };

  useEffect(() => {
    if (token) {
      fetchUserInfo(token); // 컴포넌트 마운트 시 사용자 정보 가져오기
    }
  }, []);

  // useEffect(() => {
  //   const getUserInfo = async (accessToken) => {
  //     const { data } = await axios.get(
  //       "https://moneyfulpublicpolicy.co.kr/user",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     setUserInfo(data);
  //   };
  //   getUserInfo();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userInfo, fetchUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
