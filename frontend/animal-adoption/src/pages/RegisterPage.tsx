import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface ApiError {
    message: string;
    type: string;
    details?: unknown;
}

enum FrontendErrorType {
    MULTER = 'MULTER',
    DATABASE = 'DATABASE',
    NOT_FOUND = 'NOT_FOUND',
    VALIDATION = 'VALIDATION',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNKNOWN = 'UNKNOWN',
}

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
                { username, password }, {
                withCredentials: true,
            });

            if (response.status === 201) {
                navigate('/login')
            }

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorData = err.response.data as ApiError;
                switch (errorData.type) {
                    case FrontendErrorType.VALIDATION:
                        setError(`Validation error: ${errorData.message}`);
                        break;
                    case FrontendErrorType.UNAUTHORIZED:
                        setError('Invalid credentials');
                        break;
                    default:
                        setError(errorData.message || 'An unknown error occurred');
                }

            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
            <div className="w-full text-secondary max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-secondary">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-secondary">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-secondary text-white py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
