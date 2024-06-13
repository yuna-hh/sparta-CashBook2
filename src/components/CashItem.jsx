import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getExpenseByMonth } from "../library/api/expense";
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
  // const cashArray = useSelector((state) => state.cashbook.list);
  const clickMonth = useSelector((state) => state.cashbook.month);
  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses", clickMonth],
    queryFn: () => getExpenseByMonth(clickMonth),
  });
  console.log(expenses);
  if (isLoading) {
    return <div>로딩중 입니다.</div>;
  }
  // const filteredMonth = expenses?.filter((item) => {
  //   return clickMonth === item.month;
  // });
  // console.log(cashArray);
  return (
    <>
      {expenses.map((expenses) => {
        return (
          <Link to={`/detail/${expenses?.id}`} key={expenses?.id}>
            <StListLi>
              <div>
                <StDate>{expenses?.date}</StDate>
                <StSpanDiv>
                  <span>{expenses?.item} - </span>
                  <span>{expenses?.description}</span>
                  <span> ( 👤 {expenses?.createdBy} )</span>
                </StSpanDiv>
              </div>
              <StPrice> ✔️ {expenses?.amount}</StPrice>
            </StListLi>
          </Link>
        );
      })}
    </>
  );
};

export default CashItem;
