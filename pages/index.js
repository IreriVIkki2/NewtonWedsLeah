import Home from "../components";
import { UserProvider } from "../components/UserContext";

export default () => (
    <UserProvider>
        <Home />
    </UserProvider>
);
