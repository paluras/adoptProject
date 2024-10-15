import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';
import { handleAxiosError } from '../utils/handleAxiosError';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://adoptproject.onrender.com/api/auth/login', { username, password }, { withCredentials: true });
            if (response.status === 200) {
                dispatch(login({ username: response.data.username, isAdmin: response.data.isAdmin, userId: response.data.id }));
                navigate('/');
            }
        } catch (err) {
            setError(handleAxiosError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl text-secondary font-bold text-center mb-6">Login</h2>

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
                            className="w-full px-3 py-2 border rounded-md text-secondary focus:outline-none focus:border-indigo-500"
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
                        className={`w-full bg-secondary text-white py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
