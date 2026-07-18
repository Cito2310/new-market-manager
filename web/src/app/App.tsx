import { AppRouter } from "./router/AppRouter";
import { useInitApp } from "./hooks/useInitApp";

const App = () => {
    useInitApp();

    return <AppRouter />;
};

export default App;
