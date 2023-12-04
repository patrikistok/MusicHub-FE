import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/useAuthContext";

export const AuthRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  document.body.style.overflow = "auto";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
};
