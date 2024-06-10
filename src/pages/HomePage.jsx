import React from "react";
import styled from "styled-components";
import CashList from "../components/CashList";
import Monthly from "../components/Monthly";
import CashInput from "../components/CashInput";
import { Link } from "react-router-dom";

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1200px;
  background-color: #fff08c;
  margin: 0 auto;
  padding-bottom: 30px;
  box-sizing: border-box;
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
    background-color: #f3fcff;
    letter-spacing: 3px;
    cursor: pointer;
  }
`;
const HomePage = () => {
  return (
    <>
      <StLayout>
        <StBtn>
          <Link to={"/login"}>
            <button>로그인</button>
          </Link>
        </StBtn>

        <CashInput />
        <Monthly />
        <CashList />
      </StLayout>
    </>
  );
};
export default HomePage;
