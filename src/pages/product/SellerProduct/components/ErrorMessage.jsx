import { Fragment } from "react";
import useProduct from "../useProduct";

function ErrorMessage({ field, className, ...props }) {
  const {
    error: { [field]: errorMessage },
  } = useProduct();
  if (!errorMessage) {
    return <Fragment />;
  }
  return (
    <p className={`erorr-message ${className}`} {...props}>
      {errorMessage}
    </p>
  );
}

export default ErrorMessage;
