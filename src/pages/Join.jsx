import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  height: 600px;
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
  height: 500px;
  padding: 10px 0;
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

  span {
    font-weight: bolder;
    font-size: 30px;
    letter-spacing: 5px;
    color: #282828;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  margin-top: 15px;

  button:nth-child(1) {
    width: 400px;
    padding: 12px 8px;
    border-radius: 10px;
    border: none;
    background-color: #ecfc7c;
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
    width: 400px;
    padding: 12px 8px;
    border-radius: 10px;
    border: none;
    background-color: #fff08c;
    cursor: pointer;
  }
`;

const Join = () => {
  const [joinId, setJoinId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [joinNickName, setJoinNickName] = useState("");
  const navigate = useNavigate();
  const joinFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: joinId,
          password: joinPassword,
          nickname: joinNickName,
        }
      );
      const data = response.data;
      if (data.success) {
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      alert("Login failed");
      console.log(error);
    }
  };

  const joinIdHandler = (e) => {
    setJoinId(e.target.value);
  };

  const joinPasswordHandler = (e) => {
    setJoinPassword(e.target.value);
  };

  const joinNickNameHandler = (e) => {
    setJoinNickName(e.target.value);
  };
  return (
    <>
      <Stwrap>
        <StLoginContainer>
          <StLoginbox onSubmit={joinFormHandler}>
            <span>JOIN</span>
            <input
              value={joinId}
              onChange={joinIdHandler}
              type="text"
              placeholder="ID"
              pattern="^[A-Za-z0-9].{3,9}$"
              title="4자 이상 10자 이내로 입력하세요(영어, 숫자)"
              required
            />
            <input
              value={joinPassword}
              onChange={joinPasswordHandler}
              type="password"
              placeholder="PASSWORD"
              pattern="^[A-Za-z0-9].{3,14}$"
              title="4자 이상 15자 이내로 입력하세요(영어, 숫자)"
              required
            />
            <input
              value={joinNickName}
              onChange={joinNickNameHandler}
              type="text"
              placeholder="NICKNAME"
              pattern="^[가-힣a-zA-Z0-9\s]{1,10}$"
              title="1자 이상 10자 이내로 입력하세요"
              required
            />
            <StBtnBox>
              <Link to={"/login"}>
                <button type="button">로그인 하기</button>
              </Link>
              <StJoin>
                <button type="submit">가입하기</button>
              </StJoin>
            </StBtnBox>
          </StLoginbox>
        </StLoginContainer>
      </Stwrap>
    </>
  );
};

export default Join;
