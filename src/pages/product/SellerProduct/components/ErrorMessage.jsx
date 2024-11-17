import { Fragment } from "react";
import useProduct from "../state/useProduct";

function ErrorMessage({ field, className, ...props }) {
  const {
    error: { [field]: errorMessage },
  } = useProduct();
  if (!errorMessage) {
    return <Fragment />;
  }
  return (
    <p className={`error-message ${className}`} {...props}>
      {errorMessage}
    </p>
  );
}

export default ErrorMessage;
