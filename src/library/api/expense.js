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
