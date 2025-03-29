import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "cheapest",
  checkboxes: {
    all: true,
    none: false,
    f1: false,
    f2: false,
    f3: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    toggleCheckbox(state, action) {
      const { checkbox } = action.payload;

      if (checkbox === "all") {
        const newValue = !state.checkboxes.all;
        state.checkboxes.all = newValue;
        Object.keys(state.checkboxes).forEach((key) => {
          if (key !== "all") {
            state.checkboxes[key] = newValue;
          }
        });
      } else {
        state.checkboxes[checkbox] = !state.checkboxes[checkbox];

        if (state.checkboxes[checkbox] === false) {
          state.checkboxes.all = false;
        }

        if (Object.values(state.checkboxes).every((value) => value)) {
          state.checkboxes.all = true;
        }
      }
    },
  },
});

export const { setSort, toggleCheckbox } = filtersSlice.actions;
export default filtersSlice.reducer;
