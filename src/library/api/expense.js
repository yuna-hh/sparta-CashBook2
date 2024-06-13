import axios from "axios";

const JsonServer = "http://localhost:5000";

export const getExpense = async () => {
  try {
    const response = await axios.get(`${JsonServer}/expenses`);
    return response.data;
  } catch (err) {
    alert("JSON 서버를 불러오는데 실패하였습니다.");
  }
};

export async function getDataId(id) {
  const { data } = await axios.get(`${JsonServer}/expenses/${id}`);
  return data;
}

export const getExpenseByMonth = async (month) => {
  const response = await axios.get(`${JsonServer}/expenses?month=${month}`);
  return response.data;
};

export const addExpense = async (newList) => {
  const response = await axios.post(`${JsonServer}/expenses`, newList);
  return response.data;
};

export const putExpense = async (updateExpense) => {
  const { id, ...rest } = updateExpense;
  try {
    const { data } = await axios.patch(`${JsonServer}/expenses/${id}`, rest);
    return data;
  } catch (err) {
    console.log(err);
    alert("수정 실패");
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${JsonServer}/expenses/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    alert("삭제 실패");
  }
};
