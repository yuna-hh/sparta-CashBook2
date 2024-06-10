import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteCashList, editCashList } from "../store/slices/cashBookSlice";
import { useRef } from "react";

const StDetailBox = styled.div`
  width: 1200px;
  background-color: #fff08c;
  margin: 100px auto;
  padding: 30px 20px;
  border-radius: 20px;
  box-sizing: border-box;
`;

const StDetaildiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 1100px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 20px;

  label {
    padding-left: 12px;
    letter-spacing: 2px;
  }

  input {
    display: block;
    width: 1000px;
    margin-top: 5px;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
`;
const StBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  :nth-child(1) {
    background-color: #ecfc7c;
  }

  button {
    width: 100px;
    padding: 10px 0;
    border-radius: 20px;
    border: 1px solid transparent;
    letter-spacing: 2px;
    cursor: pointer;
  }
`;

const Detail = () => {
  const dispatch = useDispatch();
  const cashArray = useSelector((state) => state.cashbook.list);
  const navigate = useNavigate();
  const { detailId } = useParams();

  const item = cashArray.find((item) => item.id === detailId);
  const { date, category, price, contents, id } = item;

  // const [detailDate, setDetailDate] = useState(date);
  // const [detailCategory, setDetailCategory] = useState(category);
  // const [detailPrice, setDetailPrice] = useState(price);
  // const [detailContents, setDetailContents] = useState(contents);

  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const priceRef = useRef(null);
  const contentsRef = useRef(null);

  const handleEditeBtn = () => {
    const monthArray = dateRef.current.value.split("-");
    const editItem = {
      id: id,
      date: dateRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      contents: contentsRef.current.value,
      month: Number(monthArray[1]),
    };
    console.log(categoryRef.current.value); // 수정된 값
    dispatch(editCashList(editItem));
    navigate("/");
  };
  const handleDelteBtn = () => {
    dispatch(deleteCashList(detailId));
    navigate("/");
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  // const handleDetailDate = (event) => {
  //   setDetailDate(event.target.value);
  // };
  // const handleDetailCategory = (event) => {
  //   setDetailCategory(categoryRef.current.value);
  //   console.log(event.target.value);
  // };
  // const handleDetailPrice = (event) => {
  //   setDetailPrice(event.target.value);
  // };
  // const handleDetailContent = (event) => {
  //   setDetailContents(event.target.value);
  // };
  return (
    <>
      <StDetailBox>
        <StDetaildiv>
          <div>
            <label htmlFor="date">날짜</label>
            <input type="date" defaultValue={date} ref={dateRef} />
          </div>
          <div>
            <label htmlFor="category">항목</label>
            <input type="text" defaultValue={category} ref={categoryRef} />
          </div>
          <div>
            <label htmlFor="price">금액</label>
            <input type="number" defaultValue={price} ref={priceRef} />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <input type="text" defaultValue={contents} ref={contentsRef} />
          </div>
          <StBtnWrap>
            <button onClick={handleEditeBtn}>수정</button>
            <button onClick={handleDelteBtn}>삭제</button>
            <button onClick={handleBackBtn}>뒤로가기</button>
          </StBtnWrap>
        </StDetaildiv>
      </StDetailBox>
    </>
  );
};

export default Detail;
