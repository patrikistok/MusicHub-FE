import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/useAuthContext";
import { PageLayout } from "./components/PageLayout/PageLayout";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      console.log(!localStorage.getItem("logged") + " nema tam byt nic");
      navigate("/login");
    }
  }, []);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
