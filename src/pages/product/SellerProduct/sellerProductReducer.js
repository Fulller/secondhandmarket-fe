import { produce } from "immer";

const initialState = {
  data: {
    name: "",
    description: "",
    price: 0,
    addressId: "",
    thumbnail: "",
    video: "",
    images: [],
    categoryId: "",
    productAttributes: [
      // {
      //   attributeId: "",
      //   value: "",
      // },
    ],
  },
  error: {},
};

const dataReducers = {
  "FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.data[field] = value;
  },
};

const errorReducers = {
  "ERROR/ALL/SET-EMPTY": (state) => {
    state.error = {};
  },
  "ERROR/FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.error[field] = value;
  },
};

function reducer(state, action) {
  const { type, payload } = action;
  return produce(state, (draft) =>
    ({ ...dataReducers, ...errorReducers }[type](draft, payload))
  );
}

export { initialState, reducer };
