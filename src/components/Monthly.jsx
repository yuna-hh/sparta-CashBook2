import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { setMonth } from "../store/slices/cashBookSlice";

const StBtnBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  width: 1100px;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
`;
const StBtn = styled.button`
  padding: 25px 0;
  border: transparent;
  background-color: ${(props) => (props.$active ? "	#CEED0A" : "#ecfc7c")};
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
`;

const Monthly = () => {
  const dispatch = useDispatch();
  const clickMonth = useSelector((state) => state.cashbook.month);
  const monthClickHandler = (num) => {
    dispatch(setMonth(num));
    localStorage.setItem("month", num);
  };
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <StBtnBox>
      {month.map((num) => (
        <StBtn
          onClick={() => {
            monthClickHandler(num);
          }}
          key={num}
          $active={num === clickMonth}
        >
          {num}
        </StBtn>
      ))}
    </StBtnBox>
  );
};

export default Monthly;
