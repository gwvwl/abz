import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getEmployee = async (offset) => {
  const request = await fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&offset=${offset}&count=6`
  );
  return await request.json();
};

export const getEmployeeList = createAsyncThunk(
  "employeeSlice/getEmployeeList",
  async (offset, { rejectWithValue, dispatch }) => {
    try {
      getEmployee(offset).then((res) => dispatch(ListEmployee(res.users)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addEmployeeList = createAsyncThunk(
  "employeeSlice/addEmployeeList",
  async (offset, { rejectWithValue, dispatch }) => {
    try {
      getEmployee(offset).then((res) => {
        // if count < offset delete button
        const { total_users, users } = res;
        if (total_users <= offset) dispatch(setShow(false));
        dispatch(addEmployee(users));
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signUp = createAsyncThunk(
  "employeeSlice/signUp",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const getToken = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const { token } = await getToken.json();

      const requestOptions = {
        method: "POST",
        body,
        headers: { Token: token },
      };
      let request = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users`,
        requestOptions
      );
      // let result = await request.json();

      getEmployee(0).then((res) => dispatch(ListEmployee(res.users)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    show: true,
    status: null,
    error: null,
  },
  reducers: {
    ListEmployee(state, { payload }) {
      state.employee = [...payload];
    },
    addEmployee(state, { payload }) {
      state.employee = [...state.employee, ...payload];
    },
    setShow(state, { payload }) {
      state.show = payload;
    },
  },
});

export const { ListEmployee, addEmployee, setShow } = employeeSlice.actions;

export default employeeSlice.reducer;
