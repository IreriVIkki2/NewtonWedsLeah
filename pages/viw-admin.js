import { useState } from "react";
import Layout from "../components/layout";
import { login } from "../firebase";
import { useRouter } from "next/router";
import { UserProvider } from "../components/UserContext";

export default () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = () => {
        login(email, password)
            .then(() => router.push("/"))
            .catch(err => {
                throw err;
            });
    };
    return (
        <UserProvider>
            <Layout>
                <div className="auth-section">
                    <div className="section-inner auth-inner">
                        <input
                            type="email"
                            className="mb-1 input-control w-75"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="input-control w-75 mb-1"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            onClick={loginUser}
                            className="button-gold button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </Layout>
        </UserProvider>
    );
};
