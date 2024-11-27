import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./sellerProductReducer";
import { message } from "antd";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    message.error("ProductProvider error");
  }
  return context;
}
