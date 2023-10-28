import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export const Routes = () => {
    return (
      <RouterRoutes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />
      </RouterRoutes>
    );
}