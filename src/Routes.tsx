import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignInPage } from "./pages/AuthPage/SignInPage";
import { SignUpPage } from "./pages/AuthPage/SingUpPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRoute } from "./AuthRoute";
import { Profile } from "./pages/Profile/Profile";

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<Navigate to="/homepage" />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<AuthRoute />}>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Route>
    </RouterRoutes>
  );
};
