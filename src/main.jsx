import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import reduxStore from "@redux/store.redux";
import App from "@app/App";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
