import { createSlice, isRejected } from "@reduxjs/toolkit";
const getMonth = localStorage.getItem("month");
// const getMonth = useEffect(() => {
//   localStorage.getItem("month");
// }, []);
const initialState = { list: [], month: Number(getMonth) };

export const cashBookSlice = createSlice({
  name: "cashBook",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    addCashList: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    deleteCashList: (state, action) => {
      state.list = state.list.filter((item) => {
        return item.id !== action.payload;
      });
    },
    editCashList: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const { setMonth, addCashList, deleteCashList, editCashList } =
  cashBookSlice.actions;
export default cashBookSlice.reducer;
