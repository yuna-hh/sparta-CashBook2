import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDataId, deleteExpense, putExpense } from "../library/api/expense";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [detailDate, setDetailDate] = useState("");
  const [detailCategory, setDetailCategory] = useState("");
  const [detailPrice, setDetailPrice] = useState("");
  const [detailContents, setDetailContents] = useState("");
  // const cashArray = useSelector((state) => state.cashbook.list);
  // const [item, setItem] = useState({});

  const navigate = useNavigate();
  const { detailId } = useParams();

  const { data: expenses } = useQuery({
    queryKey: ["expenses", detailId],
    queryFn: () => getDataId(detailId),
  });

  useEffect(() => {
    if (expenses) {
      setDetailDate(expenses.date || "");
      setDetailCategory(expenses.item || "");
      setDetailPrice(expenses.amount || "");
      setDetailContents(expenses.description || "");
    }
  }, [expenses]);

  const queryClient = useQueryClient();

  const handleDetailDate = (e) => {
    setDetailDate(e.target.value);
  };
  const handleDetailCategory = (e) => {
    setDetailCategory(e.target.value);
    console.log(e.target.value);
  };
  const handleDetailPrice = (e) => {
    setDetailPrice(e.target.value);
  };
  const handleDetailContent = (e) => {
    setDetailContents(e.target.value);
  };

  const mutationEdit = useMutation({
    mutationFn: (newExpense) => putExpense(newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", detailId]);
    },
    onSettled: () => {
      navigate("/");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
    onSettled: () => {
      navigate("/");
    },
  });

  const handleEditeBtn = () => {
    const monthArray = detailDate.split("-");
    const newExpense = {
      id: detailId,
      date: detailDate,
      item: detailCategory,
      amount: detailPrice,
      description: detailContents,
      month: Number(monthArray[1]),
    };
    mutationEdit.mutate(newExpense);
    console.log(newExpense);
  };
  console.log(detailCategory);
  const handleDelteBtn = () => {
    mutationDelete.mutate(detailId);
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <StDetailBox>
        <StDetaildiv>
          <div>
            <label htmlFor="date">날짜</label>
            <input onChange={handleDetailDate} type="date" value={detailDate} />
          </div>
          <div>
            <label htmlFor="category">항목</label>
            <input
              onChange={handleDetailCategory}
              type="text"
              value={detailCategory}
            />
          </div>
          <div>
            <label htmlFor="price">금액</label>
            <input
              onChange={handleDetailPrice}
              type="number"
              value={detailPrice}
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <input
              onChange={handleDetailContent}
              type="text"
              value={detailContents}
            />
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
