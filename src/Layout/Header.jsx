import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
const StHeader = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 0px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  h1 {
    margin-left: 50px;
    letter-spacing: 1px;
  }
`;
const StBtn = styled.div`
  margin-left: auto;

  button {
    width: 150px;
    margin-right: 50px;
    padding: 15px 0;
    border: none;
    border-radius: 10px;
    background-color: #fff08c;
    letter-spacing: 3px;
    color: #101010;
    cursor: pointer;
  }
`;

const StUserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 40px;

  button {
    padding: 8px 10px;
    border: none;
    color: #101010;
    background-color: #ecfc7c;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    cursor: pointer;
  }
`;
const Stprofile = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`;

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const accessToken = localStorage.getItem("accessToken");

  const getUserInfo = async (accessToken) => {
    const { data } = await axios.get(
      "https://moneyfulpublicpolicy.co.kr/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  };

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(accessToken),
  });
  console.log(userInfo);
  return (
    <StHeader>
      <Link to={"/"}>
        <h1>CASHBOOK 📘</h1>
      </Link>
      {isAuthenticated ? (
        <StUserBox>
          <Stprofile>
            <Link to={"/mypage"}>
              <img src={userInfo?.avatar} />
            </Link>
          </Stprofile>
          <span>{userInfo?.nickname}</span>
          <button onClick={() => logout()}>로그아웃</button>
        </StUserBox>
      ) : (
        <StBtn>
          <Link to={"/login"}>
            <button> 로그인 / 회원가입 </button>
          </Link>
        </StBtn>
      )}
      {/* <StBtn>
        <Link to={"/login"}>
          <button>로그인</button>
        </Link>
      </StBtn>
      <StUserBox>
        <Stprofile>
          <Link to={"/mypage"}>
            <img src="/default-user-profile.png" />
          </Link>
        </Stprofile>
        <span>userId</span>
        <button>로그아웃</button>
      </StUserBox> */}
    </StHeader>
  );
  // return null;
};

export default Header;
