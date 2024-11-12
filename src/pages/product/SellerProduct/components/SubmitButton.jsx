import { Button } from "antd";
import useProduct from "../useProduct";
import sellerProductSchema from "../sellerProductSchema";

function SubmitButton() {
  const { data, dispatch } = useProduct();

  async function handleValidate() {
    const { error } = sellerProductSchema.validate(data, { abortEarly: false });
    if (!error) return true;
    dispatch({ type: "ERROR/ALL/SET-EMPTY" });
    error.details.forEach(({ path, message }) => {
      const field = path.join(".");
      dispatch({
        type: "ERROR/FIELD/UPDATE",
        payload: { field, value: message },
      });
    });
    return false;
  }

  async function handleSubmit() {
    const isValid = handleValidate();
    if (!isValid) {
      return;
    }
  }

  return <Button onClick={handleSubmit}>Submit</Button>;
}

export default SubmitButton;
