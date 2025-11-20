import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const formData = new FormData();
                formData.append('username', email);
                formData.append('password', password);
                const response = await api.post('/token', formData);
                login(response.data.access_token);
            } else {
                await api.post('/users/', { email, password });
                // Auto login after register
                const formData = new FormData();
                formData.append('username', email);
                formData.append('password', password);
                const response = await api.post('/token', formData);
                login(response.data.access_token);
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'אירעה שגיאה');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-gray-200">
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 border border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'התחברות' : 'הרשמה'}</h2>
                {error && <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-400">אימייל</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-400">סיסמה</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        {isLogin ? 'התחבר' : 'הירשם'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-slate-400">
                    {isLogin ? "אין לך חשבון? " : "כבר יש לך חשבון? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 hover:text-blue-300 underline"
                    >
                        {isLogin ? 'הירשם' : 'התחבר'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
