import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, { username, password });
            router.push("/admin");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl text-center font-bold mb-4">Admin Dashboard</h1>
                <input
                    placeholder="username"
                    className="h-10 mb-4 p-2 border border-gray-300 rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    type="password"
                    className="h-10 mb-4 p-2 border border-gray-300 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleClick} className="h-10 mb-4 bg-red-500 text-white font-semibold cursor-pointer hover:scale-105 hover:bg-red-700 transition-all rounded-sm">
                    Log In
                </button>
                {error && <span className="text-red-500 text-sm">Incorrect credentials!</span>}
            </div>
        </div>
    )
}

export default Login;