import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setMonth } from "../store/slices/cashBookSlice";
import { addExpense } from "../library/api/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Stform = styled.form`
  display: flex;
  align-items: flex-end;
  width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 10px;
  font-weight: bolder;
  box-sizing: border-box;

  input {
    width: 210px;
    height: 40px;
    margin-top: 5px;
    padding: 10px 15px;
    border: 2px solid #d9d9d9;
    border-radius: 20px;
    box-sizing: border-box;
  }

  button {
    width: 90px;
    height: 50px;
    margin-left: auto;
    vertical-align: baseline;
    background-color: #f7f7f7;
    border-color: transparent;
    border-radius: 30px;
    letter-spacing: 2px;
    cursor: pointer;
  }
`;
const CashInput = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");

  const queryclient = useQueryClient();
  const mutationAdd = useMutation({
    mutationFn: (newItem) => addExpense(newItem),
    onSuccess: () => {
      queryclient.invalidateQueries(["expenses"]);
    },
  });
  const validation = () => {
    if (!category || !price || !date || !contents) {
      alert("모든 항목을 입력해주세요.");
      return false;
    }
    return true;
  };
  const formHandler = (event) => {
    event.preventDefault();
    const isValid = validation();
    if (!isValid) return;
    const monthArray = date.split("-");
    const newItem = {
      date: date,
      item: category,
      amount: price,
      description: contents,
      month: Number(monthArray[1]),
    };
    dispatch(setMonth(newItem.month));
    localStorage.setItem("month", newItem.month);
    mutationAdd.mutate(newItem);
  };

  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const contentsHandler = (event) => {
    setContents(event.target.value);
  };
  return (
    <>
      <Stform onSubmit={formHandler}>
        <div>
          <label htmlFor="date">날짜</label>
          <input
            id="date"
            type="date"
            value={date}
            min="2024-01-01"
            max="2024-12-31"
            onChange={dateHandler}
          />
        </div>
        <div>
          <label htmlFor="category">항목</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={categoryHandler}
          />
        </div>
        <div>
          <label htmlFor="price">금액</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={priceHandler}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <input
            id="content"
            type="text"
            value={contents}
            onChange={contentsHandler}
          />
        </div>
        <button>저장</button>
      </Stform>
    </>
  );
};

export default CashInput;
