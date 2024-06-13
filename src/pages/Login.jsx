import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Stwrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  background-color: #fff08c;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const StLoginbox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 520px;
  height: 320px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  input {
    width: 420px;
    padding: 18px 20px;
    border: none;
    border-radius: 20px;
    background-color: #f2f2f2;
    box-sizing: border-box;
    font-size: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  margin-top: 15px;

  button:nth-child(1) {
    width: 180px;
    padding: 12px 8px;
    border-radius: 10px;
    border: none;
    background-color: #fff08c;
    font-size: 15px;
    letter-spacing: 3px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    cursor: pointer;
  }
`;

const StJoin = styled.div`
  font-size: 15px;
  letter-spacing: 3px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  button:nth-child(1) {
    width: 180px;
    padding: 12px 8px;
    border-radius: 10px;
    border: none;
    background-color: #ecfc7c;
    cursor: pointer;
  }
`;

const Login = () => {
  const [inputId, setInputID] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const LoginFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id: inputId,
          password: inputPassword,
        }
      );
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        navigate("/mypage");
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Login failed");
    }
  };
  const inputIdHandler = (e) => {
    setInputID(e.target.value);
  };
  const inputPasswordHandler = (e) => {
    setInputPassword(e.target.value);
  };
  return (
    <>
      <Stwrap>
        <StLoginContainer>
          <StLoginbox onSubmit={LoginFormHandler}>
            <input
              onChange={inputIdHandler}
              value={inputId}
              type="text"
              placeholder="ID"
              pattern="^[A-Za-z0-9].{3,9}$"
              // 점검하기 글자 수 제한 부분 이상해ㅐㅐㅐ
              title="4자 이상 10자 이내 영어, 숫자로 입력하세요"
              required
            />
            <input
              onChange={inputPasswordHandler}
              value={inputPassword}
              type="password"
              placeholder="PASSWORD"
              pattern="^[A-Za-z0-9].{3,14}$"
              title="4자 이상 15자 이내 영어, 숫자로 입력하세요"
              required
            />
            <StBtnBox>
              <button>로그인 하기</button>
              <StJoin>
                <Link to={"/join"}>
                  <button type="button">회원가입</button>
                </Link>
              </StJoin>
            </StBtnBox>
          </StLoginbox>
        </StLoginContainer>
      </Stwrap>
    </>
  );
};

export default Login;
