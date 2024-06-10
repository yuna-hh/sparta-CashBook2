import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <>
      <Stwrap>
        <StLoginContainer>
          <StLoginbox>
            <input type="text" placeholder="ID" />
            <input type="text" placeholder="PASSWORD" />
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