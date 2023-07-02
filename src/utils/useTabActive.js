import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "./authContext";

const useTabActive = () => {
  const { userState } = useContext(AuthContext);
  const [visibilityState, setVisibilityState] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setVisibilityState(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    const handleActivityFalse = () => setVisibilityState(false);
    const handleActivityTrue = () => setVisibilityState(true);

    if (userState.isAuthenticated) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("blur", handleActivityFalse);
      window.addEventListener("blur", handleActivityFalse);
      window.addEventListener("focus", handleActivityTrue);
      document.addEventListener("focus", handleActivityTrue);
    }

    return () => {
      window.removeEventListener("blur", handleVisibilityChange);
      document.removeEventListener("blur", handleActivityFalse);
      window.removeEventListener("focus", handleActivityFalse);
      document.removeEventListener("focus", handleActivityTrue);
      document.removeEventListener("visibilitychange", handleActivityTrue);
    };
  }, [handleVisibilityChange, userState]);

  return visibilityState;
};

export default useTabActive;
