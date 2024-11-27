import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { createSelector } from "reselect";
import _ from "lodash";

const initFilter = {
  q: "",
  page: 1,
  size: 6,
  maxPrice: 1000000000,
  minPrice: 0,
  province: "",
  categoryId: "",
};

export const initialState = {
  filter: (() => {
    const params = new URLSearchParams(window.location.search);
    return _.chain(initFilter)
      .mapValues((defaultValue, key) => {
        return params.get(key) || defaultValue;
      })
      .value();
  })(),
  result: {
    content: [],
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilter: produce((state, action) => {
      const { name, value } = action.payload;
      if (state.filter.hasOwnProperty(name)) {
        state.filter[name] = value;
      }
    }),
    setFilters: produce((state, action) => {
      Object.assign(state.filter, action.payload);
    }),
    setNewQuery: produce((state, action) => {
      state.filter = { ...initFilter };
      state.filter.q = action.payload;
    }),
    resetFilters: produce((state) => {
      state.filter = { ...initialState.filter };
    }),
    setResult: produce((state, action) => {
      state.result = action.payload;
    }),
  },
});

export const { setFilter, resetFilters, setFilters, setResult, setNewQuery } =
  searchSlice.actions;

export const selectFilters = createSelector(
  (state) => state.search.filter,
  (filters) =>
    _.omitBy(
      filters,
      (value) => value === null || value === undefined || value === ""
    )
);
export const selectResult = (state) => state.search.result;

export default searchSlice.reducer;
