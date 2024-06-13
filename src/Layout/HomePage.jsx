import React from "react";
import styled from "styled-components";
import CashList from "../components/CashList";
import Monthly from "../components/Monthly";
import CashInput from "../components/CashInput";

const StWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1200px;
  background-color: #fff08c;
  margin-top: 300px;
  padding: 30px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const HomePage = () => {
  return (
    <>
      <StWrap>
        <StLayout>
          <CashInput />
          <Monthly />
          <CashList />
        </StLayout>
      </StWrap>
    </>
  );
};
export default HomePage;
