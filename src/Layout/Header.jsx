import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

  h1 {
    margin-left: 50px;
  }
`;
const StBtn = styled.div`
  margin-top: 20px;
  margin-left: auto;

  button {
    width: 90px;
    margin-right: 50px;
    padding: 8px 0;
    border: none;
    border-radius: 10px;
    background-color: #fff08c;
    letter-spacing: 3px;
    cursor: pointer;
  }
`;
const Header = () => {
  return (
    <StHeader>
      <Link to={"/"}>
        <h1>CASHBOOK 📘</h1>
      </Link>
      <StBtn>
        <Link to={"/login"}>
          <button>로그인</button>
        </Link>
      </StBtn>
    </StHeader>
  );
  // return null;
};

export default Header;
