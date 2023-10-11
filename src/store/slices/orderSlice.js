import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../axios";
import { logout } from "./userSlice";
export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (offset, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.get("/order");
      dispatch(ListOrder(response.data.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const request = await $api.post("/order", body);

      if (request?.success) dispatch(setSubmit(true));

      return request;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getFilterData = createAsyncThunk(
  "order/getFilterData",
  async (
    { body, offset = "0", limit = "25" },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const request = await $api(
        `/order?${body}&offset=${offset}&limit=${limit}`
      );
      if (request.status === 401) dispatch(logout());

      return dispatch(ListOrder(request.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delOrder = createAsyncThunk(
  "menu/delCategory",
  async ({ id, body, offset }, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.delete(`/order/${id}`);
      dispatch(getFilterData({ body, offset }));
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putOrder = createAsyncThunk(
  "menu/delCategory",
  async ({ id, data, body, offset }, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.put(`/order/${id}`, data);
      dispatch(getFilterData({ body, offset }));
      return response.status;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    total: 25,
    show: true,
    status: null,
    error: null,
    submit: false,
  },
  reducers: {
    ListOrder(state, { payload }) {
      state.order = [...payload.data];
      state.total = payload.total;
    },
    addOrder(state, { payload }) {
      state.order = [...state.order, ...payload];
    },
    setShow(state, { payload }) {
      state.show = payload;
    },
    setSubmit(state, { payload }) {
      state.submit = payload;
    },
  },
});

export const { ListOrder, addOrder, setShow, setSubmit } = orderSlice.actions;

export default orderSlice.reducer;
