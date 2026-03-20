import React from 'react';

interface LoginPageProps {
  onConnectGoogle: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onConnectGoogle }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans px-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">TaskFlow</h1>
        <p className="text-slate-400 mb-8">
          Manage your tasks seamlessly by connecting your Google account.
        </p>
        <button
          onClick={onConnectGoogle}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-medium text-slate-900 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
