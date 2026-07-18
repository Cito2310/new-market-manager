import { AuthPage } from "../features/auth/AuthPage";
import { useInitApp } from "./hooks/useInitApp";

const App = () => {
    useInitApp();

    return <div className="min-h-screen">
        <AuthPage />
    </div>;
};

export default App;
