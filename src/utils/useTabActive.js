import { useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { focusTab, blurTab } from "../redux/actions/sessionActions";
import { useDispatch } from "react-redux";

const useTabActive = () => {
  const { userState } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      dispatch(focusTab());
    } else {
      dispatch(blurTab());
    }
  }, [dispatch]);

  useEffect(() => {
    if (userState.isAuthenticated) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, userState, dispatch]);
};

export default useTabActive;
