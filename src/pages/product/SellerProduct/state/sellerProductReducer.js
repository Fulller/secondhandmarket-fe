import { produce } from "immer";
import _ from "lodash";
import { v4 as uuid } from "uuid";

const initialState = {
  data: {
    id: "",
    name: "",
    description: "",
    price: 100000,
    address: {
      id: null,
      province: null,
      district: null,
      ward: null,
      detail: "",
    },
    video: "",
    images: [
      // {
      //   id: "uuid-1",
      //   url: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // },
      // {
      //   id: "uuid-2",
      //   url: "https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg",
      // },
    ],
    categoryId: "",
    productAttributes: [
      // {
      //   id: "",
      //   attribute: {
      //     id: "",
      //   },
      //   value: "",
      // },
    ],
  },
  temp: {
    productAttributes: [],
  },
  error: {},
  loading: {
    isLoading: false,
    title: "Đang xử lý",
  },
};

const dataReducers = {
  "FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.data[field] = value;
    state.error[field] = null;
  },
  "PRODUCT-ATTRIBUTES/SET": (state, payload) => {
    state.data.productAttributes = payload.map((att) => {
      const tempAttribute = state.temp.productAttributes.find(
        (tempAtt) => tempAtt.attribute.id === att.id
      );
      return {
        id: tempAttribute?.id,
        attribute: {
          id: att.id,
        },
        value: tempAttribute?.value ? tempAttribute.value : "",
      };
    });

    Object.keys(state.error).map((errorKey) => {
      if (errorKey.startsWith("productAttributes")) {
        state.error[errorKey] = null;
      }
    });
  },
  "PRODUCT-ATTRIBUTES/UPDATE": (state, payload) => {
    const { attributeId, value } = payload;
    const attributeIndex = state.data.productAttributes.findIndex(
      (attr) => attr.attribute.id === attributeId
    );
    if (attributeIndex !== -1) {
      state.data.productAttributes[attributeIndex].value = value;
    } else {
      state.data.productAttributes.push({
        attribute: {
          id: attributeId,
        },
        value: value,
      });
    }
    state.error[`productAttributes.${attributeIndex}.value`] = null;
  },
  "ADDRESS/FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    const address = state.data.address;
    switch (field) {
      case "province":
        address.province = value;
        address.district = null;
        address.ward = null;
        address.detail = null;
        break;
      case "district":
        address.district = value;
        address.ward = null;
        address.detail = null;
        break;
      case "ward":
        address.ward = value;
        address.detail = null;
        break;
      case "detail":
        address.detail = value;
        break;
    }
    state.error["address.detail"] = null;
  },
  "ALL/SET": (state, payload) => {
    const product = payload;
    state.temp.productAttributes = product.productAttributes;
    state.data = _.chain(product)
      .pick([
        "id",
        "name",
        "description",
        "video",
        "images",
        "price",
        "address",
      ])
      .set("categoryId", product.category.id)
      .set(
        "images",
        product.images.map((img) => ({ ...img, uid: uuid() }))
      )
      .value();
  },
};

const errorReducers = {
  "ERROR/ALL/SET-EMPTY": (state) => {
    state.error = {};
  },
  "ERROR/ALL/SET": (state, payload) => {
    state.error = payload;
  },
  "ERROR/FIELD/UPDATE": (state, payload) => {
    const { field, value } = payload;
    state.error[field] = value;
  },
};

const loadingReducers = {
  "LOADING/UPDATE": (state, payload) => {
    const { isLoading, title } = payload;
    state.loading.isLoading = isLoading;
    state.loading.title = title;
  },
};

function reducer(state, action) {
  const { type, payload } = action;
  return produce(state, (draft) =>
    ({ ...dataReducers, ...errorReducers, ...loadingReducers }[type](
      draft,
      payload
    ))
  );
}

export { initialState, reducer };
