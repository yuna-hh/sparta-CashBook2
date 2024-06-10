import React from "react";
import styled from "styled-components";
import CashList from "../components/CashList";
import Monthly from "../components/Monthly";
import CashInput from "../components/CashInput";

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 1200px;
  background-color: #fff08c;
  margin: 0 auto;
  padding: 30px 0;
  box-sizing: border-box;
`;
const HomePage = () => {
  return (
    <>
      <StLayout>
        <CashInput />
        <Monthly />
        <CashList />
      </StLayout>
    </>
  );
};
export default HomePage;
