import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StListLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;

  background-color: #f7f7f7;
  border-radius: 20px;
`;
const StSpanDiv = styled.div`
  span {
    font-size: 22px;
    font-weight: bolder;
  }
`;
const StDate = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  font-size: 15px;
`;
const StPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
`;

const CashItem = () => {
  const cashArray = useSelector((state) => state.cashbook.list);
  const clickMonth = useSelector((state) => state.cashbook.month);
  const filteredMonth = cashArray.filter((item) => {
    return clickMonth === item.month;
  });
  console.log(cashArray);
  return (
    <>
      {filteredMonth.map((item) => {
        return (
          <Link to={`/detail/${item.id}`} key={item.id}>
            <StListLi>
              <div>
                <StDate>{item.date}</StDate>
                <StSpanDiv>
                  <span>{item.category} - </span>
                  <span>{item.contents}</span>
                </StSpanDiv>
              </div>
              <StPrice> ✔️ {item.price}</StPrice>
            </StListLi>
          </Link>
        );
      })}
    </>
  );
};

export default CashItem;
