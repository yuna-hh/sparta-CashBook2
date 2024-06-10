import React from "react";
import CashItem from "./CashItem";
import styled from "styled-components";

const StListUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 0 auto;
  padding: 40px 50px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  gap: 20px;
`;
const CashList = () => {
  return (
    <StListUl>
      <CashItem />
    </StListUl>
  );
};

export default CashList;
