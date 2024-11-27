import { FaChevronDown } from "react-icons/fa";
import ".scss";

function ModalSelect({
  label = "Default label",
  isShowValue = true,
  value,
  placehoder,
  onClick: handleClick,
  children,
  disabled = false,
}) {
  return (
    <div className={`model-select-selector ${disabled ? "disabled" : ""}`}>
      <p className="label">
        {label} <span>*</span>
      </p>
      <button className="model-select-input" onClick={handleClick}>
        {value && isShowValue ? (
          <p className="selected-model-select">{value}</p>
        ) : (
          <p className="selected-model-placehoder">{placehoder}</p>
        )}
        <div className="icon-wrapper">
          <FaChevronDown size={16} />
        </div>
      </button>
      {children}
    </div>
  );
}

export default ModalSelect;
