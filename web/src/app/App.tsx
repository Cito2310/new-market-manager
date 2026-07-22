import { useInitApp } from "./hooks/useInitApp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ProductPage } from "../features/product/pages/ProductPage";
import { GuestRoute } from "./routes/GuestRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const App = () => {
    useInitApp();

    return (
        <div className="min-h-screen bg-slate-100">
            <BrowserRouter>
                <Routes>
                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/products" element={<ProductPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default App;
