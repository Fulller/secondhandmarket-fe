import { useHref, useNavigate } from "react-router-dom";
import { setRedirect } from "@redux/slices/auth.slice";
import { useDispatch } from "react-redux";
function useNavAndSaveRedirect() {
  const navigate = useNavigate();
  const href = useHref();
  const dispatch = useDispatch();

  return (path) => {
    dispatch(setRedirect(href));
    navigate(path);
  };
}

export default useNavAndSaveRedirect;
